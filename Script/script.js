document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }

  /*******************************
   * MOBILE MENU TOGGLE
   *******************************/
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') &&
        !mobileMenu.contains(e.target) &&
        !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });

    window.addEventListener('scroll', () => {
      if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    });
  }

  /*******************************
   * ELEMENTS (guarded lookups)
   *******************************/
  const verificationBanner = document.getElementById('verificationBanner');
  const resendVerification = document.getElementById('resendVerification');

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
    if (!btn) return;
    btn.disabled = true;
    if (text) text.style.opacity = "0.4";
    if (spinner) spinner.style.display = "inline-block";
  }

  function stopLoading(btn, text, spinner) {
    if (!btn) return;
    btn.disabled = false;
    if (text) text.style.opacity = "1";
    if (spinner) spinner.style.display = "none";
  }

  /*******************************
   * MODAL FUNCTIONS
   *******************************/
  function openModal(modal) {
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  if (loginBtn) loginBtn.onclick = () => openModal(loginModal);
  if (signupBtn) signupBtn.onclick = () => openModal(signupModal);

  if (mobileLoginBtn) mobileLoginBtn.onclick = () => { openModal(loginModal); if (mobileMenu) mobileMenu.classList.add("hidden"); };
  if (mobileSignupBtn) mobileSignupBtn.onclick = () => { openModal(signupModal); if (mobileMenu) mobileMenu.classList.add("hidden"); };

  if (closeLoginModal) closeLoginModal.onclick = () => closeModal(loginModal);
  if (closeSignupModal) closeSignupModal.onclick = () => closeModal(signupModal);
  if (closeVerificationModal) closeVerificationModal.onclick = () => closeModal(verificationModal);

  if (showSignup) showSignup.onclick = () => { closeModal(loginModal); openModal(signupModal); };
  if (showLogin) showLogin.onclick = () => { closeModal(signupModal); openModal(loginModal); };

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
    if (e.target === verificationModal) closeModal(verificationModal);
  });

  /*******************************
   * FIREBASE SAFETY CHECK
   *******************************/
  if (typeof firebase === 'undefined') {
    console.error("Firebase is not loaded");
    return;
  }
  if (!firebase.apps.length) {
    console.error("Firebase app not initialized");
    return;
  }

  const auth = firebase.auth();
  const database = (typeof firebase.database !== 'undefined') ? firebase.database() : undefined;

  /*******************************
   * HELPER: Show / Hide Verification Banner
   *******************************/
  function showVerificationBanner(email) {
    if (!verificationBanner) return;
    verificationBanner.style.display = "block";
    // optionally show email info
    verificationBanner.dataset.email = email || '';
  }

  function hideVerificationBanner() {
    if (!verificationBanner) return;
    verificationBanner.style.display = "none";
    verificationBanner.dataset.email = '';
  }

  // If we previously stored a pending verification email, show banner on load
  const pendingEmail = localStorage.getItem('pendingVerificationEmail');
  if (pendingEmail) {
    showVerificationBanner(pendingEmail);
  }

 if (resendVerification) {
  resendVerification.addEventListener('click', async () => {

    const user = auth.currentUser;

    // === CASE 1: User is signed-in ===
    if (user) {
      try {
        await user.sendEmailVerification();

        // SUCCESS MESSAGE ONLY
        alert("Verification email sent successfully!");

        // Close banner & clear local storage
        hideVerificationBanner();
        localStorage.removeItem('pendingVerificationEmail');

        return;
      } catch (err) {
        console.error("Resend error:", err);
        alert("Could not resend verification. Try again later.");
        return;
      }
    }

    // === CASE 2: User is NOT logged in ===
    const stored = localStorage.getItem('pendingVerificationEmail');

    if (stored) {
      // Hide banner silently
      hideVerificationBanner();
      localStorage.removeItem('pendingVerificationEmail');

      // Open login modal silently
      openModal(loginModal);

      // Auto-fill the email
      if (loginEmail) loginEmail.value = stored;

      return; // ❗ No alert here (as you requested)
    }

    // No stored email — do nothing noisy
    hideVerificationBanner();
  });
}


  /*******************************
   * AUTH STATE
   *******************************/
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        // Refresh user data
        await user.reload();

        // If user email not verified, force sign out (so UI doesn't show them as logged in)
        if (!user.emailVerified) {
          console.warn("User is unverified — signing out.");
          await auth.signOut();
          return;
        }

        // Verified user: show UI
        const displayName = user.displayName
          || (user.providerData && user.providerData[0] && user.providerData[0].displayName)
          || (user.email ? user.email.split("@")[0] : "User");

        const userNameEl = document.getElementById("userNameDisplay");
        if (userNameEl) userNameEl.textContent = displayName;
        const mobileUserNameEl = document.getElementById("mobileUserNameDisplay");
        if (mobileUserNameEl) mobileUserNameEl.textContent = displayName;

        if (userArea) userArea.classList.remove("hidden");
        if (mobileUserArea) mobileUserArea.classList.remove("hidden");
        if (loginBtn) loginBtn.classList.add("hidden");
        if (signupBtn) signupBtn.classList.add("hidden");
        if (mobileAuthButtons) mobileAuthButtons.classList.add("hidden");

        // hide any verification banner when verified
        hideVerificationBanner();
        localStorage.removeItem('pendingVerificationEmail');

        console.log("User logged in:", displayName);

      } catch (error) {
        console.error("Auth state error:", error);
      }
    } else {
      // no user
      if (userArea) userArea.classList.add("hidden");
      if (mobileUserArea) mobileUserArea.classList.add("hidden");
      if (loginBtn) loginBtn.classList.remove("hidden");
      if (signupBtn) signupBtn.classList.remove("hidden");
      if (mobileAuthButtons) mobileAuthButtons.classList.remove("hidden");

      console.log("No user logged in");
    }
  });

  /*******************************
   * SIGNUP WITH EMAIL
   *******************************/
  const signupForm = document.getElementById("signupForm");
  if (signupForm && signupName && signupEmail && signupPassword && signupConfirmPassword) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset errors
      if (signupNameError) signupNameError.textContent = "";
      if (signupEmailError) signupEmailError.textContent = "";
      if (signupPasswordError) signupPasswordError.textContent = "";
      if (signupConfirmPasswordError) signupConfirmPasswordError.textContent = "";

      const name = signupName.value.trim();
      const email = signupEmail.value.trim();
      const pwd = signupPassword.value;
      const cpwd = signupConfirmPassword.value;

      if (!name) { if (signupNameError) signupNameError.textContent = "Enter name"; return; }
      if (!email) { if (signupEmailError) signupEmailError.textContent = "Enter email"; return; }
      if (pwd.length < 6) { if (signupPasswordError) signupPasswordError.textContent = "Password must be 6+ characters"; return; }
      if (pwd !== cpwd) { if (signupConfirmPasswordError) signupConfirmPasswordError.textContent = "Passwords don't match"; return; }

      startLoading(signupSubmitBtn, signupText, signupSpinner);

      try {
        const res = await auth.createUserWithEmailAndPassword(email, pwd);
        await res.user.updateProfile({ displayName: name });

        // Optionally save user in realtime DB
        if (typeof database !== 'undefined') {
          try {
            await database.ref("users/" + res.user.uid).set({
              name: name,
              email: email,
              provider: "password",
              createdAt: Date.now()
            });
          } catch (dbErr) {
            console.error("DB write error (signup):", dbErr);
          }
        }

        // Send verification email
        await res.user.sendEmailVerification();

        // Store pending email so we can show banner/resend hint after sign-out
        localStorage.setItem('pendingVerificationEmail', email);
        showVerificationBanner(email);

        // Prevent auto-login — important
        await auth.signOut();

        closeModal(signupModal);
        openModal(verificationModal);

      } catch (err) {
        console.error("Signup error:", err);
        if (err.code === "auth/email-already-in-use") {
          if (signupEmailError) signupEmailError.textContent = "Email already registered. Please login.";
        } else if (err.code === "auth/invalid-email") {
          if (signupEmailError) signupEmailError.textContent = "Invalid email address.";
        } else if (err.code === "auth/weak-password") {
          if (signupPasswordError) signupPasswordError.textContent = "Password is too weak.";
        } else {
          if (signupEmailError) signupEmailError.textContent = "Signup failed. Please try again.";
        }
      } finally {
        stopLoading(signupSubmitBtn, signupText, signupSpinner);
      }
    });
  }

  /*******************************
   * LOGIN WITH EMAIL
   *******************************/
  const loginForm = document.getElementById("loginForm");
  if (loginForm && loginEmail && loginPassword) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (loginEmailError) loginEmailError.textContent = "";
      if (loginPasswordError) loginPasswordError.textContent = "";

      const email = loginEmail.value.trim();
      const pwd = loginPassword.value;

      if (!email) { if (loginEmailError) loginEmailError.textContent = "Please enter your email"; return; }
      if (!pwd) { if (loginPasswordError) loginPasswordError.textContent = "Please enter your password"; return; }

      startLoading(loginSubmitBtn, loginText, loginSpinner);

      try {
        const res = await auth.signInWithEmailAndPassword(email, pwd);

        if (!res.user.emailVerified) {
          await auth.signOut();
          if (loginEmailError) loginEmailError.textContent = "Please verify your email before logging in.";
          // store email so banner can show after sign-out
          localStorage.setItem('pendingVerificationEmail', email);
          showVerificationBanner(email);
          stopLoading(loginSubmitBtn, loginText, loginSpinner);
          return;
        }

        closeModal(loginModal);
        console.log("Login successful");

      } catch (err) {
        console.error("Login error code:", err.code);
        if (err.code === "auth/wrong-password") {
          if (loginPasswordError) loginPasswordError.textContent = "Incorrect password. Please try again.";
        } else if (err.code === "auth/user-not-found") {
          if (loginEmailError) loginEmailError.textContent = "No account found with this email. Please sign up first.";
        } else if (err.code === "auth/invalid-email") {
          if (loginEmailError) loginEmailError.textContent = "Invalid email address format.";
        } else if (err.code === "auth/too-many-requests") {
          if (loginPasswordError) loginPasswordError.textContent = "Too many failed attempts. Please try again later.";
        } else {
          if (loginPasswordError) loginPasswordError.textContent = "Login failed. Please check your credentials and try again.";
        }
      } finally {
        stopLoading(loginSubmitBtn, loginText, loginSpinner);
      }
    });
  }

  /*******************************
   * GOOGLE & FACEBOOK AUTH
   *******************************/
  function googleAuth() {
    if (typeof firebase === 'undefined' || !firebase.auth) { alert("Authentication service not available. Please refresh the page."); return; }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    auth.signInWithPopup(provider)
      .then(async (res) => {
        console.log("Google auth success");
        if (res.additionalUserInfo && res.additionalUserInfo.isNewUser && typeof database !== 'undefined') {
          try {
            await database.ref("users/" + res.user.uid).set({
              name: res.user.displayName,
              email: res.user.email,
              provider: "google",
              createdAt: Date.now()
            });
          } catch (dbError) { console.error("Database error:", dbError); }
        }
        closeModal(loginModal); closeModal(signupModal);
      })
      .catch((err) => {
        console.error("Google auth error:", err);
        if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
          alert("Google login failed. Please try again.");
        }
      });
  }

  if (googleLoginBtn) googleLoginBtn.onclick = googleAuth;
  if (googleSignupBtn) googleSignupBtn.onclick = googleAuth;

  function facebookAuth() {
    if (typeof firebase === 'undefined' || !firebase.auth) { alert("Authentication service not available. Please refresh the page."); return; }
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");
    provider.addScope("public_profile");

    auth.signInWithPopup(provider)
      .then(async (res) => {
        console.log("Facebook auth success");
        if (res.additionalUserInfo && res.additionalUserInfo.isNewUser && typeof database !== 'undefined') {
          try {
            await database.ref("users/" + res.user.uid).set({
              name: res.user.displayName,
              email: res.user.email,
              provider: "facebook",
              createdAt: Date.now()
            });
          } catch (dbError) { console.error("Database error:", dbError); }
        }
        closeModal(loginModal); closeModal(signupModal);
      })
      .catch((err) => {
        console.error("Facebook auth error:", err);
        if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
          alert("Facebook login failed. Please try again.");
        }
      });
  }

  if (facebookLoginBtn) facebookLoginBtn.onclick = facebookAuth;
  if (facebookSignupBtn) facebookSignupBtn.onclick = facebookAuth;

  /*******************************
   * LOGOUT
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
   * FINAL CHECK
   *******************************/
  console.log("Auth & UI script initialized.");

}); // end DOMContentLoaded
