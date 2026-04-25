/**
 * nav.js — Mobile navigation & hamburger menu
 */

(function () {
  'use strict';

  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.style.display = 'flex';
    mobileMenu.setAttribute('aria-hidden', 'false');
    // Allow display:flex to render before triggering opacity transition
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Wait for opacity transition before hiding from layout
    setTimeout(() => { mobileMenu.style.display = 'none'; }, 250);
  }

  function toggleMenu() {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  }

  // Hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close on nav link click
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close if viewport resizes past mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && hamburger.classList.contains('open')) {
      closeMenu();
    }
  });
})();
