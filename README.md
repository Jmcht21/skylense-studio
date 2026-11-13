# Topolines — Créateur d'affiches topographiques personnalisées

## Fonctionnalités du Studio

### 1. Véritable Moteur d'Isocontours Topo (Marching Squares)
- Télécharge les données d'élévation MNT (Terrain-RGB mondial) via flux ouvert compatible CORS.
- Échantillonne le modèle altimétrique en une matrice numérique d'altitudes réelles.
- Exécute l'algorithme des **Marching Squares** avec interpolation linéaire sub-cellulaire pour tracer chaque courbe de niveau.
- **Assemblage en polylignes continues** : réunit tous les segments contigus en boucles et chaînes fluides.
- **Curseur de lissage fluide (Niveaux 0 à 6)** :
  - *Niveau 0 (Brut)* : fidélité topographique stricte.
  - *Niveau 3 (Standard)* : courbes naturelles organiques idéales pour affiche d'art.
  - *Niveau 6 (Liquide Web)* : relaxation laplacienne + Chaikin d'amplitude pour de grandes ondulations artistiques épurées (parfait pour intégrations web, bannières et posters design).
- **Filtre anti-bruit / micro-points** : élimine automatiquement les artefacts et micro-points isolés causés par des anomalies de 1 pixel dans le MNT.
- **Pas d'élévation réglable** : 10 m, 20 m, 25 m, 50 m, 100 m, 150 m, 200 m, 250 m, 500 m.
- **Courbes maîtresses renforcées** : mise en valeur automatique d'un niveau sur cinq avec trait plus épais.
- **Ombrage 3D du relief (*Hillshade*)** : calcul de pente et d'azimut solaire (315° N-O) pour donner de la profondeur sous les courbes.

### 2. Mode « Routes & Fleuves » (Moteur Vectoriel MVT OpenFreeMap)
- **100% Client-Side & Quasi-Instantané (< 300 ms)** : télécharge en direct les vraies géométries vectorielles brutes issues des tuiles MVT/PBF d'**OpenFreeMap** via Cloudflare Edge CDN (100% gratuit, sans clé API, compatible CORS).
- **Décodage MVT en JavaScript Pur** : décode à la volée les couches `transportation`, `water`, `waterway` et `place` du schéma OpenMapTiles via `pbf.js` et un parseur vectoriel natif intégré.
- **Recherche de villes ultra-rapide via Photon (Komoot)** : géocodage mondial instantané sans limitation agressive.
- **Hiérarchie urbaine soignée** :
  - *Hydrographie complète* : polygones de plans d'eau (lacs, bassins, océans, fleuves larges) avec remplissage et contour, et polylignes de cours d'eau (rivières, canaux).
  - *Axes majeurs & voies express* : autoroutes, périphériques, rocades et tronçons rapides (`motorway`, `trunk`).
  - *Artères principales* : grands boulevards, avenues, routes nationales et départementales (`primary`, `secondary`, `tertiary`).
  - *Rues locales & secondaires* : réseau viaire de quartier, rues résidentielles et allées piétonnes (`minor`, `residential`, `living_street`, `service`).
- **Filtre de densité réglable** : *Intégrale* (toutes rues et venelles), *Standard* (équilibre urbain esthétique), *Épuré* (grands axes et boulevards), *Minimaliste* (voies express uniquement).
- **Personnalisation chromatique totale** : couleur et épaisseur des fleuves/canaux, couleur de remplissage des lacs, couleur et épaisseur des routes principales et des rues de quartier, fond de carte indépendant ou lié, mode transparent (alpha).
- **Toponymie urbaine native** : détection et affichage des communes, arrondissements et quartiers directement depuis les tuiles vectorielles.
- **Exportations vectorielles et haute définition** : SVG vectoriel pur avec `<path>` groupés par calque, PNG jusqu'à 50 Mpx et PDF d'art.

---

## Clés d'API & Sécurité GitHub

L'application est conçue pour fonctionner **100 % gratuitement et sans aucune inscription** dès son ouverture :
- MNT altimétrique mondial : ouvert, gratuit, sans clé.
- Noms des lieux & toponymie : flux **ESRI ArcGIS Boundaries & Places** (100% gratuit, **SANS aucun filigrane**, sans inscription).
- Dalles raster : IGN Géoplateforme, OpenTopoMap et OpenStreetMap (libres et ouverts).

### Si vous souhaitez ajouter vos propres clés d'API gratuites :
Vous pouvez débloquer des couches HD supplémentaires (Mapbox Satellite, Carto Voyager, Stadia/Stamen) :

1. **Directement dans l'application** :
   - Cliquez sur **`Réglages Clés API`** dans l'en-tête de la barre latérale.
   - Collez vos clés gratuites et cliquez sur « Enregistrer ».
   - Les clés sont stockées dans le `localStorage` de votre navigateur. **Elles ne sont jamais envoyées.**


### 2. Calques Vectoriels Débrayables
- [x] **Courbes de niveau principales**
- [x] **Lignes maîtresses renforcées**
- [x] **Ombrage de relief 3D**
- [x] **Noms des lieux & sommets (Toponymie)**
- [x] **Cartouche d'art, échelle & rose des vents**
- [x] **Mode « Lignes Topo Pures »** : un simple clic masque instantanément tous les textes et cartouches pour ne conserver que la géométrie pure des courbes !

### 3. Formats d'Exportation
- **Export SVG Vectoriel Pur (.svg)** :
  - Véritable fichier SVG vectoriel avec des balises `<path d="..." />` groupées par calques (`<g id="courbes-maitresses">`, `<g id="courbes-secondaires">`).
  - Résolution infinie, éditable dans Adobe Illustrator, Inkscape, et prêt pour les découpeuses laser ou traceurs CNC.
- **Export PDF Haute Définition (.pdf)** :
  - Fichier PDF vectoriel prêt pour l'imprimeur (mise en page A4 ou sur mesure).
- **Export PNG jusqu'à 50 Mégapixels** :
  - **150 DPI Standard** (~4 Mpx)
  - **300 DPI Pro** (~9 Mpx - A4 Print)
  - **4K Ultra HD** (~16 Mpx)
  - **50 Mégapixels** (~50 Mpx : $7071 \times 7071$ px en carré ou $8420 \times 5950$ px en A4).

### 4. Thèmes & Esthétique
- **Émeraude & Vert** (fond `#14382c` et courbes blanches/menthe, fidèle au modèle *« Back to the Nature »*).
- **Ardoise & Blanc** (style minimaliste contemporain).
- **Blueprint Cyan** (plan technique d'architecte).
- **Sépia Parchemin** (carte ancienne d'explorateur).
- **Noir & Or** (charbon et or champagne).
- **Fond Transparent** (PNG et SVG avec transparence alpha pour intégration graphique directe).
