# 📂 Index des Fichiers du Projet

Ce document liste tous les fichiers créés et leur utilité.

---

## 🐳 Configuration Docker

| Fichier | Description |
|---------|-------------|
| `docker-compose.yml` | Configuration complète de tous les services (MySQL, PHP, Nginx, Next.js) |
| `backend/Dockerfile` | Image Docker pour Symfony/PHP |
| `frontend/Dockerfile.dev` | Image Docker pour Next.js (développement) |

---

## 🔧 Backend Symfony

### Entités (Models)

| Fichier | Description |
|---------|-------------|
| `backend/src/Entity/DevisRequest.php` | Entité principale pour les demandes de devis avec validation complète |

### Controllers

| Fichier | Description |
|---------|-------------|
| `backend/src/Controller/Api/DevisController.php` | API REST pour gérer les devis, activités et garanties |

### Services

| Fichier | Description |
|---------|-------------|
| `backend/src/Service/EmailService.php` | Service d'envoi d'emails (confirmation client + notification admin) |
| `backend/src/Service/DevisService.php` | Logique métier : calcul de prix, validation, génération de référence |

### Templates Email

| Fichier | Description |
|---------|-------------|
| `backend/templates/emails/devis_confirmation.html.twig` | Email HTML de confirmation envoyé au client |
| `backend/templates/emails/admin_notification.html.twig` | Email HTML de notification envoyé aux admins |

---

## ⚛️ Frontend Next.js/React

### Configuration

| Fichier | Description |
|---------|-------------|
| `frontend/package.json` | Dépendances npm et scripts |
| `frontend/tailwind.config.js` | Configuration Tailwind CSS avec couleurs personnalisées |
| `frontend/tsconfig.json` | Configuration TypeScript |
| `frontend/next.config.js` | Configuration Next.js |

### Pages

| Fichier | Description |
|---------|-------------|
| `frontend/app/page.tsx` | Page d'accueil principale (composition de toutes les sections) |
| `frontend/app/layout.tsx` | Layout global de l'application |

### Composants - Formulaires

| Fichier | Description |
|---------|-------------|
| `frontend/components/forms/DevisForm.tsx` | **COMPOSANT PRINCIPAL** - Formulaire de devis complet avec validation Zod, React Hook Form, logique dynamique pour les champs |

### Composants - Sections

| Fichier | Description |
|---------|-------------|
| `frontend/components/sections/HeroSection.tsx` | Section hero avec image et formulaire de devis |
| `frontend/components/sections/ActivitesSection.tsx` | Section "Une Assurance Adaptée" avec 4 cards |
| `frontend/components/sections/AvantagesSection.tsx` | Section "Pourquoi nous choisir" avec 4 avantages |
| `frontend/components/sections/GarantiesSection.tsx` | Section "Nos garanties en détail" avec 3 tiers |
| `frontend/components/sections/ProcessSection.tsx` | Section "Comment ça marche" en 3 étapes |
| `frontend/components/sections/FAQSection.tsx` | Section FAQ avec accordion |
| `frontend/components/sections/CTASection.tsx` | Section CTA finale |

### Composants - UI

| Fichier | Description |
|---------|-------------|
| `frontend/components/ui/Button.tsx` | Bouton réutilisable |
| `frontend/components/ui/Input.tsx` | Input réutilisable |
| `frontend/components/ui/Select.tsx` | Select réutilisable |
| `frontend/components/ui/Card.tsx` | Card réutilisable |

### Composants - Layout

| Fichier | Description |
|---------|-------------|
| `frontend/components/layout/Header.tsx` | En-tête du site |
| `frontend/components/layout/Footer.tsx` | Pied de page |

### Utilitaires

| Fichier | Description |
|---------|-------------|
| `frontend/lib/api.ts` | **CLIENT API** - Configuration Axios, intercepteurs, services (devis, activités, garanties, FAQ) |
| `frontend/lib/utils.ts` | Fonctions utilitaires |
| `frontend/lib/validation.ts` | Schémas de validation Zod |

### Types TypeScript

| Fichier | Description |
|---------|-------------|
| `frontend/types/devis.ts` | Types pour les devis |
| `frontend/types/activite.ts` | Types pour les activités |
| `frontend/types/api.ts` | Types pour les réponses API |

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| `README.md` | **DOCUMENTATION COMPLÈTE** - Installation, configuration, API, déploiement |
| `QUICK_START.md` | **GUIDE RAPIDE** - Commandes essentielles et workflow |
| `FICHIERS_INDEX.md` | Ce fichier - Index de tous les fichiers |

---

## 🎯 Fichiers Clés par Fonctionnalité

### Pour créer un devis

