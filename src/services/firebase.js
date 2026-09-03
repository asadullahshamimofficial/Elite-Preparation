import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Firebase Configuration with environment variables & robust production fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAsbXWjO1PeTyEOUJjBvS-j34AhTQWR-00",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "elite-preparation.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "elite-preparation",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "elite-preparation.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "910743738250",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:910743738250:web:a1f4aed80ef6573ea05a73",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-JHR9G5PYKC"
};

// Initialize Firebase
let app = null;
let db = null;
let auth = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app); // uses (default) database
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { app, db, auth };

// ─────────────────────────────────────────────────────────
// AUTH: Register new user with Email & Password
// ─────────────────────────────────────────────────────────
export async function registerWithEmail({ name, madrasah, mobile, email, password }) {
  if (!auth) throw new Error('Firebase Auth is not initialized.');

  // 1. Create Firebase Auth user
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = credential.user;

  // 2. Set displayName (don't block if it fails)
  try {
    await updateProfile(firebaseUser, { displayName: name });
  } catch (e) {
    console.warn('updateProfile warning:', e);
  }

  // 3. Save profile to Firestore students collection in the background
  const profile = {
    uid: firebaseUser.uid,
    id: firebaseUser.uid,
    name,
    email,
    mobile: mobile || '',
    phone: mobile || '',
    madrasah: madrasah || '',
    role: 'user',
    authProvider: 'email_password',
    createdAt: new Date().toISOString()
  };

  // Cache to localStorage for instant UI response
  try {
    localStorage.setItem('elite_auth_user', JSON.stringify(profile));
  } catch (e) {
    console.warn('LocalStorage cache error:', e);
  }

  if (db) {
    // Non-blocking firestore write
    setDoc(doc(db, 'students', firebaseUser.uid), profile, { merge: true }).catch((err) => {
      console.warn('Firestore students write warning (check security rules):', err);
    });
  }

  return profile;
}

// ─────────────────────────────────────────────────────────
// AUTH: Login with Email & Password
// ─────────────────────────────────────────────────────────
export async function loginWithEmail(email, password) {
  if (!auth) throw new Error('Firebase Auth is not initialized.');

  const credential = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = credential.user;

  // Read any cached profile or build basic object
  let profile = null;
  try {
    const cached = localStorage.getItem('elite_auth_user');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.uid === firebaseUser.uid || parsed.email === email) {
        profile = parsed;
      }
    }
  } catch (e) {
    console.warn('Cached profile parse error:', e);
  }

  const userObj = {
    uid: firebaseUser.uid,
    id: firebaseUser.uid,
    name: profile?.name || firebaseUser.displayName || email.split('@')[0],
    email,
    mobile: profile?.mobile || profile?.phone || '',
    phone: profile?.phone || profile?.mobile || '',
    madrasah: profile?.madrasah || '',
    role: profile?.role || 'user',
    authProvider: 'email_password'
  };

  try {
    localStorage.setItem('elite_auth_user', JSON.stringify(userObj));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  // Background fetch latest profile & background log login event
  if (db) {
    getDoc(doc(db, 'students', firebaseUser.uid))
      .then((snap) => {
        if (snap.exists()) {
          const remoteData = snap.data();
          const merged = { ...userObj, ...remoteData };
          localStorage.setItem('elite_auth_user', JSON.stringify(merged));
        }
      })
      .catch(() => {});

    logLoginEvent(firebaseUser.uid, userObj.name, email);
  }

  return userObj;
}

// ─────────────────────────────────────────────────────────
// AUTH: Logout
// ─────────────────────────────────────────────────────────
export async function logoutUser() {
  try {
    localStorage.removeItem('elite_auth_user');
  } catch (e) {
    console.warn('LocalStorage clear error:', e);
  }
  if (auth) await signOut(auth);
}

// ─────────────────────────────────────────────────────────
// AUTH: Listen to auth state changes
// ─────────────────────────────────────────────────────────
export function subscribeAuthState(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// ─────────────────────────────────────────────────────────
// ANALYTICS: Log every login event (non-blocking)
// ─────────────────────────────────────────────────────────
export function logLoginEvent(uid, name, email) {
  if (!db) return;
  addDoc(collection(db, 'loginLogs'), {
    uid,
    name: name || '',
    email: email || '',
    loginAt: serverTimestamp(),
    device: navigator.userAgent.slice(0, 120)
  }).catch((e) => {
    console.warn('Login log warning:', e);
  });
}

// ─────────────────────────────────────────────────────────
// ANALYTICS: Log page visit with duration (non-blocking)
// ─────────────────────────────────────────────────────────
export function logPageView(uid, name, email, page, durationSeconds) {
  if (!db || !uid) return;
  addDoc(collection(db, 'pageViews'), {
    uid,
    name: name || '',
    email: email || '',
    page,
    visitedAt: serverTimestamp(),
    durationSeconds: Math.round(durationSeconds)
  }).catch((e) => {
    console.warn('Page view log warning:', e);
  });
}

// ─────────────────────────────────────────────────────────
// ADMIN: Fetch all registered students
// ─────────────────────────────────────────────────────────
export async function getAllStudents() {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, 'students'));
    return snap.docs.map((d) => d.data());
  } catch (e) {
    console.warn('getAllStudents error:', e);
    return [];
  }
}

