// // Firebase Auth Reference
// const auth = firebase.auth();

// // Debug function
// function showAuthError(message) {
//     console.error("Auth Error:", message);
//     alert("Authentication Error: " + message);
// }

// // Check auth state
// auth.onAuthStateChanged((user) => {
//     console.log("Auth state changed:", user);
//     if (user) {
//         // User is signed in
//         updateUIForLoggedInUser(user);
//     } else {
//         // User is signed out
//         updateUIForLoggedOutUser();
//     }
// });

// function updateUIForLoggedInUser(user) {
//     console.log("Updating UI for logged in user:", user);
    
//     // Update desktop UI
//     document.getElementById('authButtons').style.display = 'none';
//     document.getElementById('userMenu').style.display = 'flex';
    
//     // Update mobile UI
//     document.getElementById('mobileAuthButtons').style.display = 'none';
//     document.getElementById('mobileUserMenu').style.display = 'flex';
    
//     // Set user info
//     const displayName = user.displayName || user.email || 'User';
//     const firstLetter = displayName.charAt(0).toUpperCase();
    
//     document.getElementById('userName').textContent = displayName;
//     document.getElementById('userAvatar').textContent = firstLetter;
//     document.getElementById('mobileUserName').textContent = displayName;
//     document.getElementById('mobileUserAvatar').textContent = firstLetter;
    
//     // Hide verification banner if email is verified
//     if (user.emailVerified) {
//         document.getElementById('verificationBanner').style.display = 'none';
//     } else {
//         document.getElementById('verificationBanner').style.display = 'block';
//     }
// }

// function updateUIForLoggedOutUser() {
//     console.log("Updating UI for logged out user");
    
//     // Update desktop UI
//     document.getElementById('authButtons').style.display = 'flex';
//     document.getElementById('userMenu').style.display = 'none';
    
//     // Update mobile UI
//     document.getElementById('mobileAuthButtons').style.display = 'flex';
//     document.getElementById('mobileUserMenu').style.display = 'none';
    
//     // Show verification banner
//     document.getElementById('verificationBanner').style.display = 'none';
// }

// /* ---------------- GOOGLE AUTHENTICATION ---------------- */
// function setupGoogleAuth() {
//     const googleLoginBtn = document.getElementById("googleLoginBtn");
//     const googleSignupBtn = document.getElementById("googleSignupBtn");

//     if (googleLoginBtn) {
//         googleLoginBtn.addEventListener("click", googleAuth);
//     }
    
//     if (googleSignupBtn) {
//         googleSignupBtn.addEventListener("click", googleAuth);
//     }
// }

// function googleAuth() {
//     console.log("Starting Google authentication...");
    
//     const provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('email');
//     provider.addScope('profile');
    
//     auth.signInWithPopup(provider)
//         .then((result) => {
//             console.log("Google auth successful:", result);
//             const user = result.user;
            
//             // Check if this is a new user
//             if (result.additionalUserInfo.isNewUser) {
//                 alert("Account created successfully with Google!");
//             } else {
//                 alert("Login successful with Google!");
//             }
            
//             // Close modals
//             document.getElementById('loginModal').style.display = 'none';
//             document.getElementById('signupModal').style.display = 'none';
            
//         })
//         .catch((error) => {
//             console.error("Google auth error:", error);
            
//             // Handle specific errors
//             if (error.code === 'auth/popup-blocked') {
//                 showAuthError("Popup was blocked by your browser. Please allow popups for this site.");
//             } else if (error.code === 'auth/popup-closed-by-user') {
//                 console.log("User closed the popup");
//             } else {
//                 showAuthError(error.message);
//             }
//         });
// }

// /* ---------------- FACEBOOK AUTHENTICATION ---------------- */
// function setupFacebookAuth() {
//     const facebookLoginBtn = document.getElementById("facebookLoginBtn");
//     const facebookSignupBtn = document.getElementById("facebookSignupBtn");

//     if (facebookLoginBtn) {
//         facebookLoginBtn.addEventListener("click", facebookAuth);
//     }
    