**Backend :**
1. `DevisRequest.php` - Définit la structure
2. `DevisController.php` - API POST /api/devis
3. `DevisService.php` - Logique métier
4. `EmailService.php` - Envoi des emails

**Frontend :**
1. `DevisForm.tsx` - Formulaire complet
2. `api.ts` - Appel à l'API
3. `HeroSection.tsx` - Affichage du formulaire

### Pour modifier les emails

1. `devis_confirmation.html.twig` - Email client
2. `admin_notification.html.twig` - Email admin
3. `EmailService.php` - Logique d'envoi

### Pour personnaliser le design

1. `tailwind.config.js` - Couleurs et thème
2. Tous les composants dans `frontend/components/`
3. Images dans `frontend/public/images/`

---

## 🔄 Workflow de Développement Typique

### Ajouter un nouveau champ au formulaire

1. **Backend :**
   - Modifier `DevisRequest.php` (ajouter propriété + getter/setter)
   - Créer migration : `php bin/console make:migration`
   - Exécuter : `php bin/console doctrine:migrations:migrate`

2. **Frontend :**
   - Modifier `DevisForm.tsx` :
     - Ajouter dans `devisSchema` (validation)
     - Ajouter le champ JSX dans le render
     - Ajouter dans `register()`

3. **Tester :**
   - Soumettre le formulaire
   - Vérifier en DB
   - Vérifier l'email reçu

---

## 📦 Installation des Dépendances

### Backend (Symfony)

```bash
composer require symfony/orm-pack
composer require symfony/maker-bundle --dev
composer require symfony/validator
composer require symfony/mailer
composer require api-platform/core
composer require nelmio/cors-bundle
composer require lexik/jwt-authentication-bundle
```

### Frontend (Next.js)

```bash
npm install react react-dom next
npm install axios
npm install react-hook-form @hookform/resolvers
npm install zod
npm install tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react
npm install framer-motion
npm install --save-dev @types/node @types/react @types/react-dom typescript
```

---

## 🎨 Assets et Ressources

### Images requises

Placer dans `frontend/public/images/` :
- `transport-marchandise.jpg` - Hero section marchandises
- `transport-persone.jpg` - Hero section personnes
- `logo.png` - Logo du site
- `favicon.ico` - Favicon

### Icônes

Utilise Font Awesome (CDN dans le HTML) :
- `fa-user` - Utilisateur
- `fa-building` - Entreprise
- `fa-truck` - Transport
- `fa-shield-alt` - Assurance
- etc.

---

## 🔐 Sécurité

### Fichiers sensibles à ne JAMAIS commiter

- `backend/.env`
- `frontend/.env.local`
- `backend/var/` (logs, cache)
- `frontend/.next/` (build)
- `node_modules/`
- `vendor/`

### Fichiers .gitignore créés

- `backend/.gitignore` - Ignore var/, vendor/, .env
- `frontend/.gitignore` - Ignore .next/, node_modules/, .env.local

---

## 📊 Base de Données

### Tables créées

1. **devis_request** - Demandes de devis
2. **activite** - Types d'activités
3. **garantie_type** - Types de garanties
4. **faq** - Questions fréquentes
5. **doctrine_migration_versions** - Historique migrations

### Schéma SQL

Voir les fichiers de migration dans `backend/migrations/`

---

## 🧪 Tests

### Tests Backend

- `backend/tests/Controller/DevisControllerTest.php`
- `backend/tests/Service/DevisServiceTest.php`
- `backend/tests/Entity/DevisRequestTest.php`

### Tests Frontend

- `frontend/__tests__/components/DevisForm.test.tsx`
- `frontend/__tests__/lib/api.test.ts`

---

## 📝 Notes Importantes

1. **Le formulaire de devis** (`DevisForm.tsx`) est le composant le plus complexe - il gère :
   - Validation côté client avec Zod
   - Logique dynamique pour les champs conditionnels
   - Gestion des erreurs
   - Soumission à l'API
   - États de chargement et succès

2. **L'API REST** (`DevisController.php`) fournit tous les endpoints nécessaires

3. **Les emails** sont en HTML responsive avec Twig

4. **Docker Compose** orchestre tous les services pour un démarrage simple

5. **Next.js 14** utilise l'App Router (pas le Pages Router)

---

## 🚀 Prochaines Étapes

Pour aller plus loin :

1. **Ajouter l'authentification admin** pour gérer les devis
2. **Dashboard admin** pour voir tous les devis
3. **Export CSV/Excel** des devis
4. **Notifications SMS** en plus des emails
5. **Paiement en ligne** pour finaliser les contrats
6. **Espace client** pour suivre les devis
7. **Chatbot** pour assistance en temps réel

---

**Ce projet est complet et prêt pour le développement ! 🎉**
