/* ============================================================
   RAMEE BORDOLOI — PORTFOLIO
   script.js
   ============================================================
   Sections:
   1. Nav — scroll & mobile hamburger behaviour
   2. Scroll animations — IntersectionObserver fade-ins
   3. Smooth scroll — accessible anchor scroll
   4. Active nav highlight — on scroll
   5. Footer year — auto-updates copyright
   6. Utilities
   ============================================================ */

'use strict';

// iOS Safari requires at least one touchstart listener on an ancestor for
// :active pseudo-class to fire reliably on <a> elements.
document.body.addEventListener('touchstart', () => {}, { passive: true });

/* ============================================================
   1. NAV — SCROLL BEHAVIOUR & MOBILE HAMBURGER
   ============================================================ */

const nav         = document.getElementById('nav');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

// ── Scroll: add/remove .scrolled class ──
const NAV_SCROLL_THRESHOLD = 40; // px before nav becomes solid

function handleNavScroll() {
  if (window.scrollY > NAV_SCROLL_THRESHOLD) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
// Run once on page load in case user is mid-page on refresh
handleNavScroll();


// ── Mobile hamburger toggle ──
let mobileMenuOpen = false;

function openMobileMenu() {
  mobileMenuOpen = true;
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  // Prevent body scroll while menu is open
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenuOpen = false;
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Expose closeMobileMenu globally so inline onclick in HTML can call it
window.closeMobileMenu = closeMobileMenu;

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOpen) {
    closeMobileMenu();
    hamburger.focus();
  }
});

// Close menu when clicking outside (on the page overlay)
document.addEventListener('click', (e) => {
  if (
    mobileMenuOpen &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});


/* ============================================================
   2. SCROLL ANIMATIONS — IntersectionObserver
   ============================================================
   Elements with .fade-up or .fade-up-stagger start invisible
   (set in CSS) and receive .is-visible when they enter the
   viewport, triggering their CSS transition.
   ============================================================ */

const ANIMATION_THRESHOLD = 0.12; // % of element visible to trigger
const ANIMATION_ROOT_MARGIN = '0px 0px -60px 0px'; // trigger slightly before bottom edge

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after animation fires — no need to repeat
        animationObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold:  ANIMATION_THRESHOLD,
    rootMargin: ANIMATION_ROOT_MARGIN,
  }
);

// Observe all fade-up and fade-up-stagger elements
function initScrollAnimations() {
  const fadeTargets = document.querySelectorAll('.fade-up, .fade-up-stagger');
  fadeTargets.forEach((el) => animationObserver.observe(el));
}

// ── Respect prefers-reduced-motion ──
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleReducedMotion() {
  if (prefersReducedMotion.matches) {
    // Make all animated elements visible immediately — no transitions
    document.querySelectorAll('.fade-up, .fade-up-stagger, .fade-up-stagger > *').forEach((el) => {
      el.style.opacity     = '1';
      el.style.transform   = 'none';
      el.style.transition  = 'none';
    });
  } else {
    initScrollAnimations();
  }
}

prefersReducedMotion.addEventListener('change', handleReducedMotion);
handleReducedMotion();


/* ============================================================
   3. SMOOTH SCROLL — ACCESSIBLE ANCHOR NAVIGATION
   ============================================================
   Progressively enhances anchor links. Falls back to browser
   default if JS is unavailable.
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip empty anchors

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    // Calculate offset to account for fixed nav
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({
      top:      targetTop,
      behavior: 'smooth',
    });

    // Move focus to target for accessibility (screen readers)
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  });
});


/* ============================================================
   4. ACTIVE NAV HIGHLIGHT — Highlight link of current section
   ============================================================ */

const sections  = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.style.color = 'var(--color-text-primary)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -40% 0px',
    threshold:  0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));


/* ============================================================
   5. FOOTER YEAR — AUTO-UPDATE COPYRIGHT
   ============================================================ */

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ============================================================
   6. PROJECT CARD — KEYBOARD NAVIGATION ENHANCEMENT
   ============================================================
   Ensures project cards are fully operable via keyboard,
   treating the whole card as a single focusable/activatable
   unit even though only the <a> tag is the real link.
   ============================================================ */

