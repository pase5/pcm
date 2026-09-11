/**
 * Zenith Academy - Course Catalogue & Dynamic Filtering Engine
 * Supports Board switcher, Class level filters, Search, and Course Detail Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initCourseFiltering();
});

function initCourseFiltering() {
  const container = document.getElementById('coursesContainer');
  if (!container && !window.ACADEMY_DATA) return;

  let activeBoard = 'all';
  let activeClass = 'all';
  let searchQuery = '';

  // Check URL params for initial filters (deep linking)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('board')) activeBoard = urlParams.get('board');
  if (urlParams.get('class')) activeClass = urlParams.get('class');

  // DOM Elements
  const boardTabs = document.querySelectorAll('[data-board-filter]');
  const classPills = document.querySelectorAll('[data-class-filter]');
  const searchInput = document.getElementById('courseSearchInput');
  const resultCountEl = document.getElementById('courseResultCount');

  // Sync initial UI state from URL params
  boardTabs.forEach(tab => {
    if (tab.getAttribute('data-board-filter') === activeBoard) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  classPills.forEach(pill => {
    if (pill.getAttribute('data-class-filter') === activeClass) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  function renderCourses() {
    if (!container) return;

    const filtered = window.ACADEMY_DATA.courses.filter(course => {
      // Board filter
      const matchesBoard = (activeBoard === 'all') || 
                           (course.board === 'both') || 
                           (course.board === activeBoard);

      // Class filter
      let matchesClass = false;
      if (activeClass === 'all') {
        matchesClass = true;
      } else if (activeClass === '8-10') {
        matchesClass = ['8-9', '10'].includes(course.classLevel);
      } else if (activeClass === '11') {
        matchesClass = course.classLevel === '11';
      } else if (activeClass === '12') {
        matchesClass = course.classLevel === '12';
      }

      // Search query
      const matchesSearch = !searchQuery || 
        course.title.toLowerCase().includes(searchQuery) ||
        course.summary.toLowerCase().includes(searchQuery) ||
        course.subjects.some(s => s.toLowerCase().includes(searchQuery));

      return matchesBoard && matchesClass && matchesSearch;
    });

    if (resultCountEl) {
      resultCountEl.textContent = `Showing ${filtered.length} course${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px; background: var(--color-surface-dark); border-radius: var(--radius-lg); border: 1px dashed var(--color-border-dark);">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">🔍</div>
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No courses found</h3>
          <p style="color: var(--color-text-muted-dark); max-width: 420px; margin-inline: auto; margin-bottom: 20px;">
            We couldn't find any courses matching your current filter criteria.
          </p>
          <button class="btn btn-secondary btn-sm" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeBoard = 'all';
          activeClass = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          boardTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-board-filter') === 'all'));
          classPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-class-filter') === 'all'));
          renderCourses();
        });
      }
      return;
    }

    container.innerHTML = filtered.map((course, index) => {
      const isKerala = course.board === 'kerala';
      const boardLabel = course.board === 'both' ? 'Kerala & CBSE' : isKerala ? 'Kerala State' : 'CBSE';
      const boardClass = isKerala ? 'board-kerala' : 'board-cbse';
      
      const delayClass = `delay-${Math.min((index % 4 + 1) * 100, 400)}`;

      return `
        <article class="course-card-premium reveal-up ${delayClass}" data-course-id="${course.id}">
          <div class="course-badge-row">
            <span class="badge-tag ${boardClass}">${boardLabel} • Class ${course.classLevel}</span>
            <span class="badge-tag mode-pill">${course.mode}</span>
          </div>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-summary">${course.summary}</p>
          
          <div class="subject-pills-list">
            ${course.subjects.map(sub => `<span class="subject-pill">${sub}</span>`).join('')}
          </div>

          <div class="course-footer">
            <span class="batch-status">${course.batchStatus}</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-pill-outline view-course-detail-btn" data-id="${course.id}" style="padding: 8px 16px; font-size: 0.85rem;">Details</button>
              <button class="btn-pill-orange open-demo-btn" data-course-title="${course.title}" style="padding: 8px 16px; font-size: 0.85rem;">Enquire &rarr;</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Trigger reveal animations for the newly rendered cards
    setTimeout(() => {
      container.querySelectorAll('.reveal-up').forEach(el => el.classList.add('is-revealed'));
    }, 50);

    // Attach click events
    container.querySelectorAll('.view-course-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-id');
        openCourseDetailModal(cId);
      });
    });

    container.querySelectorAll('.open-demo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-course-title');
        const modal = document.getElementById('demoModal');
        if (modal) {
          const courseSelect = modal.querySelector('select[name="courseInterest"]');
          if (courseSelect) {
            // Check if option exists, else set or select closest
            for (let i = 0; i < courseSelect.options.length; i++) {
              if (courseSelect.options[i].text.includes(title.split(' ')[0])) {
                courseSelect.selectedIndex = i;
                break;
              }
            }
          }
          modal.classList.add('active');
        }
      });
    });
  }

  // Board switch event
  boardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      boardTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeBoard = tab.getAttribute('data-board-filter');
      renderCourses();
    });
  });

  // Class pill event
  classPills.forEach(pill => {
    pill.addEventListener('click', () => {
      classPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeClass = pill.getAttribute('data-class-filter');
      renderCourses();
    });
  });

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCourses();
    });
  }

  // Initial render
  renderCourses();
}

/**
 * Course Detail Modal Viewer
 */