// ─────────────────────────────────────────────────────────
// ADMIN: Fetch login history (latest 200)
// ─────────────────────────────────────────────────────────
export async function getLoginLogs() {
  if (!db) return [];
  try {
    const q = query(collection(db, 'loginLogs'), orderBy('loginAt', 'desc'), limit(200));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn('getLoginLogs error:', e);
    return [];
  }
}

// ─────────────────────────────────────────────────────────
// ADMIN: Fetch page view logs (latest 500)
// ─────────────────────────────────────────────────────────
export async function getPageViewLogs() {
  if (!db) return [];
  try {
    const q = query(collection(db, 'pageViews'), orderBy('visitedAt', 'desc'), limit(500));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn('getPageViewLogs error:', e);
    return [];
  }
}

// ─────────────────────────────────────────────────────────
// Save / update student profile to Firestore & LocalStorage
// ─────────────────────────────────────────────────────────
export async function saveStudentProfile(studentId, profileData) {
  const cleanId = studentId || profileData?.uid || profileData?.email || 'user_' + Date.now();
  const dataToSave = {
    ...profileData,
    id: cleanId,
    uid: cleanId,
    updatedAt: new Date().toISOString()
  };

  // 1. Instant local update
  try {
    const local = JSON.parse(localStorage.getItem('elite_auth_user') || '{}');
    const merged = { ...local, ...dataToSave };
    localStorage.setItem('elite_auth_user', JSON.stringify(merged));
  } catch (e) {
    console.warn('Local save warning:', e);
  }

  // 2. Direct Firestore persistence
  if (db && cleanId) {
    try {
      const ref = doc(db, 'students', cleanId);
      await setDoc(ref, dataToSave, { merge: true });
      return { success: true, firestore: true };
    } catch (e) {
      console.warn('saveStudentProfile firestore error:', e);
      return { success: true, firestore: false, error: e.message };
    }
  }

  return { success: true, firestore: false };
}

// ─────────────────────────────────────────────────────────
// Get a single student profile from Firestore
// ─────────────────────────────────────────────────────────
export async function getStudentProfile(studentId) {
  if (!studentId) return null;

  // Try Firestore first (most up-to-date)
  if (db) {
    try {
      const snap = await getDoc(doc(db, 'students', studentId));
      if (snap.exists()) return snap.data();
    } catch (e) {
      console.warn('getStudentProfile Firestore notice (offline fallback):', e.message);
    }
  }

  // Fallback to localStorage if offline
  try {
    const local = JSON.parse(localStorage.getItem('elite_auth_user') || 'null');
    if (local && (local.uid === studentId || local.id === studentId)) {
      return local;
    }
  } catch (e) {
    console.warn('Local profile read error:', e);
  }

  return null;
}

// ─────────────────────────────────────────────────────────
// CONTENT: Sync all website questions & chapters to Firestore
// ─────────────────────────────────────────────────────────
export async function syncAllQuestionsToFirestore(fiqhQuestions, balaghatQuestions) {
  if (!db) return { success: false, message: 'Firebase DB is not initialized' };

  try {
    // 1. Save fiqh questions in batch/document
    await setDoc(doc(db, 'site_content', 'fiqh'), {
      subject: 'fiqh',
      title: 'ফিকহ প্রথম পত্র',
      updatedAt: new Date().toISOString(),
      questions: fiqhQuestions
    }, { merge: true });

    // 2. Save balaghat questions in batch/document
    await setDoc(doc(db, 'site_content', 'balaghat'), {
      subject: 'balaghat',
      title: 'বালাগাত ও মানতিক',
      updatedAt: new Date().toISOString(),
      questions: balaghatQuestions
    }, { merge: true });

    return { success: true, count: fiqhQuestions.length + balaghatQuestions.length };
  } catch (err) {
    console.error('syncAllQuestionsToFirestore error:', err);
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────
// CONTENT: Fetch questions from Firestore
// ─────────────────────────────────────────────────────────
export async function fetchQuestionsFromFirestore() {
  if (!db) return null;

  try {
    const [fiqhSnap, balaghatSnap] = await Promise.all([
      getDoc(doc(db, 'site_content', 'fiqh')),
      getDoc(doc(db, 'site_content', 'balaghat'))
    ]);

    const res = {};
    if (fiqhSnap.exists()) {
      res.fiqh = fiqhSnap.data().questions;
    }
    if (balaghatSnap.exists()) {
      res.balaghat = balaghatSnap.data().questions;
    }

    return (res.fiqh || res.balaghat) ? res : null;
  } catch (err) {
    console.warn('fetchQuestionsFromFirestore notice:', err);
    return null;
  }
}

