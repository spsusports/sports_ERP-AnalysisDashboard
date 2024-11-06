// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-BGR605D7J4pddyZf9xZOW9qUbg9tfWU",
  authDomain: "spsu-sportserp.firebaseapp.com",
  projectId: "spsu-sportserp",
  storageBucket: "spsu-sportserp.appspot.com",
  messagingSenderId: "918318801777",
  appId: "1:918318801777:web:51e0bd598484687c660cd0",
  measurementId: "G-MRDEHCH8XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };