# Architecture technique

## Technologie

Deux variantes statiques sans dépendance de production : HTML, CSS et JavaScript natifs. Ce choix permet l’ouverture locale et la publication directe sur GitHub Pages.

- `projet/` : thème cyberpunk ;
- `projet manga/` : thème manga d’aventure.

Les deux variantes possèdent leurs propres pages, code et médias optimisés. Elles peuvent donc être testées ou publiées indépendamment.

## Pages

- `projet/index.html` : accueil, présentation, projets et contact.
- `projet/photos.html` : galerie photographique.
- `projet/creations.html` : galerie de créations graphiques.
- `projet/videos.html` : vidéos et GIF.
- `projet/communication.html` : supports de communication.
- `projet/logos.html` : recherches de logos.

## Code partagé

- `styles.css` : identité visuelle, responsive, galeries et animations.
- `script.js` : menu mobile, en-tête, révélations au défilement et transition de page.
- `gallery.js` : données et visionneuse des galeries d’images.

## Médias

Les images publiées sont des copies des sources. Les vidéos 4K trop lourdes pour GitHub ont été réencodées en H.264 HD avec lecture progressive. Les originaux n’ont pas été modifiés.

Poids initial des trois vidéos 4K : environ 495 à 558 Mo chacune. Poids des versions web : environ 3 à 5,3 Mo chacune. La vidéo verticale web pèse environ 9 Mo. Aucun fichier du dossier publié ne dépasse 100 Mo.

## Compatibilité

- Mise en page responsive à partir de 320 px.
- Menu mobile sous 800 px.
- Navigation clavier et visionneuse fermable avec Échap.
- Images différées hors premier écran.
- Respect de `prefers-reduced-motion`.
