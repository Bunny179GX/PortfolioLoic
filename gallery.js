const photoNumbers = [...Array(20)].map((_, index) => index + 1).concat([...Array(41)].map((_, index) => index + 22));

const galleries = {
  photos: photoNumbers.map(number => ({
    src: `photos/photo${number}.jpg`,
    alt: `Photographie ${number} — sélection de Loïc Gex`
  })),
  creations: [
    ['peter-pluie-intense.png', 'Série Peter Parker — version sous une pluie intense'],
    ['peter-ciel-lumineux.png', 'Série Peter Parker — version au ciel lumineux'],
    ['peter-version-sombre.png', 'Série Peter Parker — version sombre et cinématographique'],
    ['ammo1.png', 'Composition graphique — Ammo 1'], ['ammo2.png', 'Composition graphique — Ammo 2'],
    ['beateau.png', 'Photomontage — La ville submergée'], ['bonbon.png', 'Création graphique — Bonbon'],
    ['bonbonstade.png', 'Création graphique — Bonbon stade'], ['boodha.jpg', 'Création graphique — Boodha'],
    ['chopper.png', 'Création inspirée du manga — Chopper'], ['crocodile.png', 'Création graphique — Crocodile'],
    ['cyberpunk.jpg', 'Portrait graphique cyberpunk'], ['football.jpg', 'Composition graphique — Football'],
    ['fullmetal.png', 'Création inspirée de Fullmetal Alchemist'], ['jocker.png', 'Création graphique — Joker'],
    ['sans.jpg', 'Composition fantastique'], ['sansfaucheur.jpg', 'Composition — La faucheuse']
  ].map(([file, alt]) => ({ src: `creations/${file}`, alt })),
  communication: [
    ['defibrilateur.jpg', 'Affiche de sensibilisation — Défibrillateur'], ['octobre rose.png', 'Campagne de sensibilisation — Octobre rose'],
    ['pubcrousti1.png', 'Campagne Crousti — visuel 1'], ['pubcrousti2.png', 'Campagne Crousti — visuel 2'],
    ['pubcrousti3.png', 'Campagne Crousti — visuel 3'], ['tique1.png', 'Campagne de prévention contre les tiques — visuel 1'],
    ['tique2.png', 'Campagne de prévention contre les tiques — visuel 2'], ['tique3.png', 'Campagne de prévention contre les tiques — visuel 3']
  ].map(([file, alt]) => ({ src: `communication/${file}`, alt })),
  logos: [...Array(13)].map((_, index) => ({
    src: `logos/logo${index + 1}.png`,
    alt: `Recherche de logo ${index + 1}`
  }))
};

const category = document.body.dataset.gallery;
const items = galleries[category] || [];
const grid = document.querySelector('#galerie');
const count = document.querySelector('#item-count');

if (count) count.textContent = items.length;

const featuredCount = category === 'creations' && document.querySelector('.comparison-grid') ? 3 : 0;

items.slice(featuredCount).forEach((item, relativeIndex) => {
  const index = relativeIndex + featuredCount;
  const button = document.createElement('button');
  button.className = 'gallery-item reveal js-lightbox';
  button.type = 'button';
  button.dataset.galleryIndex = index;
  button.setAttribute('aria-label', `Agrandir : ${item.alt}`);
  const image = document.createElement('img');
  image.src = item.src;
  image.alt = item.alt;
  image.loading = index < 6 ? 'eager' : 'lazy';
  image.decoding = 'async';
  button.appendChild(image);
  grid?.appendChild(button);
});

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Aperçu de l’image');
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fermer">×</button><button class="lightbox-nav lightbox-prev" type="button" aria-label="Image précédente"><span aria-hidden="true">←</span></button><img alt=""><button class="lightbox-nav lightbox-next" type="button" aria-label="Image suivante"><span aria-hidden="true">→</span></button><p class="lightbox-caption" aria-live="polite"></p>';
document.body.appendChild(lightbox);

let lastTrigger = null;
let currentIndex = 0;

const renderLightbox = () => {
  const item = items[currentIndex];
  const image = lightbox.querySelector('img');
  image.src = item.src;
  image.alt = item.alt;
  lightbox.querySelector('.lightbox-caption').textContent = `${currentIndex + 1} / ${items.length} — ${item.alt}`;
  const hideNavigation = items.length < 2;
  lightbox.querySelector('.lightbox-prev').hidden = hideNavigation;
  lightbox.querySelector('.lightbox-next').hidden = hideNavigation;
};

const openLightbox = (index, trigger) => {
  currentIndex = index;
  lastTrigger = trigger;
  renderLightbox();
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
};

const navigateLightbox = direction => {
  currentIndex = (currentIndex + direction + items.length) % items.length;
  renderLightbox();
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  lastTrigger?.focus();
};

document.addEventListener('click', event => {
  const trigger = event.target.closest('.js-lightbox');
  if (!trigger) return;
  openLightbox(Number(trigger.dataset.galleryIndex), trigger);
});

lightbox.addEventListener('click', event => {
  if (event.target === lightbox || event.target.closest('.lightbox-close')) closeLightbox();
  if (event.target.closest('.lightbox-prev')) navigateLightbox(-1);
  if (event.target.closest('.lightbox-next')) navigateLightbox(1);
});
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') navigateLightbox(-1);
  if (event.key === 'ArrowRight') navigateLightbox(1);
});

let touchStartX = 0;
lightbox.addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', event => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) < 45) return;
  navigateLightbox(distance > 0 ? -1 : 1);
}, { passive: true });

requestAnimationFrame(() => document.querySelectorAll('.gallery-item.reveal').forEach(element => observer.observe(element)));
