// ============================================
// 3PEAK — Shared site behavior
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initNavDropdown();
  initHeaderScroll();
  initFaqAccordion();
  initCommunityForm();
  initNewsletterForm();
  markActiveNavLink();
});

/* Mobile nav toggle */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('is-open'));
  });
}

/* Benefits nav dropdown — click/tap to toggle, closes on outside click or Escape */
function initNavDropdown() {
  const dropdown = document.querySelector('.nav-dropdown');
  const trigger = document.querySelector('.nav-dropdown-trigger');
  if (!dropdown || !trigger) return;

  const close = () => {
    dropdown.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  dropdown.querySelectorAll('.nav-dropdown-menu a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* Slight header background boost on scroll */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.style.background = window.scrollY > 20
      ? 'rgba(255, 255, 255, 0.92)'
      : 'rgba(255, 255, 255, 0.75)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* FAQ accordion (benefits page) */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* Community "share your idea" form — front-end only */
function initCommunityForm() {
  const form = document.getElementById('community-form');
  if (!form) return;

  const success = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    if (success) {
      success.classList.add('show');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* Newsletter signup — front-end only */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    if (!input || !input.value) return;

    const original = button.innerHTML;
    button.innerHTML = '✓';
    input.value = '';
    setTimeout(() => { button.innerHTML = original; }, 2000);
  });
}

/* Highlight current page in nav */
function markActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  const trigger = document.querySelector('.nav-dropdown-trigger');
  if (trigger && (path === 'benefits.html' || path === 'science.html')) {
    trigger.classList.add('active');
  }
}
