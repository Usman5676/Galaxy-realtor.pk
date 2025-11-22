// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // click event ko document tak propagate na hone do
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking anywhere outside it
document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when scrolling
window.addEventListener('scroll', () => {
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

/*******************************
 * ELEMENTS
 *******************************/
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const verificationModal = document.getElementById("verificationModal");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const closeLoginModal = document.getElementById("closeLoginModal");
const closeSignupModal = document.getElementById("closeSignupModal");
const closeVerificationModal = document.getElementById("closeVerificationModal");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const googleLoginBtn = document.getElementById("googleLoginBtn");
const googleSignupBtn = document.getElementById("googleSignupBtn");

const facebookLoginBtn = document.getElementById("facebookLoginBtn");
const facebookSignupBtn = document.getElementById("facebookSignupBtn");

const userArea = document.getElementById("userArea");
const mobileUserArea = document.getElementById("mobileUserArea");
const logoutBtn = document.getElementById("logoutBtn");
const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");

const mobileAuthButtons = document.getElementById("mobileAuthButtons");

// Spinner & text elements
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const loginText = document.getElementById("loginText");
const loginSpinner = document.getElementById("loginSpinner");

const signupSubmitBtn = document.getElementById("signupSubmitBtn");
const signupText = document.getElementById("signupText");
const signupSpinner = document.getElementById("signupSpinner");

// Error fields
const loginEmailError = document.getElementById('loginEmailError');
const loginPasswordError = document.getElementById('loginPasswordError');
const signupNameError = document.getElementById('signupNameError');
const signupEmailError = document.getElementById('signupEmailError');
const signupPasswordError = document.getElementById('signupPasswordError');
const signupConfirmPasswordError = document.getElementById('signupConfirmPasswordError');

// Form inputs
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirmPassword = document.getElementById('signupConfirmPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

// Mobile elements
const mobileLoginBtn = document.getElementById("mobileLoginBtn");
const mobileSignupBtn = document.getElementById("mobileSignupBtn");

/*******************************
 * LOADING BUTTON FUNCTIONS
 *******************************/
function startLoading(btn, text, spinner) {
  btn.disabled = true;
  text.style.opacity = "0.4";
  spinner.style.display = "inline-block";
}

function stopLoading(btn, text, spinner) {
  btn.disabled = false;
  text.style.opacity = "1";
  spinner.style.display = "none";
}

/*******************************
 * MODAL FUNCTIONS - FIXED
 *******************************/
function openModal(modal) {
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }
}

function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Allow scrolling
  }
}

// Desktop buttons
if (loginBtn) {
  loginBtn.onclick = () => openModal(loginModal);
}
if (signupBtn) {
  signupBtn.onclick = () => openModal(signupModal);
}

// Mobile buttons - FIXED
if (mobileLoginBtn) {
  mobileLoginBtn.onclick = () => {
    openModal(loginModal);
    mobileMenu.classList.add("hidden");
  };
}

if (mobileSignupBtn) {
  mobileSignupBtn.onclick = () => {
    openModal(signupModal);
    mobileMenu.classList.add("hidden");
  };
}

// Close buttons
if (closeLoginModal) {
  closeLoginModal.onclick = () => closeModal(loginModal);
}
if (closeSignupModal) {
  closeSignupModal.onclick = () => closeModal(signupModal);
}
if (closeVerificationModal) {
  closeVerificationModal.onclick = () => closeModal(verificationModal);
}

// Toggle between login and signup
if (showSignup) {
  showSignup.onclick = () => { 
    closeModal(loginModal); 
    openModal(signupModal); 
  };
}

if (showLogin) {
  showLogin.onclick = () => { 
    closeModal(signupModal); 
    openModal(loginModal); 
  };
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) closeModal(loginModal);
  if (e.target === signupModal) closeModal(signupModal);
  if (e.target === verificationModal) closeModal(verificationModal);
});

/*******************************
 * AUTH STATE - FIXED
 *******************************/
