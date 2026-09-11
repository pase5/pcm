/**
 * Zenith Academy - Core Interactive Engine
 * Navigation, Drawer, Counter Animations, Accordions, Testimonial Slider, Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeader();
  initMobileDrawer();
  initMetricCounters();
  initTestimonialSlider();
  initFaqAccordion();
  initDemoModal();
});

/* --------------------------------------------------------------------------
   0. Preloader & GSAP Init
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressText = document.getElementById('loader-progress');
  const progressBar = document.getElementById('loader-progress-bar');
  
  if (!preloader) return;

  if (typeof gsap === 'undefined') {
    // Fallback if GSAP fails to load
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.style.display = 'none', 800);
    }, 1000);
    return;
  }

  // Simulate loading progress
  let progress = { value: 0 };
  gsap.to(progress, {
    value: 100,
    duration: 1.6,
    ease: "power2.inOut",
    onUpdate: () => {
      const val = Math.round(progress.value);
      if (progressText) progressText.innerText = val + '%';
      if (progressBar) progressBar.style.width = val + '%';
    },
    onComplete: () => {
      // Fade out preloader
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          preloader.classList.add('loaded');
          preloader.style.display = 'none';
          initGsapHeroAnimations();
          initHero3DTilt();
        }
      });
    }
  });
}

function initGsapHeroAnimations() {
  if (typeof gsap === 'undefined') return;
  
  const tl = gsap.timeline();
  
  // Animate Hero Elements (Fade up)
  if (document.querySelector('.clean-hero-title')) {
    tl.fromTo('.clean-hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.clean-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.clean-hero-cta-group', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.clean-hero-trust', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.4');
  }
  
  // Right side staggering
  if (document.querySelector('.bento-student-img')) {
    tl.fromTo('.bento-illustration-wrap', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=1')
      .fromTo('#hero-card-lime', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.6')
      .fromTo('#hero-card-lavender', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .fromTo('#hero-card-tall', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      
    // Chat bubbles stagger
    tl.fromTo('.chat-bubble.bubble-lime', { scale: 0.9, opacity: 0, transformOrigin: 'bottom right' }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2')
      .fromTo('.chat-bubble.bubble-white', { scale: 0.9, opacity: 0, transformOrigin: 'bottom left' }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.4 });
  }
  
  // Navbar 
  if (document.querySelector('.floating-pill-nav')) {
    gsap.fromTo('.floating-header-wrapper', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1.5');
  }

  // Scroll Parallax (ScrollTrigger)
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    if (document.querySelector('.clean-hero-text-col')) {
      gsap.to('.clean-hero-text-col', {
        y: -40, opacity: 0.2,
        scrollTrigger: { trigger: '.clean-hero-backdrop-wrapper', start: 'top top', end: 'bottom center', scrub: true }
      });
      
      gsap.to('#hero-illus', {
        y: -20,
        scrollTrigger: { trigger: '.clean-hero-backdrop-wrapper', start: 'top top', end: 'bottom top', scrub: true }
      });
      
      gsap.to('#hero-chat', {
        y: -70,
        scrollTrigger: { trigger: '.clean-hero-backdrop-wrapper', start: 'top top', end: 'bottom top', scrub: true }
      });
      
      gsap.to('#hero-card-lime', {
        y: -35,
        scrollTrigger: { trigger: '.clean-hero-backdrop-wrapper', start: 'top top', end: 'bottom top', scrub: true }
      });

      gsap.to('#hero-card-tall', {
        y: -90,
        scrollTrigger: { trigger: '.clean-hero-backdrop-wrapper', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  }
}

function initHero3DTilt() {
  const stage = document.getElementById('heroInteractiveStage');
  if (!stage) return;
  
  const cards = document.querySelectorAll('.hero-interactive-card');
  if (cards.length === 0) return;

  stage.addEventListener('mousemove', (e) => {
    // Check if reduced motion is preferred or mobile screen
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const percentX = (x - centerX) / centerX; // -1 to 1
    const percentY = (y - centerY) / centerY; // -1 to 1

    cards.forEach(card => {
      const speed = parseFloat(card.getAttribute('data-speed')) || 1;
      
      // Calculate subtle translations and rotations
      const translateX = percentX * speed * 3;
      const translateY = percentY * speed * 3;
      const rotateX = -percentY * speed * 0.5; // Up/down mouse rotates card around X
      const rotateY = percentX * speed * 0.5;  // Left/right mouse rotates card around Y
      
      gsap.to(card, {
        x: translateX,
        y: translateY,
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });

  stage.addEventListener('mouseleave', () => {
    cards.forEach(card => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

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

/* --------------------------------------------------------------------------
   9. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   10. Parallax Effects
   -------------------------------------------------------------------------- */
function initParallaxEffects() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (!parallaxLayers.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxLayers.forEach(layer => {
      const speed = layer.getAttribute('data-speed') || 0.5;
      layer.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initBoardSelector();
  initScrollAnimations();
  initParallaxEffects();
});
