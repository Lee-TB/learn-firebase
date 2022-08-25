// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDn06ipcUXWcQ0aZyuAWyhuA9ueosmQQFs',
  authDomain: 'learn-firebase-cb317.firebaseapp.com',
  projectId: 'learn-firebase-cb317',
  storageBucket: 'learn-firebase-cb317.appspot.com',
  messagingSenderId: '245302648516',
  appId: '1:245302648516:web:25c2f2e6925f5d8eae3391',
  measurementId: 'G-9DLP403DET',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
export default app;
