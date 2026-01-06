// Ryokome - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header-transparent');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.remove('header-transparent');
                header.classList.add('header-solid');
            } else {
                header.classList.remove('header-solid');
                header.classList.add('header-transparent');
            }
        }
    });
});