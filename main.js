// Ryokome - Main JavaScript
// Lightweight, production-ready vanilla JS for travel website

(function() {
    'use strict';
    
    // ===== DOM Ready =====
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initStickyHeader();
        initSmoothScrolling();
        initTabNavigation();
        initFAQAccordion();
        initShareButtons();
        initPrintButton();
        initChecklistInteraction();
        initWidgets();
        
        // Console greeting (removable in production)
        console.log('Ryokome Travel - Premium Travel Platform 🛫');
    });
    
    // ===== Mobile Menu Toggle =====
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (!mobileMenuBtn || !mobileMenu) return;
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                mobileMenu.classList.contains('active') ? 'true' : 'false'
            );
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a, .mobile-tab');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Prevent body scroll when mobile menu is open
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    document.body.style.overflow = 
                        mobileMenu.classList.contains('active') ? 'hidden' : '';
                }
            });
        });
        
        observer.observe(mobileMenu, { attributes: true });
    }
    
    // ===== Sticky Header Behavior =====
    function initStickyHeader() {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        function handleScroll() {
            const currentScroll = window.pageYOffset;
            
            // Add shadow on scroll down
            if (currentScroll > 10) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }
            
            // Optional: Hide/show header on scroll (uncomment if needed)
            /*
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            */
            
            lastScroll = currentScroll;
        }
        
        // Throttle scroll events for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial check
        handleScroll();
    }
    
    // ===== Smooth Scrolling =====
    function initSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#' || href === '#!') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.getElementById('mobileMenuBtn')?.setAttribute('aria-expanded', 'false');
                    }
                    
                    // Calculate scroll position
                    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // ===== Tab Navigation =====
    function initTabNavigation() {
        const allTabs = document.querySelectorAll('.nav-tab, .mobile-tab');
        
        allTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                allTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Get tab content identifier
                const tabName = this.textContent.trim().toLowerCase();
                
                // Here you would typically show/hide tab content
                // For now, just log and potentially update URL
                console.log(`Selected tab: ${tabName}`);
                
                // Optional: Update URL for deep linking
                // history.pushState(null, null, `#${tabName}`);
                
                // Close mobile menu if using mobile tab
                if (this.classList.contains('mobile-tab')) {
                    const mobileMenu = document.getElementById('mobileMenu');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                        document.getElementById('mobileMenuBtn')?.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
        
        // Keyboard navigation for tabs
        allTabs.forEach((tab, index) => {
            tab.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextTab = allTabs[(index + 1) % allTabs.length];
                    nextTab.focus();
                    nextTab.click();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevTab = allTabs[(index - 1 + allTabs.length) % allTabs.length];
                    prevTab.focus();
                    prevTab.click();
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    allTabs[0].focus();
                    allTabs[0].click();
                } else if (e.key === 'End') {
                    e.preventDefault();
                    allTabs[allTabs.length - 1].focus();
                    allTabs[allTabs.length - 1].click();
                }
            });
        });
    }
    
    // ===== FAQ Accordion =====
    function initFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isActive = this.classList.contains('active');
                
                // Close all FAQ items
                faqQuestions.forEach(q => {
                    q.classList.remove('active');
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.classList.remove('active');
                    q.nextElementSibling.setAttribute('aria-hidden', 'true');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    this.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                    answer.classList.add('active');
                    answer.setAttribute('aria-hidden', 'false');
                }
            });
            
            // Add keyboard support
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Initialize ARIA attributes
        faqQuestions.forEach(question => {
            const answer = question.nextElementSibling;
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            answer.setAttribute('aria-hidden', 'true');
        });
    }
    
    // ===== Share Buttons =====
    function initShareButtons() {
        // WhatsApp Share
        const whatsappBtn = document.querySelector('.share-whatsapp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                const text = encodeURIComponent("Check out Ryokome's travel resources - comprehensive guides and tools for travelers");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://wa.me/?text=${text}%20${url}`, '_blank', 'noopener,noreferrer');
            });
        }
        
        // Email Share
        const emailBtn = document.querySelector('.share-email');
        if (emailBtn) {
            emailBtn.addEventListener('click', function() {
                const subject = encodeURIComponent("Ryokome Travel Resources");
                const body = encodeURIComponent(`I found this helpful travel resource:\n\n${window.location.href}\n\nFrom Ryokome Travel Platform`);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
            });
        }
        
        // Copy Link
        const copyBtn = document.querySelector('.share-copy');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const url = window.location.href;
                
                navigator.clipboard.writeText(url).then(() => {
                    // Visual feedback
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span>✓ Copied!</span>';
                    this.style.background = 'var(--success)';
                    this.style.color = 'white';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                        this.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // Visual feedback for fallback
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span>Copied!</span>';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                });
            });
        }
    }
    
    // ===== Print Button =====
    function initPrintButton() {
        const printBtn = document.querySelector('.print-button');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                // Hide elements for print
                const elementsToHide = [
                    'header',
                    '.sidebar',
                    '.share-buttons',
                    '.print-button',
                    'footer'
                ];
                
                const originalDisplay = [];
                
                elementsToHide.forEach(selector => {
                    const element = document.querySelector(selector);
                    if (element) {
                        originalDisplay.push({
                            element: element,
                            display: element.style.display
                        });
                        element.style.display = 'none';
                    }
                });
                
                // Print
                window.print();
                
                // Restore elements
                originalDisplay.forEach(item => {
                    item.element.style.display = item.display;
                });
            });
        }
    }
    
    // ===== Checklist Interaction =====
    function initChecklistInteraction() {
        const checklistItems = document.querySelectorAll('.checklist-item');
        
        checklistItems.forEach(item => {
            item.addEventListener('click', function() {
                const number = this.querySelector('.checklist-number');
                if (!number) return;
                
                if (number.textContent === '✓') {
                    // Restore original number
                    const originalNumber = this.dataset.originalNumber || '✓';
                    number.textContent = originalNumber;
                    number.style.background = '';
                    number.style.color = '';
                    delete this.dataset.originalNumber;
                } else {
                    // Save original and mark as complete
                    this.dataset.originalNumber = number.textContent;
                    number.textContent = '✓';
                    number.style.background = 'var(--success)';
                    number.style.color = 'white';
                }
                
                // Save state to localStorage
                saveChecklistState();
            });
            
            // Add keyboard support
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Load saved state
        loadChecklistState();
    }
    
    function saveChecklistState() {
        const checklistState = {};
        document.querySelectorAll('.checklist-item').forEach((item, index) => {
            const number = item.querySelector('.checklist-number');
            checklistState[`item-${index}`] = number.textContent === '✓';
        });
        
        try {
            localStorage.setItem('ryokome-checklist', JSON.stringify(checklistState));
        } catch (e) {
            console.log('LocalStorage not available');
        }
    }
    
    function loadChecklistState() {
        try {
            const savedState = localStorage.getItem('ryokome-checklist');
            if (!savedState) return;
            
            const checklistState = JSON.parse(savedState);
            document.querySelectorAll('.checklist-item').forEach((item, index) => {
                const key = `item-${index}`;
                if (checklistState[key] === true) {
                    const number = item.querySelector('.checklist-number');
                    if (number) {
                        item.dataset.originalNumber = number.textContent;
                        number.textContent = '✓';
                        number.style.background = 'var(--success)';
                        number.style.color = 'white';
                    }
                }
            });
        } catch (e) {
            console.log('Failed to load checklist state');
        }
    }
    
    // ===== Widget Initialization =====
    function initWidgets() {
        // Track widget interactions
        const widgetContainers = document.querySelectorAll('.widget-container');
        widgetContainers.forEach(container => {
            // Add loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'widget-loading';
            loadingIndicator.style.cssText = `
                text-align: center;
                padding: 20px;
                color: var(--gray-500);
                font-size: 14px;
            `;
            loadingIndicator.textContent = 'Loading travel options...';
            
            // Check if widget is already loaded
            const hasWidget = container.querySelector('script[async]');
            if (hasWidget) {
                container.appendChild(loadingIndicator);
                
                // Remove loading indicator after widget should be loaded
                setTimeout(() => {
                    if (loadingIndicator.parentNode) {
                        loadingIndicator.remove();
                    }
                }, 3000);
            }
        });
        
        // Track external link clicks for analytics
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.addEventListener('click', function() {
                    // In production, you would send analytics data here
                    console.log('External link clicked:', this.href);
                    
                    // Optional: Add loading state
                    this.dataset.originalText = this.innerHTML;
                    this.innerHTML = '<span>Opening...</span>';
                    this.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        if (this.dataset.originalText) {
                            this.innerHTML = this.dataset.originalText;
                            this.style.opacity = '';
                        }
                    }, 1500);
                });
            }
        });
    }
    
    // ===== Performance Optimizations =====
    function initPerformance() {
        // Defer non-critical images
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // Add loading="lazy" to images if not present
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // ===== Error Handling =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.message, e.filename, e.lineno);
        // In production, you would send this to your error tracking service
    });
    
    // ===== Utility Functions =====
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
    
    // ===== Public API (if needed for other scripts) =====
    window.Ryokome = {
        utils: {
            debounce,
            throttle
        },
        init: function() {
            // Re-initialize if needed
            initMobileMenu();
            initStickyHeader();
        }
    };
    
})();