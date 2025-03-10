import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_MYFIRE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_MYFIRE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_MYFIRE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_MYFIRE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_MYFIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MYFIRE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_MYFIRE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MYFIRE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export { app, db, functions };