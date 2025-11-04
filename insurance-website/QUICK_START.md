# 🚀 Guide de Démarrage Rapide

## Commandes Essentielles

### 🐳 Démarrage avec Docker (RECOMMANDÉ)

```bash
# 1. Lancer tous les services
docker-compose up -d

# 2. Installer les dépendances Symfony
docker-compose exec php composer install

# 3. Créer la base de données
docker-compose exec php php bin/console doctrine:database:create
docker-compose exec php php bin/console doctrine:migrations:migrate

# 4. Installer les dépendances Next.js
docker-compose exec frontend npm install

# ✅ C'EST TOUT ! L'application est prête !
```

**Accéder à l'application :**
- Frontend : http://localhost:3000
- Backend API : http://localhost:8000/api

---

### 💻 Démarrage Sans Docker

**Backend :**
```bash
cd backend
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony server:start  # ou php -S localhost:8000 -t public
```

**Frontend :**
```bash
cd frontend
npm install
npm run dev
```

---

## 📋 Commandes Utiles

### Backend (Symfony)

```bash
# Créer une nouvelle entité
php bin/console make:entity

# Créer une migration
php bin/console make:migration

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Vider le cache
php bin/console cache:clear

# Créer un controller
php bin/console make:controller

# Lancer les tests
php bin/phpunit
```

### Frontend (Next.js)

```bash
# Démarrage développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint

# Tests
npm test
```

### Docker

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Reconstruire les images
docker-compose build

# Accéder au shell PHP
docker-compose exec php bash

# Accéder au MySQL
docker-compose exec mysql mysql -u assurance_user -p assurance_db
```

---

## 🗂️ Structure Simplifiée

```
assurance-transporteurs/
├── backend/
│   ├── src/
│   │   ├── Controller/Api/DevisController.php    ← API REST
│   │   ├── Entity/DevisRequest.php                ← Modèle DB
│   │   └── Service/EmailService.php               ← Envoi emails
│   └── templates/emails/                          ← Templates emails
│
├── frontend/
│   ├── app/page.tsx                               ← Page d'accueil
│   ├── components/forms/DevisForm.tsx             ← Formulaire principal
│   └── lib/api.ts                                 ← Client API
│
└── docker-compose.yml                             ← Configuration Docker
```

---

## 🎯 Workflow de Développement

### 1. Créer une nouvelle feature

```bash
git checkout -b feature/nom-de-la-feature

# Développer...

git add .
git commit -m "feat: description de la feature"
git push origin feature/nom-de-la-feature
```

### 2. Ajouter un nouveau champ au formulaire

**Backend :**
```bash
# Ajouter le champ dans DevisRequest.php
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

**Frontend :**
```typescript
// Ajouter le champ dans devisSchema (DevisForm.tsx)
nouveauChamp: z.string().min(1, 'Requis'),

// Ajouter le champ dans le JSX
<input {...register('nouveauChamp')} />
```

### 3. Modifier un email

Éditer les fichiers :
- `backend/templates/emails/devis_confirmation.html.twig`
- `backend/templates/emails/admin_notification.html.twig`

---

## 🐛 Résolution de Problèmes

### Problème : Cannot connect to MySQL

```bash
# Vérifier que MySQL est démarré
docker-compose ps

# Recréer les conteneurs
docker-compose down
docker-compose up -d
```

### Problème : Port 3000 déjà utilisé

```bash
# Changer le port dans docker-compose.yml
ports:
  - "3001:3000"  # Au lieu de 3000:3000
```

### Problème : Erreurs de cache Symfony

```bash
docker-compose exec php php bin/console cache:clear
docker-compose exec php rm -rf var/cache/*
```

### Problème : Modules npm manquants

```bash
docker-compose exec frontend rm -rf node_modules
docker-compose exec frontend npm install
```

---

## 📊 Tests Rapides

### Tester l'API

```bash
# Créer un devis (avec curl)
curl -X POST http://localhost:8000/api/devis \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "test@example.com",
    "telephone": "0612345678",
    "activite": "transport",
    "demarrageActivite": "oui",
    "assureActuellement": "non",
    "typeTransport": "marchandises",
    "souhaitezAssurer": "vehicule",
    "codePostal": "75001",
    "rgpdConsent": true
  }'
```

### Vérifier les emails (MailHog)

Ouvrir http://localhost:8025 pour voir tous les emails envoyés en développement.

---

## 📝 Variables d'Environnement

### Backend (.env)

```env
APP_ENV=dev
APP_SECRET=votre_secret_tres_long
DATABASE_URL="mysql://assurance_user:assurance_pass@mysql:3306/assurance_db"
MAILER_DSN=smtp://mailhog:1025
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🎨 Personnalisation Rapide

### Changer les couleurs

Éditer `frontend/tailwind.config.js` :

```javascript
colors: {
  green: '#16a34a',    // Couleur principale
  accent: '#FFD700',   // Couleur accent
}
```

### Changer le logo

Remplacer l'image dans `frontend/public/images/logo.png`

---

## ✅ Checklist Avant Production

- [ ] Changer APP_SECRET dans .env
- [ ] Configurer le vrai MAILER_DSN
- [ ] Désactiver DEBUG (APP_ENV=prod)
- [ ] Exécuter `composer install --no-dev --optimize-autoloader`
- [ ] Exécuter `npm run build`
- [ ] Configurer HTTPS
- [ ] Tester l'envoi d'emails
- [ ] Configurer les sauvegardes DB

---

## 🆘 Support

**Besoin d'aide ?**

1. Vérifier les logs : `docker-compose logs -f`
2. Consulter le README complet
3. Vérifier la documentation Symfony : https://symfony.com/doc
4. Vérifier la documentation Next.js : https://nextjs.org/docs

---

**Bon développement ! 🎉**
