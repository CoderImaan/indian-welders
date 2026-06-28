/* ============================================================
   Indian Welders — main.js  v2
   ============================================================ */

/* ---- HEADER SCROLL ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- MOBILE NAV ---- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  nav.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---- ACTIVE NAV ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObs.observe(s));

/* ---- BACK TO TOP ---- */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ---- COUNTERS ---- */
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = target / (1800 / 16);
      const t = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(t); }
        el.textContent = Math.floor(current);
      }, 16);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

/* ---- YEAR ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- VIDEO ----
   Your video file goes at: videos/workshop-showcase.mp4
   Poster thumbnail goes at: videos/video-poster.jpg
   The <video> element in index.html handles everything natively.
   No JS needed — browser controls play/pause/fullscreen automatically.
   ------------------------------------------------------------ */

/* ---- CONTACT FORM → WhatsApp ----
   WhatsApp wa.me format:
   https://wa.me/<countrycode><number>?text=<encoded>
   91 = India country code, no + sign, no spaces, no dashes
   ------------------------------------------------------------ */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  ['name', 'phone', 'service'].forEach(id => {
    const el = form.querySelector('#' + id);
    el.classList.toggle('error', !el.value.trim());
    if (!el.value.trim()) valid = false;
  });
  if (!valid) return;

  const name     = form.querySelector('#name').value.trim();
  const phone    = form.querySelector('#phone').value.trim();
  const service  = form.querySelector('#service').value;
  const location = form.querySelector('#location').value.trim();
  const message  = form.querySelector('#message').value.trim();

  // Craft natural-language WhatsApp message
  let msg = `Hello Indian Welders,\n\nI am *${name}* (${phone}) and I need *${service}*.`;
  if (location) msg += `\n📍 Location: ${location}`;
  if (message)  msg += `\n\nDetails: ${message}`;
  msg += `\n\nPlease get back to me. Thank you!`;

  // wa.me with India country code 91 — no +, no spaces — opens chat directly
  const waURL = `https://wa.me/917097387863?text=${encodeURIComponent(msg)}`;
  window.open(waURL, '_blank', 'noopener,noreferrer');

  formSuccess.style.display = 'block';
  form.reset();
});

form.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('error'));
});

/* ---- GALLERY LIGHTBOX ---- */
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.93);display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
    const big = document.createElement('img');
    big.src = img.src; big.alt = img.alt;
    big.style.cssText = 'max-width:92vw;max-height:90vh;object-fit:contain;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,.6);';
    overlay.appendChild(big);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function esc(ev) {
      if (ev.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });
  });
});
