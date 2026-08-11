const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const pageTransition = document.querySelector('.page-transition');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

try {
  if (sessionStorage.getItem('portfolio-page-turn') === 'reveal') {
    sessionStorage.removeItem('portfolio-page-turn');
    pageTransition?.classList.add('is-entering');
    window.setTimeout(() => pageTransition?.classList.remove('is-entering'), 820);
  }
} catch {
  // La navigation reste fonctionnelle si le stockage du navigateur est indisponible.
}

document.querySelectorAll('.page-link').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    if (reduceMotion.matches || !pageTransition) {
      window.location.href = link.href;
      return;
    }

    try { sessionStorage.setItem('portfolio-page-turn', 'reveal'); } catch {}
    pageTransition.classList.add('is-turning');
    window.setTimeout(() => { window.location.href = link.href; }, 780);
  });
});
