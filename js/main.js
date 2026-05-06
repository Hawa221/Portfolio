/* ===========================
   NAVIGATION
=========================== */
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

// Scroll shadow
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// Hamburger
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   LANGUAGE BARS
=========================== */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.lang-fill');
      if (fill) {
        const target = fill.dataset.width;
        setTimeout(() => { fill.style.width = target; }, 150);
      }
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.lang-item').forEach(item => {
  const fill = item.querySelector('.lang-fill');
  if (fill) {
    fill.dataset.width = fill.style.width;
    fill.style.width = '0';
    barObserver.observe(item);
  }
});

/* ===========================
   TYPING EFFECT on hero h1
=========================== */
const h1 = document.querySelector('#hero h1');
if (h1) {
  const fullHTML = h1.innerHTML;
  // Only run on index page (hero exists)
  // Wrap text nodes to animate, keep <span> intact
}

/* ===========================
   CURSOR ACCENT on nav links
=========================== */
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.18s ease';
  });
});

/* ===========================
   ACTIVE NAV HIGHLIGHT
   from scroll position
=========================== */
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0) {
  const navLinks = document.querySelectorAll('nav ul li a');
  const scrollSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(entry.target.id)) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => scrollSpy.observe(s));
}

/* ===========================
   SMOOTH PAGE TRANSITIONS
=========================== */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('files') && href.endsWith('.html')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.2s ease';
      setTimeout(() => { window.location.href = href; }, 200);
    });
  }
});

// Fade in on page load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

/* ===========================
   SKILL TAG RIPPLE
=========================== */
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;width:6px;height:6px;background:rgba(26,188,156,0.4);
      border-radius:50%;pointer-events:none;
      left:${e.clientX - rect.left - 3}px;top:${e.clientY - rect.top - 3}px;
      animation:ripple-anim 0.4s ease forwards;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  });
});

// Inject ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(18); opacity: 0; }
  }
`;
document.head.appendChild(style);

/* ===========================
   BACK TO TOP (auto-inject)
=========================== */
const topBtn = document.createElement('button');
topBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
topBtn.style.cssText = `
  position:fixed;bottom:1.5rem;right:1.5rem;width:40px;height:40px;
  background:#2c3e50;color:white;border:none;border-radius:50%;
  cursor:pointer;opacity:0;transform:translateY(10px);
  transition:all 0.3s ease;z-index:99;font-size:.85rem;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 3px 12px rgba(0,0,0,0.2);
`;
document.body.appendChild(topBtn);

topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
topBtn.addEventListener('mouseenter', () => topBtn.style.background = '#1abc9c');
topBtn.addEventListener('mouseleave', () => topBtn.style.background = '#2c3e50');

window.addEventListener('scroll', () => {
  const show = window.scrollY > 300;
  topBtn.style.opacity = show ? '1' : '0';
  topBtn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
  topBtn.style.pointerEvents = show ? 'auto' : 'none';
});
