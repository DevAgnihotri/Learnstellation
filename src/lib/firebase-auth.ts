'use client';

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  type User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { auth, db } from './firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName?: string) => {
  try {
    console.log('Starting signup process for:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User created successfully:', user.uid);
    
    // Create user document in Firestore
    const userData = {
      email: user.email,
      displayName: displayName ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    console.log('Creating user document in Firestore:', userData);
    await setDoc(doc(db, 'users', user.uid), userData);
    console.log('User document created successfully');
    
    return { user, error: null };
  } catch (error: unknown) {
    console.error('Sign up error:', error);
    return { user: null, error: getErrorMessage(error) };
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: unknown) {
    return { user: null, error: getErrorMessage(error) };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create or update user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    
    return { user, error: null };
  } catch (error: unknown) {
    return { user: null, error: getErrorMessage(error) };
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null };
    } else {
      return { data: null, error: 'User profile not found' };
    }
  } catch (error: unknown) {
    return { data: null, error: getErrorMessage(error) };
  }
};

// Update user profile
export const updateUserProfile = async (uid: string, data: Record<string, unknown>) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return { error: null };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
};

// Auth state change listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
