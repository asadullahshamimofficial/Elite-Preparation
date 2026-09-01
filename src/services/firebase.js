import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Read Firebase Web App Configuration securely from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "elite-preparation.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "elite-preparation",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "elite-preparation.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase safely
let app = null;
let db = null;
let auth = null;

try {
  if (firebaseConfig.apiKey) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }
} catch (error) {
  console.warn("Firebase initialization notice:", error);
}

export { app, db, auth };

/**
 * Save / Update student profile to Firestore & LocalStorage
 */
export async function saveStudentProfile(studentId, profileData) {
  const cleanId = (studentId || profileData.email || 'student_' + Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_');
  
  const dataToSave = {
    ...profileData,
    id: cleanId,
    updatedAt: new Date().toISOString()
  };

  // 1. Save to LocalStorage immediately for instant UX
  try {
    const existing = JSON.parse(localStorage.getItem('elite_auth_user') || '{}');
    const merged = { ...existing, ...dataToSave };
    localStorage.setItem('elite_auth_user', JSON.stringify(merged));

    // Update registered students list locally
    const studentsList = JSON.parse(localStorage.getItem('elite_registered_students') || '[]');
    const index = studentsList.findIndex(s => s.id === cleanId || s.email === profileData.email);
    if (index >= 0) {
      studentsList[index] = { ...studentsList[index], ...dataToSave };
    } else {
      studentsList.push(dataToSave);
    }
    localStorage.setItem('elite_registered_students', JSON.stringify(studentsList));
  } catch (err) {
    console.error("Local storage error:", err);
  }

  // 2. Save directly to Firebase Firestore Cloud Database
  if (db) {
    try {
      const userRef = doc(db, 'students', cleanId);
      await setDoc(userRef, dataToSave, { merge: true });
      return { success: true, source: 'firebase' };
    } catch (err) {
      console.warn("Firestore cloud sync notice:", err);
    }
  }

  return { success: true, source: 'local' };
}

/**
 * Get student profile from Firestore or LocalStorage
 */
export async function getStudentProfile(studentId) {
  const cleanId = (studentId || '').replace(/[^a-zA-Z0-9_-]/g, '_');
  
  if (db && cleanId) {
    try {
      const userRef = doc(db, 'students', cleanId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const firestoreData = snap.data();
        localStorage.setItem('elite_auth_user', JSON.stringify(firestoreData));
        return firestoreData;
      }
    } catch (err) {
      console.warn("Firestore fetch error:", err);
    }
  }

  try {
    const user = JSON.parse(localStorage.getItem('elite_auth_user') || 'null');
    return user;
  } catch {
    return null;
  }
}

/**
 * Fetch all registered students from Firestore for Admin Panel
 */
export async function getAllStudentsFromFirestore() {
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, 'students'));
      const list = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data());
      });
      if (list.length > 0) {
        localStorage.setItem('elite_registered_students', JSON.stringify(list));
        return list;
      }
    } catch (err) {
      console.warn("Firestore students fetch error:", err);
    }
  }

  try {
    return JSON.parse(localStorage.getItem('elite_registered_students') || '[]');
  } catch {
    return [];
  }
}
