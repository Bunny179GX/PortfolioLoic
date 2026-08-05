const photoNumbers = [...Array(20)].map((_, index) => index + 1).concat([...Array(41)].map((_, index) => index + 22));

const galleries = {
  photos: photoNumbers.map(number => ({
    src: `assets/images/photos/photo${number}.jpg`,
    alt: `Photographie ${number} — sélection de Loïc Gex`
  })),
  creations: [
    ['ammo1.png', 'Composition graphique — Ammo 1'], ['ammo2.png', 'Composition graphique — Ammo 2'],
    ['beateau.png', 'Photomontage — La ville submergée'], ['bonbon.png', 'Création graphique — Bonbon'],
    ['bonbonstade.png', 'Création graphique — Bonbon stade'], ['boodha.jpg', 'Création graphique — Boodha'],
    ['chopper.png', 'Création inspirée du manga — Chopper'], ['crocodile.png', 'Création graphique — Crocodile'],
    ['cyberpunk.jpg', 'Portrait graphique cyberpunk'], ['football.jpg', 'Composition graphique — Football'],
    ['fullmetal.png', 'Création inspirée de Fullmetal Alchemist'], ['jocker.png', 'Création graphique — Joker'],
    ['sans.jpg', 'Composition fantastique'], ['sansfaucheur.jpg', 'Composition — La faucheuse']
  ].map(([file, alt]) => ({ src: `assets/images/creations/${file}`, alt })),
  communication: [
    ['defibrilateur.jpg', 'Affiche de sensibilisation — Défibrillateur'], ['octobre rose.png', 'Campagne de sensibilisation — Octobre rose'],
    ['pubcrousti1.png', 'Campagne Crousti — visuel 1'], ['pubcrousti2.png', 'Campagne Crousti — visuel 2'],
    ['pubcrousti3.png', 'Campagne Crousti — visuel 3'], ['tique1.png', 'Campagne de prévention contre les tiques — visuel 1'],
    ['tique2.png', 'Campagne de prévention contre les tiques — visuel 2'], ['tique3.png', 'Campagne de prévention contre les tiques — visuel 3']
  ].map(([file, alt]) => ({ src: `assets/images/communication/${file}`, alt })),
  logos: [...Array(13)].map((_, index) => ({
    src: `assets/images/logos/logo${index + 1}.png`,
    alt: `Recherche de logo ${index + 1}`
  }))
};

const category = document.body.dataset.gallery;
const items = galleries[category] || [];
const grid = document.querySelector('#galerie');
const count = document.querySelector('#item-count');

if (count) count.textContent = items.length;

items.forEach((item, index) => {
  const button = document.createElement('button');
  button.className = 'gallery-item reveal';
  button.type = 'button';
  button.dataset.index = index;
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
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fermer">×</button><img alt=""><p class="lightbox-caption"></p>';
document.body.appendChild(lightbox);

let lastTrigger = null;
const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  lastTrigger?.focus();
};

grid?.addEventListener('click', event => {
  const trigger = event.target.closest('.gallery-item');
  if (!trigger) return;
  lastTrigger = trigger;
  const item = items[Number(trigger.dataset.index)];
  lightbox.querySelector('img').src = item.src;
  lightbox.querySelector('img').alt = item.alt;
  lightbox.querySelector('.lightbox-caption').textContent = item.alt;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
});

lightbox.addEventListener('click', event => {
  if (event.target === lightbox || event.target.closest('.lightbox-close')) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
});

requestAnimationFrame(() => document.querySelectorAll('.gallery-item.reveal').forEach(element => observer.observe(element)));
