 // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Mobile menu toggle
        document.querySelector('button.md\\:hidden').addEventListener('click', function () {
            const nav = document.querySelector('.hidden.md\\:flex');
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
            nav.classList.toggle('flex-col');
            nav.classList.toggle('absolute');
            nav.classList.toggle('top-16');
            nav.classList.toggle('left-0');
            nav.classList.toggle('w-full');
            nav.classList.toggle('bg-black');
            nav.classList.toggle('bg-opacity-95');
            nav.classList.toggle('p-4');
            nav.classList.toggle('space-y-4');
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
                    const mobileNav = document.querySelector('.hidden.md\\:flex');
                    if (mobileNav.classList.contains('flex-col')) {
                        mobileNav.classList.add('hidden');
                        mobileNav.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'w-full', 'bg-black', 'bg-opacity-95', 'p-4', 'space-y-4');
                    }
                }
            });
        });