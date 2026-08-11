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

if (pageTransition) {
  const transitionLeaves = [
    {
      front: { image: 'photos/photo44.jpg', label: 'Photographie', detail: 'Sport & mouvement' },
      back: { image: 'creations/chopper.png', label: 'Créations', detail: 'Manga & composition' }
    },
    {
      front: { image: 'videos/animation-basket.gif', label: 'Vidéo', detail: 'Animation & rythme' },
      back: { image: 'communication/octobre rose.png', label: 'Communication', detail: 'Campagne & impact' }
    },
    {
      front: { image: 'creations/peter-pluie-intense.png', label: 'Créations', detail: 'Lumière & atmosphère' },
      back: { image: 'communication/pubcrousti1.png', label: 'Communication', detail: 'Publicité & composition' }
    },
    {
      front: { image: 'photos/photo37.jpg', label: 'Photographie', detail: 'Volley & énergie' },
      back: { image: 'creations/cyberpunk.jpg', label: 'Créations', detail: 'Univers & émotion' }
    },
    {
      front: { image: 'logos/logo5.png', label: 'Logos', detail: 'Identité & symbole', contain: true },
      back: { image: 'creations/spider man de nuit neige lumi differente.png', label: 'Créations', detail: 'Montage & lumière' }
    }
  ];
  const projectFace = (project, side) => `
        <span class="sheet-face sheet-${side}${project.contain ? ' sheet-contain' : ''}">
          <img src="${project.image}" alt="">
          <small class="sheet-label"><span>${project.label}</span><b>${project.detail}</b></small>
        </span>`;
  const turningPages = transitionLeaves.map((leaf, index) => `
      <span class="turning-sheet" style="--sheet:${index}">
        ${projectFace(leaf.front, 'front')}
        ${projectFace(leaf.back, 'back')}
      </span>`).join('');

  pageTransition.innerHTML = `
    <div class="page-flurry" aria-hidden="true">
      ${turningPages}
    </div>
    <div class="opening-book" aria-hidden="true">
      <span class="book-cover"></span>
      <span class="book-page book-page-left"></span>
      <span class="book-page book-page-right"></span>
      <span class="book-spine"></span>
    </div>`;
}

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
    window.setTimeout(() => { window.location.href = link.href; }, 2410);
  });
});
