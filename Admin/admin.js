// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9EigXaRjEA7A9YR9WgoRX7eBJGZRGf6U",
    authDomain: "galaxy-realtors.firebaseapp.com",
    databaseURL: "https://galaxy-realtors-default-rtdb.firebaseio.com",
    projectId: "galaxy-realtors",
    storageBucket: "galaxy-realtors.firebasestorage.app",
    messagingSenderId: "387847164981",
    appId: "1:387847164981:web:875e02de669488dc2a0d7c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Authentication state listener
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is logged in:', user.email);
        
        // Update UI elements that show user info
        const adminEmailElements = document.querySelectorAll('#adminEmail');
        adminEmailElements.forEach(element => {
            element.textContent = user.email;
        });
    } else {
        // User is signed out, redirect to login page
        if (!window.location.href.includes('admin-login.html')) {
            window.location.href = "admin-login.html";
        }
    }
});

// Logout function
function logout() {
    auth.signOut()
        .then(() => {
            console.log('User signed out successfully');
            window.location.href = "admin-login.html";
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
}

// Function to format date
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString();
}

// Function to delete a message
function deleteMessage(messageId) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messageRef = database.ref(`contactMessages/${messageId}`);
        messageRef.remove()
            .then(() => {
                console.log('Message deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting message:', error);
                alert('Error deleting message. Please try again.');
            });
    }
}

// Function to get today's date at midnight (for filtering today's messages)
function getTodayMidnight() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
}