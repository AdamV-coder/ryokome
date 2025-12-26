// Ryokome - Main JavaScript
// For affiliate/content-first travel platform

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // ===== SET ACTIVE NAVIGATION LINK =====
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        
        // Reset all links
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Handle home page
        if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
            document.querySelector('.nav-link[href="/"]')?.classList.add('active');
            document.querySelector('.mobile-nav a[href="/"]')?.classList.add('active');
        } else {
            // Handle other pages - exact match first
            let activeLink = null;
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    activeLink = link;
                }
            });
            
            // If no exact match, check for partial match (for nested pages)
            if (!activeLink) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href !== '/' && currentPath.startsWith(href)) {
                        activeLink = link;
                    }
                });
            }
            
            if (activeLink) {
                activeLink.classList.add('active');
                const mobileLink = document.querySelector(`.mobile-nav a[href="${activeLink.getAttribute('href')}"]`);
                if (mobileLink) mobileLink.classList.add('active');
            }
        }
    }
    
    // Call on page load
    setActiveNavLink();
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('mainHeader');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ===== ANIMATE ELEMENTS ON SCROLL =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .route-card, .guide-card, .feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.step, .route-card, .guide-card, .feature');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== UPDATE CURRENT YEAR IN FOOTER =====
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // ===== LOADING SPINNER =====
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (loadingSpinner) {
        // Hide spinner after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingSpinner.style.opacity = '0';
                loadingSpinner.style.visibility = 'hidden';
                
                setTimeout(() => {
                    loadingSpinner.style.display = 'none';
                }, 300);
            }, 500);
        });
        
        // Fallback: hide spinner after 3 seconds max
        setTimeout(() => {
            if (loadingSpinner.style.display !== 'none') {
                loadingSpinner.style.opacity = '0';
                loadingSpinner.style.visibility = 'hidden';
                setTimeout(() => {
                    loadingSpinner.style.display = 'none';
                }, 300);
            }
        }, 3000);
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Check if it's an internal page anchor
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== CONSOLE GREETING =====
    console.log('%c✈️ Ryokome - Travel Comparison Platform %c\nHelping travelers find the best flights through comprehensive research and comparisons.',
        'color: #2563eb; font-size: 16px; font-weight: bold;',
        'color: #6b7280; font-size: 14px;');
    
    // ===== AFFILIATE LINK TRACKING =====
    document.querySelectorAll('a[href*="aviasales"], a[href*="booking.com"], a[href*="partner"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add affiliate click tracking here
            console.log('Affiliate link clicked:', this.href);
            // Optional: Send to analytics
            // ga('send', 'event', 'Affiliate', 'click', this.href);
        });
    });
});