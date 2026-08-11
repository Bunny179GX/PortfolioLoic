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
const animationStorageKey = 'portfolio-book-seen-v2';
let bookAlreadySeen = false;

try {
  bookAlreadySeen = sessionStorage.getItem(animationStorageKey) === 'true';
} catch {
  // La navigation reste fonctionnelle si le stockage du navigateur est indisponible.
}

if (pageTransition && !bookAlreadySeen) {
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
      front: { image: 'assets/optimized/peter-rain.jpg', label: 'Créations', detail: 'Lumière & atmosphère' },
      back: { image: 'communication/pubcrousti1.png', label: 'Communication', detail: 'Publicité & composition' }
    },
    {
      front: { image: 'logos/logo5.png', label: 'Logos', detail: 'Identité & symbole', contain: true },
      back: { image: 'creations/cyberpunk.jpg', label: 'Créations', detail: 'Univers & émotion' }
    },
    {
      front: { image: 'assets/optimized/spider-light.jpg', label: 'Créations', detail: 'Montage & lumière' },
      back: { image: 'photos/photo37.jpg', label: 'Photographie', detail: 'Volley & énergie' }
    }
  ];
  const projectFace = (project, side) => `
        <span class="sheet-face sheet-${side}${project.contain ? ' sheet-contain' : ''}">
          <img src="${project.image}" alt="" decoding="async">
          <small class="sheet-label"><span>${project.label}</span><b>${project.detail}</b></small>
        </span>`;
  const turningPages = transitionLeaves.map((leaf, index) => `
      <span class="turning-sheet${index === transitionLeaves.length - 1 ? ' final-sheet' : ''}" style="--sheet:${index}">
        ${projectFace(leaf.front, 'front')}
        ${projectFace(leaf.back, 'back')}
      </span>`).join('');

  pageTransition.innerHTML = `
    <div class="page-flurry" aria-hidden="true">${turningPages}</div>
    <button class="transition-skip" type="button" hidden>Passer l’animation <span aria-hidden="true">→</span></button>`;
}

let navigationTimer;
let navigationTarget = '';
const completeNavigation = () => {
  if (navigationTarget) window.location.href = navigationTarget;
};

pageTransition?.querySelector('.transition-skip')?.addEventListener('click', () => {
  window.clearTimeout(navigationTimer);
  completeNavigation();
});

document.querySelectorAll('.page-link').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (link.origin !== window.location.origin) return;
    event.preventDefault();
    if (pageTransition?.classList.contains('is-turning')) return;

    navigationTarget = link.href;
    if (reduceMotion.matches || !pageTransition) {
      completeNavigation();
      return;
    }

    const useQuickTransition = bookAlreadySeen || !pageTransition.querySelector('.page-flurry');
    pageTransition.classList.add('is-turning');

    if (useQuickTransition) {
      pageTransition.classList.add('is-quick');
      navigationTimer = window.setTimeout(completeNavigation, 380);
      return;
    }

    try {
      sessionStorage.setItem(animationStorageKey, 'true');
    } catch {
      // L’animation fonctionne aussi sans stockage de session.
    }
    bookAlreadySeen = true;
    const skipButton = pageTransition.querySelector('.transition-skip');
    if (skipButton) skipButton.hidden = false;
    navigationTimer = window.setTimeout(completeNavigation, 2350);
  });
});
