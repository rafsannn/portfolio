/**
 * animations.js — Scroll-triggered reveal animations
 * Uses IntersectionObserver to add .visible to .reveal elements
 * as they enter the viewport.
 */

(function () {
  'use strict';

  // Skip if browser doesn't support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const STAGGER_DELAY_MS = 80;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(
        () => entry.target.classList.add('visible'),
        i * STAGGER_DELAY_MS
      );
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