if (typeof auth !== 'undefined') {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        await user.reload();

        const displayName = user.displayName
          || (user.providerData[0] && user.providerData[0].displayName)
          || (user.email ? user.email.split("@")[0] : "User")
          || "User";

        if (document.getElementById("userNameDisplay")) {
          document.getElementById("userNameDisplay").textContent = displayName;
        }
        if (document.getElementById("mobileUserNameDisplay")) {
          document.getElementById("mobileUserNameDisplay").textContent = displayName;
        }

        if (userArea) userArea.classList.remove("hidden");
        if (mobileUserArea) mobileUserArea.classList.remove("hidden");
        if (loginBtn) loginBtn.classList.add("hidden");
        if (signupBtn) signupBtn.classList.add("hidden");
        if (mobileAuthButtons) mobileAuthButtons.classList.add("hidden");

      } catch (error) {
        console.error("Auth state error:", error);
      }
    } else {
      if (userArea) userArea.classList.add("hidden");
      if (mobileUserArea) mobileUserArea.classList.add("hidden");
      if (loginBtn) loginBtn.classList.remove("hidden");
      if (signupBtn) signupBtn.classList.remove("hidden");
      if (mobileAuthButtons) mobileAuthButtons.classList.remove("hidden");
    }
  });
}

/*******************************
 * SIGNUP WITH EMAIL - FIXED
 *******************************/
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const pwd = signupPassword.value;
    const cpwd = signupConfirmPassword.value;

    // Reset errors
    signupNameError.textContent = "";
    signupEmailError.textContent = "";
    signupPasswordError.textContent = "";
    signupConfirmPasswordError.textContent = "";

    // Validation
    if (!name) return signupNameError.textContent = "Enter name";
    if (!email) return signupEmailError.textContent = "Enter email";
    if (pwd.length < 6) return signupPasswordError.textContent = "Password must be 6+ characters";
    if (pwd !== cpwd) return signupConfirmPasswordError.textContent = "Passwords don't match";

    startLoading(signupSubmitBtn, signupText, signupSpinner);

    try {
      const res = await auth.createUserWithEmailAndPassword(email, pwd);
      await res.user.updateProfile({ displayName: name });

      await res.user.sendEmailVerification();

      closeModal(signupModal);
      openModal(verificationModal);

    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === "auth/email-already-in-use") {
        signupEmailError.textContent = "Email already registered. Please login.";
      } else if (err.code === "auth/invalid-email") {
        signupEmailError.textContent = "Invalid email address.";
      } else if (err.code === "auth/weak-password") {
        signupPasswordError.textContent = "Password is too weak.";
      } else {
        signupEmailError.textContent = "Signup failed. Please try again.";
      }
    }

    stopLoading(signupSubmitBtn, signupText, signupSpinner);
  });
}

/*******************************
 * LOGIN WITH EMAIL - FIXED (PROPER ERROR HANDLING)
 *******************************/
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset errors
    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";

    const email = loginEmail.value.trim();
    const pwd = loginPassword.value;

    // Basic validation
    if (!email) {
      loginEmailError.textContent = "Please enter your email";
      return;
    }
    if (!pwd) {
      loginPasswordError.textContent = "Please enter your password";
      return;
    }

    startLoading(loginSubmitBtn, loginText, loginSpinner);

    try {
      const res = await auth.signInWithEmailAndPassword(email, pwd);

      // Check if email is verified
      if (!res.user.emailVerified) {
        await auth.signOut();
        loginEmailError.textContent = "Please verify your email before logging in.";
        stopLoading(loginSubmitBtn, loginText, loginSpinner);
        return;
      }

      // Success
      closeModal(loginModal);
      console.log("Login successful");

    } catch (err) {
      console.error("Login error code:", err.code);
      
      // User-friendly error messages
      if (err.code === "auth/wrong-password") {
        loginPasswordError.textContent = "Incorrect password. Please try again.";
      } else if (err.code === "auth/user-not-found") {
        loginEmailError.textContent = "No account found with this email. Please sign up first.";
      } else if (err.code === "auth/invalid-email") {
        loginEmailError.textContent = "Invalid email address format.";
      } else if (err.code === "auth/invalid-credential") {
        loginEmailError.textContent = "Invalid login credentials. Please check your email and password.";
      } else if (err.code === "auth/too-many-requests") {
        loginPasswordError.textContent = "Too many failed attempts. Please try again later.";
      } else {
        // Generic error for other cases
        loginPasswordError.textContent = "Login failed. Please check your credentials and try again.";
      }
    }

    stopLoading(loginSubmitBtn, loginText, loginSpinner);
  });
}

