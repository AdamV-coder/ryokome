// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const closeMobileNav = document.querySelector('.close-mobile-nav');
const shareButtons = document.querySelectorAll('.share-button');
const currentYear = document.querySelector('#current-year');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMobileNav) {
        closeMobileNav.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile nav when clicking outside
    mobileNav?.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Share functionality
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.classList[1]; // twitter, facebook, etc.
            const url = window.location.href;
            const title = document.title;
            
            switch(type) {
                case 'twitter':
                    shareTwitter(url, title);
                    break;
                case 'facebook':
                    shareFacebook(url);
                    break;
                case 'whatsapp':
                    shareWhatsApp(url, title);
                    break;
                case 'email':
                    shareEmail(url, title);
                    break;
                case 'copy':
                    copyLink(url);
                    break;
            }
        });
    });
    
    // Set active navigation based on current page
    setActiveNavigation();
    
    // Initialize animations
    initAnimations();
});

// Share functions
function shareTwitter(url, title) {
    const text = `Check out this travel resource: ${title}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
}

function shareFacebook(url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
}

function shareWhatsApp(url, title) {
    const text = `${title} - ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

function shareEmail(url, title) {
    const subject = `Check out: ${title}`;
    const body = `I found this useful travel resource:\n\n${title}\n${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        const button = event.target.closest('.share-button');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>✓ Link Copied!</span>';
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy link to clipboard');
    });
}

// Web Share API fallback
function shareNative(url, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this travel resource',
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback to traditional share buttons
        document.querySelector('.share-section').style.display = 'block';
    }
}

// Set active navigation
function setActiveNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop tabs
    document.querySelectorAll('.tab-button').forEach(tab => {
        const tabHref = tab.getAttribute('href');
        if (tabHref === currentPath) {
            tab.classList.add('active');
        }
    });
    
    // Mobile tabs
    document.querySelectorAll('.mobile-tab-button').forEach(tab => {
        const tabHref = tab.getAttribute('href');
        if (tabHref === currentPath) {
            tab.classList.add('active');
        }
    });
    
    // Mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.style.color = 'var(--primary)';
            link.style.fontWeight = '600';
        }
    });
}

// Initialize animations
function initAnimations() {
    // Add fade-in animation to elements with data-animate attribute
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation (if any forms are added later)
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Cookie consent (basic implementation)
function checkCookieConsent() {
    if (!localStorage.getItem('cookies-accepted')) {
        // Show cookie banner
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button class="btn btn-secondary" id="accept-cookies">Accept</button>
                    <a href="/cookie-policy.html" class="btn btn-outline">Learn More</a>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: var(--dark);
                color: white;
                padding: 1rem;
                z-index: 10000;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            }
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .cookie-content p {
                margin: 0;
                flex: 1;
            }
            .cookie-buttons {
                display: flex;
                gap: 1rem;
            }
            @media (max-width: 768px) {
                .cookie-content {
                    flex-direction: column;
                    text-align: center;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(banner);
        
        // Add event listener
        document.getElementById('accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookies-accepted', 'true');
            banner.style.display = 'none';
        });
    }
}

// Initialize cookie consent on pages that need it
if (document.querySelector('.cookie-banner-placeholder')) {
    checkCookieConsent();
}