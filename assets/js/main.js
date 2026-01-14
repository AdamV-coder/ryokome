// Ryokome - Modern JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll
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
    
    // Header background on scroll
    const header = document.querySelector('.header-modern');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 24px rgba(123, 39, 244, 0.12)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.8)';
                header.style.boxShadow = '0 2px 20px rgba(123, 39, 244, 0.08)';
            }
        });
    }
});