function openCourseDetailModal(courseId) {
  const course = window.ACADEMY_DATA.courses.find(c => c.id === courseId);
  if (!course) return;

  let modal = document.getElementById('courseDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'courseDetailModal';
    modal.className = 'site-modal';
    modal.innerHTML = `
      <div class="modal-dialog">
        <button class="modal-close-btn" data-close-course-modal aria-label="Close modal">&times;</button>
        <div id="courseModalBody"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('[data-close-course-modal]').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  const modalBody = modal.querySelector('#courseModalBody');
  const isKerala = course.board === 'kerala';
  const boardLabel = course.board === 'both' ? 'Kerala State & CBSE' : isKerala ? 'Kerala State Syllabus' : 'CBSE Board';

  modalBody.innerHTML = `
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <span class="badge-tag ${isKerala ? 'board-kerala' : 'board-cbse'}">${boardLabel}</span>
      <span class="badge-tag mode-pill">${course.mode}</span>
    </div>
    <h2 style="font-size: 1.8rem; margin-bottom: 12px; color: #121310;">${course.title}</h2>
    <p style="color: #55574F; margin-bottom: 24px; font-size: 1.05rem;">${course.summary}</p>
    
    <div style="background: #F7F6F0; padding: 20px; border-radius: var(--radius-md); margin-bottom: 24px;">
      <h4 style="font-size: 0.95rem; text-transform: uppercase; color: #8A6D00; margin-bottom: 10px; font-weight: 700;">Curriculum Highlights</h4>
      <ul style="display: flex; flex-direction: column; gap: 8px;">
        ${course.features.map(f => `<li style="display: flex; align-items: center; gap: 8px; font-size: 0.92rem; color: #242521;">✓ ${f}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 4px;">BATCH TIMINGS:</div>
      <div style="font-size: 0.95rem; font-weight: 600; color: #121310;">${course.schedule}</div>
    </div>

    <div style="margin-bottom: 28px;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 4px;">FACULTY MENTORS:</div>
      <div style="font-size: 0.95rem; color: #121310;">${course.faculty.join(', ')}</div>
    </div>

    <div style="display: flex; gap: 12px;">
      <button class="btn btn-primary btn-block" onclick="document.getElementById('courseDetailModal').classList.remove('active'); document.getElementById('demoModal').classList.add('active');">
        Enrol / Book Free Demo
      </button>
      <a href="https://wa.me/919847012345?text=Hello%20Zenith%20Academy,%20I%20am%20interested%20in%20${encodeURIComponent(course.title)}" target="_blank" class="btn btn-whatsapp" style="padding-inline: 18px;">
        WhatsApp
      </a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
