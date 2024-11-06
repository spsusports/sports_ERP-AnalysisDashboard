import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
