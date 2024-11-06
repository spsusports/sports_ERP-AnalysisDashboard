// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEI1XyvS72ZhOMne0ahRomXYQAwQVbMHA",
  authDomain: "reactfirebase-e5e53.firebaseapp.com",
  projectId: "reactfirebase-e5e53",
  storageBucket: "reactfirebase-e5e53.firebasestorage.app",
  messagingSenderId: "131843141991",
  appId: "1:131843141991:web:1bc937851281e72be63fc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };