// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMKXazwuAHs4oujjZ75OFdP211nX45JU8",
  authDomain: "ayash-earning.firebaseapp.com",
  projectId: "ayash-earning",
  storageBucket: "ayash-earning.firebasestorage.app",
  messagingSenderId: "352126412047",
  appId: "1:352126412047:web:acb56ca67779de0baf8a7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
