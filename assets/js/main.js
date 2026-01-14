document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      this.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');

      if (!isExpanded) {
        this.textContent = '✕';
      } else {
        this.textContent = '☰';
      }
    });

    document.addEventListener('click', function(event) {
      if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.textContent = '☰';
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.textContent = '☰';
      }
    });
  }
});
