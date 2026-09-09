/**
 * Zenith Academy - Core Interactive Engine
 * Navigation, Drawer, Counter Animations, Accordions, Testimonial Slider, Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  initMetricCounters();
  initTestimonialSlider();
  initFaqAccordion();
  initDemoModal();
});

/* --------------------------------------------------------------------------
   1. Header Scroll Behavior
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const cleanHero = document.querySelector('.clean-hero-backdrop-wrapper');
  const floatingWrapper = document.querySelector('.floating-header-wrapper');

  // Handle Clean Minimalist Hero on index.html
  if (cleanHero && floatingWrapper) {
    document.body.classList.add('has-clean-hero');
    const handleCleanScroll = () => {
      const heroRect = cleanHero.getBoundingClientRect();
      // Reveal floating pill nav when scrolling past the tablet hero card
      if (heroRect.bottom <= 60) {
        floatingWrapper.classList.add('revealed');
      } else {
        floatingWrapper.classList.remove('revealed');
      }
    };
    window.addEventListener('scroll', handleCleanScroll, { passive: true });
    handleCleanScroll();
  }

  // Handle traditional site-header for inner pages
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleButtons = document.querySelectorAll('.mobile-toggle-btn, .nav-mobile-toggle, .clean-mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!toggleButtons.length || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (toggleButtons[0]) toggleButtons[0].focus();
  };

  toggleButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close on nav link click
  const navLinks = drawer.querySelectorAll('.mobile-nav-link, .btn, .btn-pill-orange');
  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   3. Animated Metric Counters
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter-target'));
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1600;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeProgress;

      if (isDecimal) {
        el.textContent = currentVal.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(currentVal).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = (isDecimal ? target.toFixed(1) : target.toLocaleString()) + suffix;
      }
    }

    requestAnimationFrame(update);
  }
}

/* --------------------------------------------------------------------------
   4. Testimonials Slider
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;

  const updateSlider = () => {
    const isMobile = window.innerWidth <= 860;
    const cardsPerView = isMobile ? 1 : 2;
    const maxIndex = Math.max(0, totalCards - cardsPerView);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const shiftPercent = isMobile ? (currentIndex * 100) : (currentIndex * 50);
    track.style.transform = `translateX(-${shiftPercent}%)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
  };

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}

/* --------------------------------------------------------------------------
   5. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Quick Demo Modal & Popups
   -------------------------------------------------------------------------- */
function initDemoModal() {
  const modal = document.getElementById('demoModal');
  const openButtons = document.querySelectorAll('[data-open-demo-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  if (!modal) return;

  const open = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  };

  const close = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  }));

  closeButtons.forEach(btn => btn.addEventListener('click', close));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      close();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Global Toast Notification Utility
   -------------------------------------------------------------------------- */
window.showToast = function(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

/* --------------------------------------------------------------------------
   8. Interactive Board Selector in Clean Hero
   -------------------------------------------------------------------------- */
function initBoardSelector() {
  const boardBtn = document.getElementById('boardSelectBtn');
  if (!boardBtn) return;

  const boards = ['State / CBSE', 'Kerala SCERT', 'CBSE (NCERT)'];
  let currentIdx = 0;

  boardBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % boards.length;
    const labelSpan = boardBtn.querySelector('span:nth-child(2)');
    if (labelSpan) {
      labelSpan.textContent = boards[currentIdx];
    }
    if (window.showToast) {
      window.showToast(`Curriculum filtered: ${boards[currentIdx]}`, 'info');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBoardSelector();
});
