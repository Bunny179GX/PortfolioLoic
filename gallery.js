const numberedItems = (folder, numbers, label) => numbers.map(number => ({
  src: `${folder}/${label}${number}.jpg`,
  alt: `${label === 'photo' ? 'Photographie' : 'Visuel'} ${number} — ${folder}`
}));

const fileItems = (folder, entries) => entries.map(([file, alt]) => ({
  src: `${folder}/${file}`,
  alt
}));

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => start + index);

const galleryGroups = {
  photos: [
    {
      marker: 'Sport', kicker: 'Football', title: 'L’intensité du terrain',
      description: 'Des images consacrées au football, entre concentration, effort collectif et instants décisifs.',
      items: numberedItems('photos', [...range(16, 20), 22, 32, 33, 34], 'photo')
    },
    {
      marker: 'Sport', kicker: 'Volley-ball', title: 'Gestes, énergie et mouvement',
      description: 'Une série au plus près du jeu pour saisir les échanges, les réactions et le rythme d’un match de volley-ball.',
      items: numberedItems('photos', range(35, 62), 'photo')
    },
    {
      marker: 'Événement', kicker: 'Shooting', title: 'Portraits mis en scène',
      description: 'Des portraits réalisés en shooting, avec une attention particulière portée au cadrage, à l’attitude et à l’ambiance.',
      items: numberedItems('photos', [1, 2, 13], 'photo')
    },
    {
      marker: 'Événement', kicker: 'Anniversaire', title: 'Des souvenirs pris sur le vif',
      description: 'Des moments spontanés, joyeux et humains photographiés pendant des anniversaires.',
      items: numberedItems('photos', [...range(3, 7), 11, 12], 'photo')
    },
    {
      marker: 'Travail', kicker: 'Reportage', title: 'La vie professionnelle en images',
      description: 'Des photographies réalisées dans un cadre professionnel ou lors d’événements liés au travail, pour documenter les personnes et les situations avec naturel.',
      items: numberedItems('photos', [8, 9, 10, 14, 15, ...range(23, 31)], 'photo')
    }
  ],
  creations: [
    {
      marker: '2025', kicker: 'Création personnelle', title: 'Jackie — hommage à Cyberpunk 2077',
      description: 'Après avoir terminé Cyberpunk 2077, j’ai voulu créer une affiche consacrée à Jackie, un personnage qui m’a profondément touché. Cette composition a été réalisée sur Photoshop en 2025.',
      items: fileItems('creations', [['cyberpunk.jpg', 'Affiche hommage à Jackie dans Cyberpunk 2077 — 2025']])
    },
    {
      marker: '2022', kicker: 'Lumière & atmosphère', title: 'Chishiya — jouer avec la lumière',
      description: 'Créée en 2022, cette image marque le moment où j’ai commencé à expérimenter davantage avec la lumière, les ombres et les contrastes pour construire une atmosphère mystérieuse.',
      items: fileItems('creations', [['chishiya-carte.png', 'Création Chishiya avec une carte — travail de lumière réalisé en 2022']])
    },
    {
      marker: '2022', kicker: 'Commande fictive', title: 'Deux pochettes d’album',
      description: 'Dans le cadre d’un exercice fictif, je devais imaginer l’univers graphique d’un album musical. J’ai créé deux propositions d’affiches et de pochettes inspirées par l’identité d’un chanteur.',
      items: fileItems('creations', [
        ['ammo1.png', 'Projet fictif de pochette d’album — proposition 1'],
        ['ammo2.png', 'Projet fictif de pochette d’album — proposition 2']
      ])
    },
    {
      marker: '2021', kicker: 'Examen ECG', title: 'Football sous pression',
      description: 'Pour un examen consacré aux enjeux du développement durable et de la mondialisation, j’ai choisi d’aborder les salaires dans le football et surtout la pression quotidienne exercée sur les joueurs. La Coupe du monde et l’Euro apparaissent discrètement dans l’affiche pour compléter le message.',
      items: fileItems('creations', [['football.jpg', 'Affiche d’examen sur la pression et les salaires dans le football']])
    },
    {
      marker: '2021', kicker: 'Premiers pas sur Photoshop', title: 'La ville submergée',
      description: 'À mes débuts, j’ai suivi un tutoriel Photoshop pour apprendre les bases du photomontage. L’exercice consistait à transformer une ville et à y ajouter des objets qui nous représentaient.',
      items: fileItems('creations', [['beateau.png', 'Photomontage d’une ville submergée réalisé à partir d’un tutoriel Photoshop']])
    },
    {
      marker: '2021', kicker: 'Apprentissage Illustrator', title: 'Du bonbon au stade',
      description: 'J’ai d’abord suivi un tutoriel Illustrator pour construire le bonbon, puis j’ai réutilisé cette technique de manière personnelle afin de créer une seconde version inspirée d’un stade de football.',
      items: fileItems('creations', [
        ['bonbon.png', 'Création vectorielle d’un bonbon réalisée sur Illustrator'],
        ['bonbonstade.png', 'Réinterprétation du bonbon dans un stade de football']
      ])
    },
    {
      marker: '2021', kicker: 'Illustrator & pop culture', title: 'Univers qui m’inspirent',
      description: 'Ces créations inspirées de la pop culture ont été réalisées sur Illustrator il y a cinq ans dans le cadre d’un travail graphique. Elles m’ont permis d’explorer les silhouettes, les couleurs et différents styles visuels.',
      items: fileItems('creations', [
        ['fullmetal.png', 'Création inspirée de Fullmetal Alchemist'],
        ['crocodile.png', 'Création inspirée de Crocodile'],
        ['jocker.png', 'Création inspirée du Joker'],
        ['sans.jpg', 'Création inspirée de Sans'],
        ['sansfaucheur.jpg', 'Création inspirée de Sans et de la Faucheuse']
      ])
    },
    {
      marker: '2021', kicker: 'Explorations personnelles', title: 'Personnages & symboles',
      description: 'Deux expérimentations personnelles autour de figures fortes, réalisées pour développer ma maîtrise de la composition, de la couleur et de l’illustration numérique.',
      items: fileItems('creations', [
        ['chopper.png', 'Création personnelle inspirée de Chopper'],
        ['boodha.jpg', 'Exploration graphique autour de Bouddha']
      ])
    }
  ],
  communication: [
    {
      marker: 'Publicité', kicker: 'Campagne produit', title: 'Crousti',
      description: 'Trois déclinaisons publicitaires conçues pour former une campagne cohérente, reconnaissable et adaptée à plusieurs messages.',
      items: fileItems('communication', [
        ['pubcrousti1.png', 'Campagne publicitaire Crousti — visuel 1'],
        ['pubcrousti2.png', 'Campagne publicitaire Crousti — visuel 2'],
        ['pubcrousti3.png', 'Campagne publicitaire Crousti — visuel 3']
      ])
    },
    {
      marker: 'Annonce', kicker: 'Informer clairement', title: 'Défibrillateur & Octobre rose',
      description: 'Deux supports d’annonce conçus pour transmettre rapidement une information importante tout en conservant une identité visuelle forte.',
      items: fileItems('communication', [
        ['defibrilateur.jpg', 'Annonce de sensibilisation au défibrillateur'],
        ['octobre rose.png', 'Annonce de sensibilisation pour Octobre rose']
      ])
    },
    {
      marker: 'Prévention', kicker: 'Campagne en trois temps', title: 'Sensibilisation aux tiques',
      description: 'Une série de trois visuels de prévention pour expliquer le risque, les bons réflexes et les informations essentielles de manière progressive.',
      items: fileItems('communication', [
        ['tique1.png', 'Prévention contre les tiques — visuel 1'],
        ['tique2.png', 'Prévention contre les tiques — visuel 2'],
        ['tique3.png', 'Prévention contre les tiques — visuel 3']
      ])
    }
  ],
  logos: [
    {
      marker: '2022', kicker: 'Créations personnelles', title: 'Dessiner ma propre identité',
      description: 'Passionné par le dessin sur tablette graphique, j’ai voulu imaginer mes propres symboles et créer deux logos personnels en 2022.',
      items: fileItems('logos', [
        ['logo1.png', 'Création personnelle de logo — 2022'],
        ['logo5.png', 'Création personnelle de logo inspirée du dessin numérique — 2022']
      ])
    },
    {
      marker: 'Fin 2021', kicker: 'Test d’entrée 3Sheds', title: 'Décliner une identité imposée',
      description: 'Pour mon test d’entrée chez 3Sheds, je devais concevoir plusieurs propositions de logo à partir d’une entreprise donnée. Cette série montre mes différentes recherches de formes et de pistes graphiques.',
      items: fileItems('logos', range(6, 13).map(number => [`logo${number}.png`, `Proposition de logo pour le test d’entrée chez 3Sheds — ${number - 5}`]))
    },
    {
      marker: '2021', kicker: 'Année de base', title: 'Créer une entreprise fictive',
      description: 'Pendant mon année de base, nous devions inventer une entreprise fictive puis construire son identité. Ces trois propositions correspondent à mes premiers travaux de création de logo.',
      items: fileItems('logos', range(2, 4).map(number => [`logo${number}.png`, `Logo pour une entreprise fictive — proposition ${number - 1}`]))
    }
  ]
};

