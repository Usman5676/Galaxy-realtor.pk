// firebase-config.js

// Import Firebase modules from the CDN (for browser use)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Your Firebase configuration (make sure this is valid)
const firebaseConfig = {
  apiKey: "AIzaSyC9EigXaRjEA7A9YR9WgoRX7eBJGZRGf6U",
  authDomain: "galaxy-realtors.firebaseapp.com",
  projectId: "galaxy-realtors",
  storageBucket: "galaxy-realtors.appspot.com", // ✅ fixed domain
  messagingSenderId: "387847164981",
  appId: "1:387847164981:web:875e02de669488dc2a0d7c"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export everything you need
export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc 
};