document.querySelectorAll('.project-card').forEach((card) => {
  // Cards are already <a> tags — just add a visual hover class
  // for consistency when keyboard-focused.
  card.addEventListener('focus', () => card.classList.add('card--focused'));
  card.addEventListener('blur',  () => card.classList.remove('card--focused'));
});


/* ============================================================
   7. CASE STUDY PAGE — PARALLAX SCROLL (subtle)
   ============================================================
   On case study pages, the cover image gets a subtle parallax
   effect on scroll. Only runs if .cs-cover exists.
   ============================================================ */

const csCover = document.querySelector('.cs-cover img');

if (csCover && !prefersReducedMotion.matches) {
  function handleCoverParallax() {
    const scrollY = window.scrollY;
    // Move image slightly slower than scroll for parallax feel
    csCover.style.transform = `translateY(${scrollY * 0.12}px)`;
  }

  window.addEventListener('scroll', handleCoverParallax, { passive: true });
}


/* ============================================================
   8. CONTACT FORM — Google Sheets via Apps Script
   ============================================================
   Setup steps:
   1. Open your Google Sheet.
   2. Extensions → Apps Script → paste the server-side script
      (see comment below), deploy as Web App (anyone can access).
   3. Replace GOOGLE_SCRIPT_URL below with your deployment URL.

   Apps Script to paste in Google:
   ─────────────────────────────────────────────────────────────
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data  = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.name,
       data.email,
       data.services,
       data.budget,
       data.details
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ result: 'success' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ─────────────────────────────────────────────────────────────
   ============================================================ */

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEl    = document.getElementById('cf-name');
    const emailEl   = document.getElementById('cf-email');
    const detailsEl = document.getElementById('cf-details');

    // Basic validation
    let valid = true;
    [nameEl, emailEl].forEach((el) => {
      el.classList.remove('error');
      if (!el.value.trim()) {
        el.classList.add('error');
        valid = false;
      }
    });

    if (!valid) {
      formStatus.textContent = 'Please fill in your name and email.';
      formStatus.className   = 'contact-form__status error';
      return;
    }

    // Collect checked services
    const services = Array.from(
      contactForm.querySelectorAll('input[name="service"]:checked')
    ).map((cb) => cb.value).join(', ');

    // Collect selected budget
    const budgetEl = contactForm.querySelector('input[name="budget"]:checked');
    const budget   = budgetEl ? budgetEl.value : '';

    const payload = {
      name:     nameEl.value.trim(),
      email:    emailEl.value.trim(),
      services: services || 'Not specified',
      budget:   budget   || 'Not specified',
      details:  detailsEl ? detailsEl.value.trim() : '',
    };

    // Disable submit while sending
    const submitBtn = contactForm.querySelector('.contact-form__submit');
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    formStatus.textContent = '';
    formStatus.className   = 'contact-form__status';

    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      // Dev mode — log payload and show success without a real request
      console.log('Form payload (dev mode):', payload);
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Submit Inquiry ↗';
      formStatus.textContent = '(Dev mode) Form data logged to console.';
      formStatus.className   = 'contact-form__status';
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode:   'no-cors', // Apps Script requires no-cors
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // no-cors means we can't read the response — assume success
      contactForm.reset();
      formStatus.textContent = 'Inquiry sent! I\'ll be in touch soon.';
      formStatus.className   = 'contact-form__status success';
    } catch {
      formStatus.textContent = 'Something went wrong. Please email me directly.';
      formStatus.className   = 'contact-form__status error';
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Submit Inquiry ↗';
    }
  });
}


/* ============================================================
   8. CURSOR HIGHLIGHT (subtle — desktop only)
   ============================================================
   A very subtle glow follows the cursor on project cards,
   adding a tactile, premium feel without being distracting.
   ============================================================ */

if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion.matches) {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width)  * 100;
      const y      = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}
