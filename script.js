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


// Modal functionality
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const verificationModal = document.getElementById('verificationModal');
const resendVerificationModal = document.getElementById('resendVerificationModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const mobileSignupBtn = document.getElementById('mobileSignupBtn');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const closeVerificationModal = document.getElementById('closeVerificationModal');
const closeResendVerificationModal = document.getElementById('closeResendVerificationModal');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const resendVerification = document.getElementById('resendVerification');

// Open modals
loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
signupBtn.addEventListener('click', () => signupModal.style.display = 'flex');
mobileLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
    mobileMenu.classList.add('hidden');
});
mobileSignupBtn.addEventListener('click', () => {
    signupModal.style.display = 'flex';
    mobileMenu.classList.add('hidden');
});

// Close modals
closeLoginModal.addEventListener('click', () => loginModal.style.display = 'none');
closeSignupModal.addEventListener('click', () => signupModal.style.display = 'none');
closeVerificationModal.addEventListener('click', () => verificationModal.style.display = 'none');
closeResendVerificationModal.addEventListener('click', () => resendVerificationModal.style.display = 'none');

// Toggle between login and signup
showSignup.addEventListener('click', () => {
    loginModal.style.display = 'none';
    signupModal.style.display = 'flex';
});
showLogin.addEventListener('click', () => {
    signupModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === signupModal) signupModal.style.display = 'none';
    if (e.target === verificationModal) verificationModal.style.display = 'none';
    if (e.target === resendVerificationModal) resendVerificationModal.style.display = 'none';
});