//     if (facebookSignupBtn) {
//         facebookSignupBtn.addEventListener("click", facebookAuth);
//     }
// }

// function facebookAuth() {
//     console.log("Starting Facebook authentication...");
    
//     const provider = new firebase.auth.FacebookAuthProvider();
//     provider.addScope('email');
//     provider.addScope('public_profile');
    
//     auth.signInWithPopup(provider)
//         .then((result) => {
//             console.log("Facebook auth successful:", result);
//             const user = result.user;
            
//             // Check if this is a new user
//             if (result.additionalUserInfo.isNewUser) {
//                 alert("Account created successfully with Facebook!");
//             } else {
//                 alert("Login successful with Facebook!");
//             }
            
//             // Close modals
//             document.getElementById('loginModal').style.display = 'none';
//             document.getElementById('signupModal').style.display = 'none';
            
//         })
//         .catch((error) => {
//             console.error("Facebook auth error:", error);
            
//             // Handle specific errors
//             if (error.code === 'auth/popup-blocked') {
//                 showAuthError("Popup was blocked by your browser. Please allow popups for this site.");
//             } else if (error.code === 'auth/popup-closed-by-user') {
//                 console.log("User closed the popup");
//             } else {
//                 showAuthError(error.message);
//             }
//         });
// }

// /* ---------------- EMAIL/PASSWORD AUTHENTICATION ---------------- */
// document.getElementById('loginForm')?.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;
    
//     auth.signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             console.log("Email login successful:", userCredential);
//             document.getElementById('loginModal').style.display = 'none';
//             alert("Login successful!");
//         })
//         .catch((error) => {
//             console.error("Email login error:", error);
//             showAuthError(error.message);
//         });
// });

// document.getElementById('signupForm')?.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('signupName').value;
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;
    
//     auth.createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Update profile with name
//             return userCredential.user.updateProfile({
//                 displayName: name
//             }).then(() => {
//                 // Send email verification
//                 return userCredential.user.sendEmailVerification();
//             });
//         })
//         .then(() => {
//             console.log("Email signup successful");
//             document.getElementById('signupModal').style.display = 'none';
//             document.getElementById('verificationModal').style.display = 'flex';
//             alert("Account created! Please check your email for verification.");
//         })
//         .catch((error) => {
//             console.error("Email signup error:", error);
//             showAuthError(error.message);
//         });
// });

// /* ---------------- LOGOUT FUNCTIONALITY ---------------- */
// function setupLogout() {
//     const logoutBtn = document.getElementById('logoutBtn');
//     const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', handleLogout);
//     }
    
//     if (mobileLogoutBtn) {
//         mobileLogoutBtn.addEventListener('click', handleLogout);
//     }
// }

// function handleLogout() {
//     auth.signOut()
//         .then(() => {
//             console.log("User signed out successfully");
//             alert("Logged out successfully!");
//         })
//         .catch((error) => {
//             console.error("Logout error:", error);
//             showAuthError(error.message);
//         });
// }

// /* ---------------- RESEND VERIFICATION ---------------- */
// document.getElementById('resendVerification')?.addEventListener('click', () => {
//     const user = auth.currentUser;
//     if (user && !user.emailVerified) {
//         user.sendEmailVerification()
//             .then(() => {
//                 document.getElementById('resendVerificationModal').style.display = 'flex';
//                 document.getElementById('resendVerificationMessage').textContent = 
//                     "Verification email sent successfully!";
//             })
//             .catch((error) => {
//                 console.error("Resend verification error:", error);
//                 showAuthError(error.message);
//             });
//     }
// });

// // Initialize all auth functionality when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     console.log("Initializing auth functionality...");
//     setupGoogleAuth();
//     setupFacebookAuth();
//     setupLogout();
    
//     // Test Firebase connection
//     if (auth) {
//         console.log("Firebase Auth is available");
//     } else {
//         console.error("Firebase Auth is not available");
//     }
// });