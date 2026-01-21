/**
 * Ryokome Premium - Luxury Travel Website
 * Enhanced with premium features and interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all premium components
    initPremiumNavigation();
    initSmoothScrolling();
    initFAQAccordion();
    initShareButtons();
    initWidgetLoaders();
    initBackToTop();
    initFormValidations();
    initAccessibilityFeatures();
    initTestimonialSlider();
    initStatsCounter();
    initInteractiveElements();
    initToastNotifications();
    initModalSystem();
    initTabSystem();
    initParallaxEffects();
    initPremiumAnimations();
});

/**
 * Premium Navigation with Mobile Menu
 */
function initPremiumNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        
        // Toggle body scroll lock
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Add active class to current page
    const currentPath = window.location.pathname;
    navMenu.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop() || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Smooth Scrolling with Offset
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
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
                
                // Scroll to element with offset
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (href !== '#') {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/**
 * Premium FAQ Accordion with Animation
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Animate icon
            const icon = this.querySelector('::after');
            if (item.classList.contains('active')) {
                this.style.setProperty('--rotation', '180deg');
            } else {
                this.style.setProperty('--rotation', '0deg');
            }
        });
    });
}

/**
 * Share Buttons for Travel Checklist
 */
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList[1]; // whatsapp, facebook, etc.
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent('Check out this amazing travel checklist from Ryokome!');
            
            let shareUrl;
            
            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${text}%20${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=${text}%20${url}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        showToast('Link copied to clipboard!', 'success');
                    });
                    return;
            }
            
            if (shareUrl && platform !== 'copy') {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

/**
 * Premium Widget Loading with Animation
 */
function initWidgetLoaders() {
    const widgets = document.querySelectorAll('[id*="widget"]');
    
    widgets.forEach(widget => {
        // Add shimmer effect
        const shimmer = document.createElement('div');
        shimmer.className = 'widget-shimmer';
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: shimmer 2s infinite;
            border-radius: inherit;
        `;
        widget.style.position = 'relative';
        widget.appendChild(shimmer);
        
        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'widget-loading';
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 60px;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid var(--primary-purple);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <p style="color: var(--text-light); font-size: 1rem;">Loading premium travel data...</p>
            </div>
        `;
        widget.appendChild(loadingDiv);
        
        // Add CSS for animations
        if (!document.querySelector('#widget-animations')) {
            const style = document.createElement('style');
            style.id = 'widget-animations';
            style.textContent = `
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Handle widget scripts
        const scripts = widget.querySelectorAll('script[async]');
        let loadedCount = 0;
        
        scripts.forEach(script => {
            script.addEventListener('error', function() {
                loadedCount++;
                if (loadedCount === scripts.length) {
                    setTimeout(() => {
                        loadingDiv.style.opacity = '0';
                        shimmer.style.opacity = '0';
                        setTimeout(() => {
                            loadingDiv.remove();
                            shimmer.remove();
                        }, 300);
                    }, 500);
                }
            });
            
            script.addEventListener('load', function() {
                loadedCount++;
                if (loadedCount === scripts.length) {
                    setTimeout(() => {
                        loadingDiv.style.opacity = '0';
                        shimmer.style.opacity = '0';
                        setTimeout(() => {
                            loadingDiv.remove();
                            shimmer.remove();
                        }, 300);
                    }, 500);
                }
            });
        });
    });
}

/**
 * Premium Back to Top Button
 */
function initBackToTop() {
    // Create premium back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Scroll back to top');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.8);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px) scale(0.8)';
        }
    }
    
    // Scroll to top with smooth animation
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
 * Premium Form Validation
 */
function initFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add floating label effect
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Create floating label container
            const container = document.createElement('div');
            container.className = 'input-container';
            container.style.position = 'relative';
            
            // Wrap input
            input.parentNode.insertBefore(container, input);
            container.appendChild(input);
            
            // Create floating label
            const label = document.createElement('label');
            label.textContent = input.placeholder || input.getAttribute('name') || '';
            label.style.cssText = `
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text-light);
                transition: all 0.3s ease;
                pointer-events: none;
                background: white;
                padding: 0 8px;
            `;
            container.appendChild(label);
            
            // Handle focus and blur
            input.addEventListener('focus', function() {
                label.style.top = '0';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--primary-purple)';
                this.style.borderColor = 'var(--primary-purple)';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.top = '50%';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-light)';
                }
                this.style.borderColor = '';
                validateField(this);
            });
            
            // Remove placeholder to avoid duplication
            input.removeAttribute('placeholder');
        });
        
        // Form submission validation
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showToast('Please fill in all required fields correctly.', 'error');
                
                // Focus on first invalid field
                const firstInvalid = form.querySelector('.field-error');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            } else {
                // Show success animation
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
                    submitBtn.disabled = true;
                    
                    // Simulate processing
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        showToast('Form submitted successfully!', 'success');
                    }, 1500);
                }
            }
        });
    });
    
    function validateField(field) {
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
        
        // Show/hide error message
        let errorDiv = field.parentNode.querySelector('.field-error-message');
        if (!isValid) {
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'field-error-message';
                field.parentNode.appendChild(errorDiv);
            }
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: var(--error-color);
                font-size: 0.875rem;
                margin-top: 8px;
                animation: fadeIn 0.3s ease-out;
            `;
            field.style.borderColor = 'var(--error-color)';
        } else if (errorDiv) {
            errorDiv.remove();
            field.style.borderColor = '';
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
}

/**
 * Premium Accessibility Features
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
        background: var(--gradient-primary);
        color: white;
        padding: 12px 24px;
        z-index: 1001;
        text-decoration: none;
        border-radius: var(--radius-md);
        font-weight: 500;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '20px';
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
    
    // Enhanced keyboard navigation
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
                outline: 3px solid var(--primary-purple) !important;
                outline-offset: 3px !important;
                box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-grid');
    if (!testimonialContainer) return;
    
    const testimonials = testimonialContainer.children;
    if (testimonials.length <= 3) return;
    
    let currentIndex = 0;
    const testimonialsArray = Array.from(testimonials);
    
    // Create slider controls
    const sliderControls = document.createElement('div');
    sliderControls.className = 'slider-controls';
    sliderControls.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 40px;
    `;
    
    testimonialContainer.parentNode.appendChild(sliderControls);
    
    // Create dots
    for (let i = 0; i < testimonialsArray.length - 2; i++) {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: var(--border-color);
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        if (i === 0) {
            dot.style.background = 'var(--primary-purple)';
            dot.style.transform = 'scale(1.2)';
        }
        
        dot.addEventListener('click', () => goToSlide(i));
        sliderControls.appendChild(dot);
    }
    
    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '←';
    prevBtn.className = 'slider-nav prev';
    prevBtn.setAttribute('aria-label', 'Previous testimonial');
    prevBtn.style.cssText = `
        position: absolute;
        left: -60px;
        top: 50%;
        transform: translateY(-50%);
        background: white;
        border: 2px solid var(--border-color);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '→';
    nextBtn.className = 'slider-nav next';
    nextBtn.setAttribute('aria-label', 'Next testimonial');
    nextBtn.style.cssText = prevBtn.style.cssText;
    nextBtn.style.left = '';
    nextBtn.style.right = '-60px';
    
    testimonialContainer.parentNode.style.position = 'relative';
    testimonialContainer.parentNode.appendChild(prevBtn);
    testimonialContainer.parentNode.appendChild(nextBtn);
    
    // Navigation functions
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, testimonialsArray.length - 3));
        
        // Update testimonial display
        testimonialsArray.forEach((testimonial, i) => {
            testimonial.style.display = 'none';
            if (i >= currentIndex && i < currentIndex + 3) {
                testimonial.style.display = 'block';
                testimonial.style.animation = 'fadeIn 0.5s ease-out';
            }
        });
        
        // Update dots
        const dots = sliderControls.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.style.background = i === currentIndex ? 'var(--primary-purple)' : 'var(--border-color)';
            dot.style.transform = i === currentIndex ? 'scale(1.2)' : 'scale(1)';
        });
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Auto-advance
    let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
    
    // Pause on hover
    testimonialContainer.parentNode.addEventListener('mouseenter', () => clearInterval(autoSlide));
    testimonialContainer.parentNode.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
    
    // Initialize
    goToSlide(0);
}

/**
 * Animated Stats Counter
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.textContent.replace(/[^0-9]/g, ''));
                const suffix = statNumber.textContent.replace(/[0-9]/g, '');
                
                animateCounter(statNumber, 0, target, 2000, suffix);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    function animateCounter(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            element.textContent = current.toLocaleString() + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

/**
 * Interactive Elements (Hover Effects, etc.)
 */
function initInteractiveElements() {
    // Add hover effects to interactive cards
    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-soft)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Toast Notification System
 */
function initToastNotifications() {
    // Create toast container
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
    `;
    document.body.appendChild(toastContainer);
}

function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    
    // Style based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: 'var(--primary-purple)'
    };
    
    toast.style.cssText = `
        background: white;
        border-radius: var(--radius-lg);
        padding: 20px;
        box-shadow: var(--shadow-hard);
        border-left: 4px solid ${colors[type]};
        transform: translateX(150%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin-bottom: 10px;
    `;
    
    const container = document.getElementById('toast-container');
    container.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => dismissToast(toast));
    
    // Auto-dismiss
    const timeout = setTimeout(() => dismissToast(toast), duration);
    
    function dismissToast(toastElement) {
        clearTimeout(timeout);
        toastElement.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (toastElement.parentNode === container) {
                container.removeChild(toastElement);
            }
        }, 300);
    }
}

/**
 * Modal System
 */
function initModalSystem() {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal';
    modalContainer.style.display = 'none';
    document.body.appendChild(modalContainer);
    
    // Open modal on trigger click
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-modal]');
        if (trigger) {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        }
    });
    
    // Close modal on background click or close button
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer || e.target.closest('.modal-close')) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(modalId) {
    const modalContainer = document.querySelector('.modal');
    const modalContent = document.querySelector(`#${modalId}`);
    
    if (!modalContent) return;
    
    // Clone modal content
    const clone = modalContent.cloneNode(true);
    clone.id = 'modal-' + modalId;
    clone.classList.add('modal-content');
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close modal');
    clone.appendChild(closeBtn);
    
    // Clear and show modal
    modalContainer.innerHTML = '';
    modalContainer.appendChild(clone);
    modalContainer.classList.add('active');
    modalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalContainer = document.querySelector('.modal');
    modalContainer.classList.remove('active');
    setTimeout(() => {
        modalContainer.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

/**
 * Tab System
 */
function initTabSystem() {
    const tabs = document.querySelectorAll('.tabs');
    
    tabs.forEach(tabContainer => {
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabContents = tabContainer.querySelectorAll('.tab-content');
        
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (tabButtons[0] && tabContents[0]) {
            tabButtons[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    });
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Premium Animations
 */
function initPremiumAnimations() {
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.service-card, .trust-item, .testimonial-card, .stat-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add CSS for animations
    if (!document.querySelector('#scroll-animations')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .service-card,
            .trust-item,
            .testimonial-card,
            .stat-card {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
}

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

// Lazy load images with intersection observer
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

// External link handler
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        // Open external links in new tab
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // Add external link icon
        if (!link.querySelector('.external-link-icon')) {
            const icon = document.createElement('span');
            icon.className = 'external-link-icon';
            icon.innerHTML = ' ↗';
            icon.setAttribute('aria-hidden', 'true');
            link.appendChild(icon);
        }
    }
});

// Initialize cookie consent
function initCookieConsent() {
    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            showCookieConsent();
        }, 2000);
    }
}

function showCookieConsent() {
    const consentBanner = document.createElement('div');
    consentBanner.id = 'cookie-consent';
    consentBanner.innerHTML = `
        <div class="cookie-consent-content">
            <p>🍪 We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our site, you consent to our use of cookies.</p>
            <div class="cookie-consent-actions">
                <button id="cookie-preferences" class="btn-ghost">Preferences</button>
                <button id="accept-cookies" class="btn-primary">Accept All</button>
            </div>
        </div>
    `;
    
    consentBanner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        padding: 24px;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
    `;
    
    document.body.appendChild(consentBanner);
    
    // Add CSS for animation
    if (!document.querySelector('#cookie-animation')) {
        const style = document.createElement('style');
        style.id = 'cookie-animation';
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            
            .cookie-consent-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 24px;
                flex-wrap: wrap;
            }
            
            .cookie-consent-content p {
                margin: 0;
                flex: 1;
                min-width: 300px;
            }
            
            .cookie-consent-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Handle accept
    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem('cookies-accepted', 'true');
        consentBanner.style.transform = 'translateY(100%)';
        setTimeout(() => consentBanner.remove(), 300);
        showToast('Cookie preferences saved!', 'success');
    });
    
    // Handle preferences
    document.getElementById('cookie-preferences').addEventListener('click', function() {
        openModal('cookie-preferences-modal');
    });
}

// Initialize cookie consent (uncomment to enable)
// initCookieConsent();