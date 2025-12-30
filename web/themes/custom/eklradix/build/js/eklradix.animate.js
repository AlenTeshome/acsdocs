const observerOptions = {
  threshold: 0.1,
  rootMargin: '100px 0px -100px 0px'
};

// Define all classes you want to observe
const observedSelectors = [
  '.pre-event-row',
  '.solutionpoints',
  '.overview-row',
  '.values.views-row',
  '.stages-row',
  '.speaker-row'
];

// Cache elements per selector for consistent indexing
const groupedElements = {};
observedSelectors.forEach(selector => {
  groupedElements[selector] = Array.from(document.querySelectorAll(selector));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.target) return;

    const target = entry.target;

    // Find which selector group this element belongs to
    const selector = observedSelectors.find(sel =>
      target.matches(sel)
    );

    if (!selector) return;

    const group = groupedElements[selector];
    const idx = group.indexOf(target);
    const delay = (idx >= 0 ? idx : 0) * 150;

    if (entry.isIntersecting) {
      if (target._animTimeout) {
        clearTimeout(target._animTimeout);
      }

      target._animTimeout = setTimeout(() => {
        target.classList.add('animate');
        target._animTimeout = null;
      }, delay);
    } else {
      if (target._animTimeout) {
        clearTimeout(target._animTimeout);
        target._animTimeout = null;
      }
      target.classList.remove('animate');
    }
  });
}, observerOptions);

// Observe everything
Object.values(groupedElements).flat().forEach(el => observer.observe(el));





// Small JS: smooth-scroll for internal links + animate .progress-fill when visible
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (hash && hash.length > 1) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          try { history.pushState(null, '', hash); } catch (err) { /* ignore */ }
        }
      }
    });
  });

  // Progress-fill animation when in view
  const fills = document.querySelectorAll('.progress-fill');
  if (fills.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          // Determine target percent: data-target-percent | data-target | aria-valuenow | inline style width
          let t = el.dataset.targetPercent || el.getAttribute('data-target') || el.getAttribute('aria-valuenow') || '';
          if (!t) {
            const w = el.style.width || window.getComputedStyle(el).width;
            // can't compute percent reliably from computed width; default to 100
          }
          let percent = parseFloat(t);
          if (isNaN(percent)) percent = 100;
          el.style.transition = el.style.transition || 'width 1000ms ease';
          el.style.width = '0%';
          // force reflow
          void el.offsetWidth;
          el.style.width = percent + '%';
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    fills.forEach(f => {
      // Ensure starting state
      if (!f.style.width) f.style.width = '0%';
      io.observe(f);
    });
  }
});