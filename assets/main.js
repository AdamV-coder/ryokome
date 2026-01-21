/**
 * Ryokome - Travel Affiliate Website
 * Clean, simple functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFAQAccordion();
    initShareButtons();
    initChecklist();
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
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Share Buttons
 */
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList[1]; // whatsapp, facebook, etc.
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out this travel resource from Ryokome!');
            
            let shareUrl;
            
            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${text}%20${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=Travel%20Resource&body=${text}%20${url}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link copied to clipboard!');
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
 * Checklist Functionality
 */
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    // Load saved state
    checkboxes.forEach(checkbox => {
        const itemId = checkbox.closest('.checklist-item').querySelector('.item-text').textContent;
        const savedState = localStorage.getItem(`checklist_${itemId}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // Save state when changed
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`checklist_${itemId}`, this.checked);
        });
    });
    
    // Reset button
    const resetBtn = document.getElementById('reset-checklist');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Reset all checklist items?')) {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    const itemId = checkbox.closest('.checklist-item').querySelector('.item-text').textContent;
                    localStorage.removeItem(`checklist_${itemId}`);
                });
            }
        });
    }
}

// External link handler
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
});