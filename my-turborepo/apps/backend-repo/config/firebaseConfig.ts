// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.MYFIRE_API_KEY,
  authDomain: process.env.MYFIRE_AUTH_DOMAIN,
  databaseURL: process.env.MYFIRE_DATABASE_URL,
  projectId: process.env.MYFIRE_PROJECT_ID,
  storageBucket: process.env.MYFIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.MYFIRE_MESSAGING_SENDER_ID,
  appId: process.env.MYFIRE_APP_ID,
  measurementId: process.env.MYFIRE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.MYFIRE_AUTH_EMULATOR_HOST = 'localhost:9099';
}

export { app, db }