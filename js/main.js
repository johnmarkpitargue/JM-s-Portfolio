/* ── Bento card cursor glow ── */
document.querySelectorAll('.bento-glow').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
    card.style.setProperty('--glow-opacity', '1');
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--glow-opacity', '0');
  });
});

/* ── Scroll fade-in animations ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate]').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

/* ── Tech stack interactive filter ── */
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach((icon) => {
  icon.addEventListener('mouseenter', () => {
    techIcons.forEach((other) => {
      if (other !== icon) {
        other.style.opacity = '0.4';
        other.style.filter = 'grayscale(0.6)';
      }
    });
  });
  icon.addEventListener('mouseleave', () => {
    techIcons.forEach((other) => {
      other.style.opacity = '1';
      other.style.filter = 'none';
    });
  });
});

/* ── Contact form ── */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.className = 'mt-4 text-center text-sm text-red-400';
    status.classList.remove('hidden');
    return;
  }

  status.textContent = `Thanks, ${name}! Your message has been received.`;
  status.className = 'mt-4 text-center text-sm text-emerald-400';
  status.classList.remove('hidden');
  form.reset();

  setTimeout(() => status.classList.add('hidden'), 4000);
});

/* ── Navbar background on scroll ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('shadow-lg', 'shadow-violet-950/20');
  } else {
    nav.classList.remove('shadow-lg', 'shadow-violet-950/20');
  }
}, { passive: true });

/* ── Mobile menu ── */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function setMobileMenuOpen(isOpen) {
  mobileMenuBtn.classList.toggle('is-open', isOpen);
  mobileMenu.classList.toggle('is-open', isOpen);
  mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('menu-open', isOpen);
}

mobileMenuBtn.addEventListener('click', () => {
  setMobileMenuOpen(!mobileMenu.classList.contains('is-open'));
});

mobileNavLinks.forEach((link) => {
  link.addEventListener('click', () => setMobileMenuOpen(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    setMobileMenuOpen(false);
  }
});

window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
  if (e.matches) setMobileMenuOpen(false);
});
