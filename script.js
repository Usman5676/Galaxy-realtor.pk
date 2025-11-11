// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Select elements
const menuButton = document.querySelector('button.md\\:hidden');
const navMenu = document.querySelector('.hidden.md\\:flex');

// Toggle mobile menu
menuButton.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent click bubbling
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('flex');
    navMenu.classList.toggle('flex-col');
    navMenu.classList.toggle('absolute');
    navMenu.classList.toggle('top-16');
    navMenu.classList.toggle('left-0');
    navMenu.classList.toggle('w-full');
    navMenu.classList.toggle('bg-black');
    navMenu.classList.toggle('bg-opacity-95');
    navMenu.classList.toggle('p-4');
    navMenu.classList.toggle('space-y-4');
});

// Hide menu when clicking outside
document.addEventListener('click', function (e) {
    if (!navMenu.contains(e.target) && !menuButton.contains(e.target)) {
        if (navMenu.classList.contains('flex')) {
            navMenu.classList.add('hidden');
            navMenu.classList.remove(
                'flex',
                'flex-col',
                'absolute',
                'top-16',
                'left-0',
                'w-full',
                'bg-black',
                'bg-opacity-95',
                'p-4',
                'space-y-4'
            );
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu.classList.contains('flex')) {
                navMenu.classList.add('hidden');
                navMenu.classList.remove(
                    'flex',
                    'flex-col',
                    'absolute',
                    'top-16',
                    'left-0',
                    'w-full',
                    'bg-black',
                    'bg-opacity-95',
                    'p-4',
                    'space-y-4'
                );
            }
        }
    });
});
  const waButton = document.querySelector('.whatsapp-float');
  waButton.style.display = 'none';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      waButton.style.display = 'block';
    } else {
      waButton.style.display = 'none';
    }
  });
