/**
 * Interactive Canvas Dot Grid Background
 * Reacts to mouse movement by repelling dots. Scoped to illustration container.
 */
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || window.innerWidth < 768) return;

  const canvas = document.getElementById('interactiveCanvas');
  const container = document.getElementById('hero-illus');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dots = [];
  
  const spacing = 32;
  const radius = 1.5;
  const mouseRadius = 150;
  const repelStrength = 0.5;
  const returnStrength = 0.08;

  let mouse = { x: -1000, y: -1000 };
  let bounds = container.getBoundingClientRect();

  function init() {
    bounds = container.getBoundingClientRect();
    // Oversize canvas slightly to cover container fully
    width = bounds.width * 1.5;
    height = bounds.height * 1.5;
    canvas.width = width;
    canvas.height = height;

    const cols = Math.floor(width / spacing) + 2;
    const rows = Math.floor(height / spacing) + 2;
    
    dots = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;
        dots.push({ baseX: x, baseY: y, x: x, y: y, vx: 0, vy: 0 });
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(23, 23, 25, 0.25)';

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseRadius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouseRadius - distance) / mouseRadius;
        dot.vx -= forceDirectionX * force * repelStrength;
        dot.vy -= forceDirectionY * force * repelStrength;
      }
      
      dot.vx += (dot.baseX - dot.x) * returnStrength;
      dot.vy += (dot.baseY - dot.y) * returnStrength;
      dot.vx *= 0.82;
      dot.vy *= 0.82;
      
      dot.x += dot.vx;
      dot.y += dot.vy;
      
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  container.addEventListener('pointermove', (e) => {
    // Canvas is larger than container and offset by -25%
    mouse.x = e.clientX - bounds.left + (width * 0.16); 
    mouse.y = e.clientY - bounds.top + (height * 0.16);
  });

  container.addEventListener('pointerleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => { init(); }, { passive: true });

  init();
  animate();
});
