// Firebase configuration dan utility functions
// ⚠️ IMPORTANT: Ganti dengan config Firebase project kamu sendiri!
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  orderBy, 
  query, 
  limit,
  Timestamp,
  Firestore 
} from 'firebase/firestore';

/**
 * Firebase Configuration
 * 
 * INSTRUKSI SETUP:
 * 1. Buat project baru di https://console.firebase.google.com
 * 2. Aktifkan Firestore Database
 * 3. Ganti firebaseConfig di bawah dengan config dari project kamu
 * 4. Set Firestore rules untuk development:
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /{document=**} {
 *       allow read, write: if true; // ⚠️ Only for development!
 *     }
 *   }
 * }
 */


const firebaseConfig = {
  apiKey: "AIzaSyBBNkHeZolb0UuS-R1Vuxfwj_oDPADvN-o",
  authDomain: "security-awareness-bfcd3.firebaseapp.com",
  projectId: "security-awareness-bfcd3",
  storageBucket: "security-awareness-bfcd3.appspot.com", 
  messagingSenderId: "689020267873",
  appId: "1:689020267873:web:7ac3685f7198ec93aca920",
  measurementId: "G-QS0H11XV8N"
};

// Initialize Firebase
let app;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  if (error instanceof Error) {
    console.warn('⚠️ Firebase not configured properly:', error.message);
  } else {
    console.warn('⚠️ Firebase not configured properly:', error);
  }
  console.log('📝 Please update firebaseConfig in firebase.ts with your project credentials');
}

/**
 * Interface untuk data phishing attempt
 */
export interface PhishingAttempt {
  email: string;
  password: string;
  timestamp: Date;
  userAgent: string;
  ipAddress: string;
}

/**
 * Interface untuk hasil quiz
 */
export interface QuizResult {
  score: number;
  maxScore: number;
  percentage: number;
  category: string;
  answers: Record<number, number>;
  timestamp: Date;
  timeSpent: number;
}

/**
 * Simpan data phishing attempt ke Firestore
 * Fungsi ini dipanggil dari PhishingSimulation component
 */
export const savePhishingAttempt = async (attemptData: PhishingAttempt): Promise<void> => {
  if (!db) {
    console.warn('Firebase not initialized, using console log instead');
    console.log('🎣 Phishing Attempt (SIMULATED):', {
      email: attemptData.email,
      timestamp: attemptData.timestamp.toISOString(),
      userAgent: attemptData.userAgent
    });
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'phishing-attempts'), {
      ...attemptData,
      timestamp: Timestamp.fromDate(attemptData.timestamp)
    });
    console.log('🎣 Phishing attempt saved with ID:', docRef.id);
  } catch (error) {
    console.error('❌ Error saving phishing attempt:', error);
    throw error;
  }
};

/**
 * Simpan hasil quiz ke Firestore
 * Fungsi ini dipanggil dari QuizPage component
 */
export const saveQuizResult = async (quizData: QuizResult): Promise<void> => {
  if (!db) {
    console.warn('Firebase not initialized, using console log instead');
    console.log('🧠 Quiz Result (SIMULATED):', {
      score: quizData.score,
      percentage: quizData.percentage,
      category: quizData.category,
      timestamp: quizData.timestamp.toISOString()
    });
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'quiz-results'), {
      ...quizData,
      timestamp: Timestamp.fromDate(quizData.timestamp)
    });
    console.log('🧠 Quiz result saved with ID:', docRef.id);
  } catch (error) {
    console.error('❌ Error saving quiz result:', error);
    throw error;
  }
};

/**
 * Ambil semua phishing attempts untuk dashboard
 * Diurutkan berdasarkan timestamp terbaru
 */
export const getPhishingAttempts = async (): Promise<any[]> => {
  try {
    const q = query(
      collection(db, 'phishing-attempts'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`📊 Retrieved ${results.length} phishing attempts`);
    return results;
  } catch (error) {
    console.error('❌ Error fetching phishing attempts:', error);
    return [];
  }
};

/**
 * Ambil semua hasil quiz untuk dashboard
 * Diurutkan berdasarkan timestamp terbaru
 */
export const getQuizResults = async (): Promise<any[]> => {
  try {
    const q = query(
      collection(db, 'quiz-results'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`📊 Retrieved ${results.length} quiz results`);
    return results;
  } catch (error) {
    console.error('❌ Error fetching quiz results:', error);
    return [];
  }
};


/**
 * Export Firebase app dan db untuk digunakan di tempat lain jika diperlukan
 */
export { app, db };

/**
 * 🔧 SETUP INSTRUCTIONS:
 * 
 * 1. CREATE FIREBASE PROJECT:
 *    - Go to https://console.firebase.google.com
 *    - Click "Create a project"
 *    - Enter project name (e.g., "cybersafe-awareness")
 *    - Disable Google Analytics (optional)
 * 
 * 2. SETUP FIRESTORE:
 *    - Go to "Firestore Database"
 *    - Click "Create database"
 *    - Choose "Start in test mode" for development
 *    - Select region closest to your users
 * 
 * 3. GET CONFIG:
 *    - Go to Project Settings (gear icon)
 *    - Scroll down to "Your apps"
 *    - Click "</>" (Web app)
 *    - Register app with nickname
 *    - Copy the config object and replace firebaseConfig above
 * 
 * 4. SECURITY RULES (for production):
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /phishing-attempts/{document} {
 *          allow create: if true;
 *          allow read: if false; // Only admins should read
 *        }
 *        match /quiz-results/{document} {
 *          allow create: if true;
 *          allow read: if false; // Only admins should read
 *        }
 *      }
 *    }
 * 
 * 5. COLLECTIONS WILL BE CREATED AUTOMATICALLY:
 *    - phishing-attempts: Menyimpan data simulasi phishing
 *    - quiz-results: Menyimpan hasil quiz pengguna
 */