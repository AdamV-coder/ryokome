/**
 * Ryokome - Main JavaScript
 * Vanilla JS only - no dependencies
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initWidgetLoaders();
    initBackToTop();
    initFormValidations();
    initAccessibilityFeatures();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        
        // Animate hamburger to X
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.startsWith('#!')) return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Scroll to element
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Widget Loading and Error Handling
 */
function initWidgetLoaders() {
    // Add loading states to widgets
    const widgets = document.querySelectorAll('[id*="widget"]');
    
    widgets.forEach(widget => {
        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'widget-loading';
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <p>Loading travel data...</p>
            </div>
        `;
        widget.appendChild(loadingDiv);
        
        // Add error handling for scripts
        const scripts = widget.querySelectorAll('script[async]');
        scripts.forEach(script => {
            script.addEventListener('error', function() {
                loadingDiv.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: var(--error-color);">
                        <p>Unable to load widget. Please refresh the page or try again later.</p>
                        <button onclick="location.reload()" style="
                            margin-top: 20px;
                            padding: 10px 20px;
                            background: var(--primary-color);
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Retry</button>
                    </div>
                `;
            });
            
            // Remove loading indicator when script loads
            script.addEventListener('load', function() {
                setTimeout(() => {
                    loadingDiv.style.display = 'none';
                }, 500);
            });
        });
    });
    
    // Add CSS for spinner animation
    if (!document.querySelector('#widget-spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'widget-spinner-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    // Create button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Scroll back to top');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: 0 4px 12px rgba(0, 20, 255, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    }
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Throttle scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                toggleBackToTop();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Initial check
    toggleBackToTop();
}

/**
 * Form Validation
 */
function initFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                } else {
                    clearFieldError(field);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Focus on first invalid field
                const firstInvalid = form.querySelector('.field-error');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showFieldError(this, 'This field is required');
                } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                    showFieldError(this, 'Please enter a valid email address');
                } else {
                    clearFieldError(this);
                }
            });
        });
    });
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error-color);
        font-size: 0.875rem;
        margin-top: 4px;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = 'var(--error-color)';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error-message');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        z-index: 1001;
        text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if not present
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Keyboard navigation for dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for keyboard navigation
    if (!document.querySelector('#keyboard-navigation-styles')) {
        const style = document.createElement('style');
        style.id = 'keyboard-navigation-styles';
        style.textContent = `
            .keyboard-navigation a:focus,
            .keyboard-navigation button:focus,
            .keyboard-navigation input:focus,
            .keyboard-navigation select:focus,
            .keyboard-navigation textarea:focus {
                outline: 3px solid var(--primary-color) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Performance Optimization
 */
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Throttle resize events
(function() {
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                // Handle resize logic here
            }, 200);
        }
    });
})();

/**
 * Utility Functions
 */
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Get current year for copyright
function getCurrentYear() {
    return new Date().getFullYear();
}

// Update copyright year automatically
const copyrightElements = document.querySelectorAll('[data-current-year]');
copyrightElements.forEach(element => {
    if (element.textContent.includes('2023')) {
        element.textContent = element.textContent.replace('2023', getCurrentYear());
    }
});

/**
 * External Link Handler
 */
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        // Open external links in new tab
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // Optional: Add external link icon
        if (!link.querySelector('.external-link-icon')) {
            const icon = document.createElement('span');
            icon.className = 'external-link-icon';
            icon.innerHTML = ' ↗';
            icon.setAttribute('aria-hidden', 'true');
            link.appendChild(icon);
        }
    }
});

/**
 * Cookie Consent (Basic Implementation)
 */
function initCookieConsent() {
    if (!localStorage.getItem('cookies-accepted')) {
        const consentBanner = document.createElement('div');
        consentBanner.id = 'cookie-consent';
        consentBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--dark-bg);
            color: white;
            padding: 20px;
            z-index: 1000;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
        `;
        
        consentBanner.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
                <div style="flex: 1; min-width: 300px;">
                    <p style="margin: 0; color: white;">
                        We use cookies to improve your experience. By continuing to use our site, 
                        you accept our use of cookies. See our <a href="cookie-policy.html" style="color: var(--accent-color);">Cookie Policy</a>.
                    </p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button id="accept-cookies" style="
                        padding: 10px 20px;
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Accept</button>
                    <button id="reject-cookies" style="
                        padding: 10px 20px;
                        background: transparent;
                        color: white;
                        border: 1px solid white;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Reject</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
        
        // Handle accept/reject
        document.getElementById('accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookies-accepted', 'true');
            consentBanner.style.display = 'none';
        });
        
        document.getElementById('reject-cookies').addEventListener('click', function() {
            localStorage.setItem('cookies-rejected', 'true');
            consentBanner.style.display = 'none';
        });
    }
}

// Initialize cookie consent (uncomment if needed)
// initCookieConsent();