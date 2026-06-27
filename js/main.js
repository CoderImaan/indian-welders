/* ============================================================
   Indian Welders – main.js
   ============================================================ */

/* ---------- HEADER SCROLL ---------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- MOBILE NAV ---------- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});
// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

/* ---------- ACTIVE NAV LINK ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observerOptions = { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, observerOptions);
sections.forEach(s => sectionObserver.observe(s));

/* ---------- BACK TO TOP ---------- */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ---------- COUNTER ANIMATION ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterEls = document.querySelectorAll('.stat-num[data-target]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

/* ---------- FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- CONTACT FORM (Static / GitHub Pages) ---------- */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  // Simple validation
  ['name', 'phone', 'service'].forEach(id => {
    const el = form.querySelector(`#${id}`);
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    } else {
      el.classList.remove('error');
    }
  });

  if (!valid) return;

  // Build WhatsApp URL as fallback for static hosting
  const name = form.querySelector('#name').value.trim();
  const phone = form.querySelector('#phone').value.trim();
  const service = form.querySelector('#service').value;
  const location = form.querySelector('#location').value.trim();
  const message = form.querySelector('#message').value.trim();

  const waText = encodeURIComponent(
    `*New Enquiry – Indian Welders*\n\n` +
    `Name: ${name}\nPhone: ${phone}\nService: ${service}` +
    (location ? `\nLocation: ${location}` : '') +
    (message ? `\n\nDetails: ${message}` : '')
  );

  // Open WhatsApp with pre-filled message
  window.open(`https://wa.me/917097387863?text=${waText}`, '_blank');

  formSuccess.style.display = 'block';
  form.reset();
  form.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

/* ---------- REMOVE ERROR CLASS ON INPUT ---------- */
form.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('error'));
});

/* ---------- GALLERY LIGHTBOX (simple) ---------- */
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);
      display:flex;align-items:center;justify-content:center;cursor:zoom-out;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    bigImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px;';
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
  });
});
