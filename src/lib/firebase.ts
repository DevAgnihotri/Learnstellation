import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCgQZXDs5vtyVsJwpI_z6J32KcTPt2Gqp4",
  authDomain: "guideancey.firebaseapp.com",
  projectId: "guideancey",
  storageBucket: "guideancey.firebasestorage.app",
  messagingSenderId: "1019356921556",
  appId: "1:1019356921556:web:801ad6d597c56ec7ce4541",
  measurementId: "G-NLGC044CWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
