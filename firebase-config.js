/*******************************
 * FIREBASE CONFIGURATION
 *******************************/
const firebaseConfig = {
  apiKey: "AIzaSyC9EigXaRjEA7A9YR9WgoRX7eBJGZRGf6U",
  authDomain: "galaxy-realtors.firebaseapp.com",
  databaseURL: "https://galaxy-realtors-default-rtdb.firebaseio.com",
  projectId: "galaxy-realtors",
  storageBucket: "galaxy-realtors.appspot.com",
  messagingSenderId: "387847164981",
  appId: "1:387847164981:web:875e02de669488dc2a0d7c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
const auth = firebase.auth();
const database = firebase.database();