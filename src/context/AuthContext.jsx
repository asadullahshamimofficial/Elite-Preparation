import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('elite_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('elite_auth_user', JSON.stringify(user));
      // Also register to registered students list if not present
      try {
        const savedStudents = JSON.parse(localStorage.getItem('elite_registered_students') || '[]');
        const exists = savedStudents.some(s => s.id === user.id || s.phone === user.phone || (user.email && s.email === user.email));
        if (!exists) {
          savedStudents.push({
            id: user.id || Date.now().toString(),
            name: user.name || 'শিক্ষার্থী',
            phone: user.phone || null,
            email: user.email || null,
            madrasah: user.madrasah || 'মাদরাসা শিক্ষার্থী',
            joinedAt: new Date().toISOString(),
            role: user.role || 'user'
          });
          localStorage.setItem('elite_registered_students', JSON.stringify(savedStudents));
        }
      } catch (err) {
        console.error('Error updating students list:', err);
      }
    } else {
      localStorage.removeItem('elite_auth_user');
    }
  }, [user]);

  // Login via Phone & Verified OTP
  const loginWithPhone = (phone, name = 'আলিম পরীক্ষার্থী', madrasah = 'আলিম মাদরাসা') => {
    const newUser = {
      id: 'usr_' + Date.now(),
      phone,
      name,
      madrasah,
      role: 'user',
      authProvider: 'phone',
      loginAt: new Date().toISOString()
    };
    setUser(newUser);
    setAuthModalOpen(false);
    return newUser;
  };

  // Login via Gmail
  const loginWithGoogle = (email = 'student@gmail.com', name = 'আলিম পরীক্ষার্থী', madrasah = 'আলিম মাদরাসা') => {
    const newUser = {
      id: 'usr_' + Date.now(),
      email,
      name,
      madrasah,
      role: 'user',
      authProvider: 'google',
      loginAt: new Date().toISOString()
    };
    setUser(newUser);
    setAuthModalOpen(false);
    return newUser;
  };

  // Admin Login
  const loginAsAdmin = (passcode) => {
    if (passcode === 'admin123' || passcode === 'elite2026' || passcode === 'admin') {
      const adminUser = {
        id: 'admin_01',
        name: 'সুপার এডমিন',
        email: 'admin@elitepreparation.com',
        phone: '01618-788802',
        role: 'admin',
        authProvider: 'admin_passkey',
        loginAt: new Date().toISOString()
      };
      setUser(adminUser);
      setAuthModalOpen(false);
      return { success: true, user: adminUser };
    }
    return { success: false, message: 'ভুল এডমিন পাসকোড! সঠিক পাসকোড দিয়ে চেষ্টা করুন।' };
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (redirectPath = null) => {
    if (redirectPath) setRedirectAfterLogin(redirectPath);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        authModalOpen,
        redirectAfterLogin,
        loginWithPhone,
        loginWithGoogle,
        loginAsAdmin,
        logout,
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