/*******************************
 * GOOGLE AUTH - FIXED
 *******************************/
function googleAuth() {
  // Check if Firebase is properly initialized
  if (typeof firebase === 'undefined' || !firebase.auth) {
    alert("Authentication service not available. Please refresh the page.");
    return;
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Add scopes if needed
  provider.addScope('email');
  provider.addScope('profile');

  auth.signInWithPopup(provider)
    .then(async (res) => {
      console.log("Google auth success");
      
      // Check if user is new
      if (res.additionalUserInfo.isNewUser) {
        // Save to database if needed
        if (typeof database !== 'undefined') {
          try {
            await database.ref("users/" + res.user.uid).set({
              name: res.user.displayName,
              email: res.user.email,
              provider: "google",
              createdAt: Date.now()
            });
          } catch (dbError) {
            console.error("Database error:", dbError);
          }
        }
      }

      closeModal(loginModal);
      closeModal(signupModal);
      
    })
    .catch((err) => {
      console.error("Google auth error:", err);
      // Only show alert if not user-cancelled
      if (err.code !== 'auth/popup-closed-by-user' && 
          err.code !== 'auth/cancelled-popup-request') {
        alert("Google login failed. Please try again.");
      }
    });
}

if (googleLoginBtn) {
  googleLoginBtn.onclick = googleAuth;
}
if (googleSignupBtn) {
  googleSignupBtn.onclick = googleAuth;
}

/*******************************
 * FACEBOOK AUTH - FIXED
 *******************************/
function facebookAuth() {
  // Check if Firebase is properly initialized
  if (typeof firebase === 'undefined' || !firebase.auth) {
    alert("Authentication service not available. Please refresh the page.");
    return;
  }

  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("email");
  provider.addScope("public_profile");

  auth.signInWithPopup(provider)
    .then(async (res) => {
      console.log("Facebook auth success");
      
      if (res.additionalUserInfo.isNewUser) {
        // Save to database if needed
        if (typeof database !== 'undefined') {
          try {
            await database.ref("users/" + res.user.uid).set({
              name: res.user.displayName,
              email: res.user.email,
              provider: "facebook",
              createdAt: Date.now()
            });
          } catch (dbError) {
            console.error("Database error:", dbError);
          }
        }
      }

      closeModal(loginModal);
      closeModal(signupModal);
      
    })
    .catch((err) => {
      console.error("Facebook auth error:", err);
      // Only show alert if not user-cancelled
      if (err.code !== 'auth/popup-closed-by-user' && 
          err.code !== 'auth/cancelled-popup-request') {
        alert("Facebook login failed. Please try again.");
      }
    });
}

if (facebookLoginBtn) {
  facebookLoginBtn.onclick = facebookAuth;
}
if (facebookSignupBtn) {
  facebookSignupBtn.onclick = facebookAuth;
}

/*******************************
 * LOGOUT - FIXED
 *******************************/
if (logoutBtn) {
  logoutBtn.onclick = async () => {
    try {
      await auth.signOut();
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
}

if (mobileLogoutBtn) {
  mobileLogoutBtn.onclick = async () => {
    try {
      await auth.signOut();
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
}

/*******************************
 * FIREBASE CONFIG CHECK
 *******************************/
// Add this to check if Firebase is properly configured
document.addEventListener('DOMContentLoaded', function() {
  if (typeof firebase === 'undefined') {
    console.error("Firebase is not loaded");
  } else if (!firebase.apps.length) {
    console.error("Firebase app not initialized");
  } else {
    console.log("Firebase is properly initialized");
  }
});