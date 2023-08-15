import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import {getFunctions} from 'firebase/functions'

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID  ,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER  ,
  appId: import.meta.env.VITE_FIREBASE_APP_ID

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app) 
export const messaging = getMessaging(app);
export const functions = getFunctions(app);

// "AIzaSyByBWbpNlNbLlg5BrbzJc-DQ5pd_S-0IB8"