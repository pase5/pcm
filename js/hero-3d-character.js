/**
 * Character Poster Logic (Fallback for missing 3D Model)
 * Applies a subtle whole-layer tilt based on pointer position.
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-illus');
  const poster = document.getElementById('characterPoster');
  
  if (!container || !poster) return;

  // Check motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let bounds = container.getBoundingClientRect();
  
  // Update bounds on resize
  window.addEventListener('resize', () => {
    bounds = container.getBoundingClientRect();
  }, { passive: true });

  const maxTilt = 8; // Max degrees to tilt

  container.addEventListener('pointermove', (e) => {
    // Normalize coordinates -1 to 1
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    
    const normX = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, (y - 0.5) * 2));

    // Pitch (X-axis) and Yaw (Y-axis)
    // Looking left means Y rotates negatively, etc.
    const rotateY = normX * maxTilt;
    const rotateX = -normY * maxTilt;

    poster.style.transform = \otateX(\deg) rotateY(\deg)\;
  });

  container.addEventListener('pointerleave', () => {
    // Smooth return to neutral
    poster.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    poster.style.transform = 'rotateX(0deg) rotateY(0deg)';
    
    // Remove transition after it settles so pointermove is responsive
    setTimeout(() => {
      poster.style.transition = 'transform 0.1s ease-out';
    }, 400);
  });

  // Setup initial transition
  poster.style.transition = 'transform 0.1s ease-out';

  });
