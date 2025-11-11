// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sign up form
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        // Show loading state
        const signupText = document.getElementById('signupText');
        const signupSpinner = document.getElementById('signupSpinner');
        const signupSubmitBtn = document.getElementById('signupSubmitBtn');
        signupText.style.display = 'none';
        signupSpinner.style.display = 'block';
        signupSubmitBtn.disabled = true;
        
        // Reset errors
        resetErrors('signup');
        
        // Validate form
        let isValid = true;
        
        if (!name) {
            showError('signupNameError', 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('signupEmailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('signupEmailError', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password) {
            showError('signupPasswordError', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('signupPasswordError', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!confirmPassword) {
            showError('signupConfirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('signupConfirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!isValid) {
            // Hide loading state if validation fails
            signupText.style.display = 'block';
            signupSpinner.style.display = 'none';
            signupSubmitBtn.disabled = false;
            return;
        }
        
        try {
            // Create user with Firebase
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Update user profile with name
            await user.updateProfile({
                displayName: name
            });
            
            // Store user name in localStorage
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            
            // Send email verification
            await user.sendEmailVerification();
            
            // Show verification message
            signupModal.style.display = 'none';
            verificationModal.style.display = 'flex';
            
            // Sign out the user after registration (they need to verify email first)
            await auth.signOut();
            
        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage = 'An error occurred during signup';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection';
            }
            
            showError('signupEmailError', errorMessage);
        } finally {
            // Hide loading state
            signupText.style.display = 'block';
            signupSpinner.style.display = 'none';
            signupSubmitBtn.disabled = false;
        }
    });
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Show loading state
        const loginText = document.getElementById('loginText');
        const loginSpinner = document.getElementById('loginSpinner');
        const loginSubmitBtn = document.getElementById('loginSubmitBtn');
        loginText.style.display = 'none';
        loginSpinner.style.display = 'block';
        loginSubmitBtn.disabled = true;
        
        // Reset errors
        resetErrors('login');
        
        // Validate form
        let isValid = true;
        
        if (!email) {
            showError('loginEmailError', 'Email is required');
            isValid = false;
        }
        
        if (!password) {
            showError('loginPasswordError', 'Password is required');
            isValid = false;
        }
        
        if (!isValid) {
            // Hide loading state if validation fails
            loginText.style.display = 'block';
            loginSpinner.style.display = 'none';
            loginSubmitBtn.disabled = false;
            return;
        }
        
        try {
            // Sign in with Firebase
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Check if email is verified
            if (!user.emailVerified) {
                showError('loginEmailError', 'Please verify your email before logging in');
                // Show verification banner
                document.getElementById('verificationBanner').style.display = 'block';
                // Sign out the user since email is not verified
                await auth.signOut();
                return;
            }
            
            // Close modal on successful login
            loginModal.style.display = 'none';
            
            // Clear form
            loginForm.reset();
            
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'An error occurred during login';
            
            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection';
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = 'This account has been disabled';
            }
            
            showError('loginEmailError', errorMessage);
        } finally {
            // Hide loading state
            loginText.style.display = 'block';
            loginSpinner.style.display = 'none';
            loginSubmitBtn.disabled = false;
        }
    });
    
    // Resend verification email
    resendVerification.addEventListener('click', async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                resendVerificationModal.style.display = 'flex';
                document.getElementById('resendVerificationMessage').textContent = 'Sending verification email...';
                
                await user.sendEmailVerification();
                
                document.getElementById('resendVerificationMessage').textContent = 'Verification email sent successfully! Please check your inbox.';
            } catch (error) {
                console.error('Resend verification error:', error);
                document.getElementById('resendVerificationMessage').textContent = 'Failed to send verification email. Please try again.';
            }
        }
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });
    
    mobileLogoutBtn.addEventListener('click', () => {
        auth.signOut();
        mobileMenu.classList.add('hidden');
    });
    
    // Auth state listener
    auth.onAuthStateChanged((user) => {
        const userMenu = document.getElementById('userMenu');
        const authButtons = document.getElementById('authButtons');
        const mobileUserMenu = document.getElementById('mobileUserMenu');
        const mobileAuthButtons = document.getElementById('mobileAuthButtons');
        const verificationBanner = document.getElementById('verificationBanner');
        
        if (user) {
            // User is signed in
            const userName = user.displayName || localStorage.getItem('userName') || 'User';
            const userInitial = userName.charAt(0).toUpperCase();
            
            // Update user info
            document.getElementById('userName').textContent = userName;
            document.getElementById('userAvatar').textContent = userInitial;
            document.getElementById('mobileUserName').textContent = userName;
            document.getElementById('mobileUserAvatar').textContent = userInitial;
            
            // Show user menu, hide auth buttons
            userMenu.style.display = 'flex';
            authButtons.style.display = 'none';
            mobileUserMenu.style.display = 'flex';
            mobileAuthButtons.style.display = 'none';
            
            // Show verification banner if email is not verified
            if (!user.emailVerified) {
                verificationBanner.style.display = 'block';
            } else {
                verificationBanner.style.display = 'none';
            }
        } else {
            // User is signed out
            userMenu.style.display = 'none';
            authButtons.style.display = 'flex';
            mobileUserMenu.style.display = 'none';
            mobileAuthButtons.style.display = 'flex';
            verificationBanner.style.display = 'none';
            
            // Clear forms
            document.getElementById('loginForm').reset();
            document.getElementById('signupForm').reset();
        }
    });
});

// Helper functions
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}

function resetErrors(formType) {
    const errorElements = document.querySelectorAll(`#${formType}Form .error-message`);
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}