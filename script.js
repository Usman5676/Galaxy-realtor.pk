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
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
let index = 0;
let timer;
const delay = 10000; // 10 seconds

// Set total slides
totalSlidesEl.textContent = slides.length;

// Create dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

// Show specific slide
function showSlide(i) {
    slides[index].classList.remove('active');
    dots[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlideEl.textContent = index + 1;
}

// Next / Prev functions
function nextSlide() { showSlide(index + 1); }
function prevSlide() { showSlide(index - 1); }

// Auto slide
function startAutoSlide() {
    stopAutoSlide();
    timer = setInterval(nextSlide, delay);
}
function stopAutoSlide() {
    clearInterval(timer);
}

// Event listeners
nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

// Pause on hover
document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.slider-container').addEventListener('mouseleave', startAutoSlide);

// Initialize
startAutoSlide();
// Firebase Auth Reference
const auth = firebase.auth();

/* ---------------- GOOGLE LOGIN ---------------- */
document.getElementById("googleLoginBtn").addEventListener("click", () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(res => {
            alert("Google Login Successful!");
            location.reload();
        })
        .catch(err => alert(err.message));
});

/* ---------------- FACEBOOK LOGIN ---------------- */
document.getElementById("facebookLoginBtn").addEventListener("click", () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(res => {
            alert("Facebook Login Successful!");
            location.reload();
        })
        .catch(err => alert(err.message));
});

/* ---------------- GOOGLE SIGNUP ---------------- */
document.getElementById("googleSignupBtn").addEventListener("click", () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(res => {
            alert("Account Created with Google!");
            location.reload();
        })
        .catch(err => alert(err.message));
});

/* ---------------- FACEBOOK SIGNUP ---------------- */
document.getElementById("facebookSignupBtn").addEventListener("click", () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(res => {
            alert("Account Created with Facebook!");
            location.reload();
        })
        .catch(err => alert(err.message));
});
// Desktop Buttons
document.getElementById("loginBtn").onclick = () => loginModal.style.display = "flex";
document.getElementById("signupBtn").onclick = () => signupModal.style.display = "flex";

// Mobile Buttons
document.getElementById("mobileLoginBtn").onclick = () => {
    mobileMenu.classList.remove("active");
    loginModal.style.display = "flex";
};
document.getElementById("mobileSignupBtn").onclick = () => {
    mobileMenu.classList.remove("active");
    signupModal.style.display = "flex";
};
document.getElementById("closeLoginModal").onclick = () => loginModal.style.display = "none";
document.getElementById("closeSignupModal").onclick = () => signupModal.style.display = "none";
