import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  registerWithEmail,
  loginWithEmail,
  logoutUser,
  subscribeAuthState
} from '../services/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../services/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('elite_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authLoading, setAuthLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  // ── Subscribe to Firebase auth state changes ──────────────────
  useEffect(() => {
    const unsubscribe = subscribeAuthState(async (firebaseUser) => {
      if (firebaseUser) {
        let cached = null;
        try {
          const raw = localStorage.getItem('elite_auth_user');
          if (raw) cached = JSON.parse(raw);
        } catch {
          // ignore
        }

        const resolvedUser = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          name: cached?.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'শিক্ষার্থী',
          email: firebaseUser.email || cached?.email || '',
          mobile: cached?.mobile || cached?.phone || '',
          phone: cached?.phone || cached?.mobile || '',
          madrasah: cached?.madrasah || '',
          role: cached?.role || 'user',
          authProvider: cached?.authProvider || 'email_password'
        };

        setUser(resolvedUser);
        setAuthLoading(false);

        // Fetch latest profile in the background without blocking UI
        if (app) {
          try {
            const db = getFirestore(app);
            getDoc(doc(db, 'students', firebaseUser.uid)).then((snap) => {
              if (snap.exists()) {
                const profile = snap.data();
                setUser((prev) => {
                  const updated = {
                    ...prev,
                    name: profile.name || prev?.name,
                    mobile: profile.mobile || profile.phone || prev?.mobile,
                    phone: profile.phone || profile.mobile || prev?.phone,
                    madrasah: profile.madrasah || prev?.madrasah,
                    role: profile.role || prev?.role
                  };
                  try {
                    localStorage.setItem('elite_auth_user', JSON.stringify(updated));
                  } catch {}
                  return updated;
                });
              }
            }).catch(() => {
              // Silently ignore if offline or permissions restrict direct read
            });
          } catch (e) {
            // Silently ignore
          }
        }
      } else {
        // If not admin passkey user, clear
        setUser((prev) => {
          if (prev?.authProvider === 'admin_passkey') return prev;
          try {
            localStorage.removeItem('elite_auth_user');
          } catch {}
          return null;
        });
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ── Register new student ──────────────────────────────────────
  const register = async ({ name, madrasah, mobile, email, password }) => {
    const profile = await registerWithEmail({ name, madrasah, mobile, email, password });
    setUser(profile);
    setAuthModalOpen(false);
    return profile;
  };

  // ── Login with email & password ───────────────────────────────
  const login = async (email, password) => {
    const profile = await loginWithEmail(email, password);
    setUser(profile);
    setAuthModalOpen(false);
    return profile;
  };

  // ── Logout ────────────────────────────────────────────────────
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // ── Admin Login (hardcoded passkey, no Firebase) ──────────────
  const loginAsAdmin = (passcode) => {
    if (passcode === 'admin123' || passcode === 'elite2026' || passcode === 'admin') {
      const adminUser = {
        uid: 'admin_01',
        id: 'admin_01',
        name: 'সুপার এডমিন',
        email: 'admin@elitepreparation.com',
        mobile: '01618-788802',
        phone: '01618-788802',
        role: 'admin',
        authProvider: 'admin_passkey'
      };
      setUser(adminUser);
      try {
        localStorage.setItem('elite_auth_user', JSON.stringify(adminUser));
      } catch {}
      setAuthModalOpen(false);
      return { success: true, user: adminUser };
    }
    return { success: false, message: 'ভুল এডমিন পাসকোড! সঠিক পাসকোড দিয়ে চেষ্টা করুন।' };
  };

  // ── Modal helpers ─────────────────────────────────────────────
  const openAuthModal = (redirectPath = null) => {
    if (redirectPath) setRedirectAfterLogin(redirectPath);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        authLoading,
        authModalOpen,
        redirectAfterLogin,
        register,
        login,
        logout,
        loginAsAdmin,
        openAuthModal,
        closeAuthModal,
        setRedirectAfterLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
