import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// User's Live Firebase Web App Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsbXWjO1PeTyEOUJjBvS-j34AhTQWR-00",
  authDomain: "elite-preparation.firebaseapp.com",
  projectId: "elite-preparation",
  storageBucket: "elite-preparation.firebasestorage.app",
  messagingSenderId: "910743738250",
  appId: "1:910743738250:web:a1f4aed80ef6573ea05a73",
  measurementId: "G-JHR9G5PYKC"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

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
  try {
    const userRef = doc(db, 'students', cleanId);
    await setDoc(userRef, dataToSave, { merge: true });
    return { success: true, source: 'firebase' };
  } catch (err) {
    console.warn("Firestore cloud sync notice:", err);
    return { success: true, source: 'local' };
  }
}

/**
 * Get student profile from Firestore or LocalStorage
 */
export async function getStudentProfile(studentId) {
  const cleanId = (studentId || '').replace(/[^a-zA-Z0-9_-]/g, '_');
  
  if (cleanId) {
    try {
      const userRef = doc(db, 'students', cleanId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const firestoreData = snap.data();
        // Sync back to local storage
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

  try {
    return JSON.parse(localStorage.getItem('elite_registered_students') || '[]');
  } catch {
    return [];
  }
}
