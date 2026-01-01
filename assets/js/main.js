// Ryokome - Main JavaScript
// Minimal JS for enhancement only

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (if needed in future)
    const initMobileMenu = () => {
        const menuButton = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    };
    
    // Smooth scroll for anchor links
    const initSmoothScroll = () => {
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
    };
    
    // Track widget interactions for analytics (placeholder)
    const trackWidgetInteraction = (widgetType) => {
        // Future: Send to Google Analytics or other tracking
        console.log('Widget interaction:', widgetType);
    };
    
    // Initialize
    initMobileMenu();
    initSmoothScroll();
    
    // Widget load detection (optional)
    const observeWidgets = () => {
        const widgets = document.querySelectorAll('[id^="tp-"]');
        widgets.forEach(widget => {
            if (widget.children.length > 0) {
                widget.classList.add('widget-loaded');
            }
        });
    };
    
    // Check widgets after delay
    setTimeout(observeWidgets, 2000);
});