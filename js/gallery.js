/**
 * Zenith Academy - Pinterest-Style Masonry Photo Gallery & Accessible Lightbox
 * Compliant with IMPLEMENTATION.md Section 15
 */

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

function initGallery() {
  const galleryGrid = document.getElementById('galleryMasonry');
  if (!galleryGrid && !window.ACADEMY_DATA) return;

  const filterButtons = document.querySelectorAll('[data-gallery-filter]');
  let activeCategory = 'all';
  let currentIndex = 0;
  let visibleItems = [];

  function renderGallery() {
    if (!galleryGrid) return;

    visibleItems = window.ACADEMY_DATA.gallery.filter(item => {
      if (activeCategory === 'all') return true;
      return item.category.toLowerCase() === activeCategory.toLowerCase();
    });

    galleryGrid.innerHTML = visibleItems.map((item, idx) => `
      <div class="gallery-item" data-index="${idx}" tabindex="0" role="button" aria-label="View photo: ${item.title}">
        <img 
          src="${item.img}" 
          alt="${item.title}" 
          class="gallery-thumb" 
          loading="lazy"
        />
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.category}</span>
          <p class="gallery-caption">${item.title}</p>
        </div>
      </div>
    `).join('');

    // Attach click and keyboard events
    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        openLightbox(index);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const index = parseInt(el.getAttribute('data-index'), 10);
          openLightbox(index);
        }
      });
    });
  }

  // Filter clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-gallery-filter');
      renderGallery();
    });
  });

  // Lightbox Implementation
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  function openLightbox(index) {
    if (!lightbox || !visibleItems[index]) return;
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = visibleItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.img;
    lightboxImg.alt = item.title;
    lightboxCaption.innerHTML = `
      <div style="font-size: 0.8rem; color: var(--color-brand-primary); font-weight: 700; text-transform: uppercase;">
        ${item.category}
      </div>
      <div>${item.title}</div>
    `;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightboxContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % visibleItems.length;
      updateLightboxContent();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightboxContent();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      updateLightboxContent();
    }
  });

  renderGallery();
}