const featuredCreations = fileItems('creations', [
  ['peter-pluie-intense.png', 'Série Peter Parker — version sous une pluie intense'],
  ['peter-ciel-lumineux.png', 'Série Peter Parker — version au ciel lumineux'],
  ['peter-version-sombre.png', 'Série Peter Parker — version sombre et cinématographique']
]);

const category = document.body.dataset.gallery;
const groups = galleryGroups[category] || [];
const hasFeaturedStudy = category === 'creations' && Boolean(document.querySelector('.comparison-grid'));
const featuredItems = hasFeaturedStudy ? featuredCreations : [];
const groupedItems = groups.flatMap(group => group.items);
const items = [...featuredItems, ...groupedItems];
const container = document.querySelector('#galerie');
const count = document.querySelector('#item-count');

if (count) count.textContent = items.length;

const createGalleryButton = (item, index) => {
  const button = document.createElement('button');
  button.className = 'gallery-item js-lightbox';
  button.type = 'button';
  button.dataset.galleryIndex = index;
  button.setAttribute('aria-label', `Agrandir : ${item.alt}`);
  const image = document.createElement('img');
  image.src = item.src;
  image.alt = item.alt;
  image.loading = index < 8 ? 'eager' : 'lazy';
  image.decoding = 'async';
  button.appendChild(image);
  return button;
};

let nextIndex = featuredItems.length;
groups.forEach(group => {
  const section = document.createElement('section');
  section.className = 'portfolio-block reveal';

  const marker = document.createElement('div');
  marker.className = 'portfolio-marker';
  marker.textContent = group.marker;

  const content = document.createElement('div');
  content.className = 'portfolio-block-content';
  const heading = document.createElement('header');
  heading.className = 'collection-heading';
  heading.innerHTML = `<p>${group.kicker}</p><h2>${group.title}</h2><div>${group.description}</div>`;

  const grid = document.createElement('div');
  grid.className = `collection-grid collection-grid-${Math.min(group.items.length, 3)}`;
  group.items.forEach(item => {
    grid.appendChild(createGalleryButton(item, nextIndex));
    nextIndex += 1;
  });

  content.append(heading, grid);
  section.append(marker, content);
  container?.appendChild(section);
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
  if (!item) return;
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

requestAnimationFrame(() => document.querySelectorAll('.portfolio-block.reveal').forEach(element => observer.observe(element)));
