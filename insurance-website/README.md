# 🚚 Plateforme d'Assurance Véhicule Professionnel

Plateforme web complète pour la gestion d'assurance véhicule professionnel avec formulaire de devis en ligne.

## 🏗️ Architecture

- **Backend**: Symfony 7 + MySQL 8
- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Containerisation**: Docker & Docker Compose

---

## 📋 Prérequis

- Docker & Docker Compose installés
- Git
- Node.js 18+ (pour développement local sans Docker)
- PHP 8.2+ (pour développement local sans Docker)
- MySQL 8.0+ (pour développement local sans Docker)

---

## 🚀 Installation avec Docker (Recommandé)

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd assurance-transporteurs
```

### 2. Configuration de l'environnement

**Backend (Symfony):**

```bash
cd backend
cp .env.example .env
```

Modifiez `.env` avec vos paramètres :

```env
DATABASE_URL="mysql://assurance_user:assurance_pass@mysql:3306/assurance_db?serverVersion=8.0"
MAILER_DSN=smtp://mailhog:1025
APP_ENV=dev
APP_SECRET=votre_secret_ici
```

**Frontend (Next.js):**

```bash
cd ../frontend
cp .env.example .env.local
```

Modifiez `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Lancer les conteneurs Docker

À la racine du projet :

```bash
docker-compose up -d
```

### 4. Installation des dépendances Symfony

```bash
docker-compose exec php composer install
```

### 5. Créer la base de données et les migrations

```bash
docker-compose exec php php bin/console doctrine:database:create
docker-compose exec php php bin/console make:migration
docker-compose exec php php bin/console doctrine:migrations:migrate
```

### 6. Charger les fixtures (données de test - optionnel)

```bash
docker-compose exec php php bin/console doctrine:fixtures:load
```

### 7. Installation des dépendances Frontend

```bash
docker-compose exec frontend npm install
```

### 8. Accéder à l'application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **PHPMyAdmin**: http://localhost:8080 (optionnel)

---

## 🛠️ Installation Sans Docker

### Backend (Symfony)

```bash
cd backend

# Installer les dépendances
composer install

# Configurer l'environnement
cp .env.example .env
# Modifier DATABASE_URL dans .env

# Créer la base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# Démarrer le serveur
symfony server:start
# ou
php -S localhost:8000 -t public
```

### Frontend (Next.js)

```bash
cd frontend

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
# Modifier NEXT_PUBLIC_API_URL dans .env.local

# Démarrer le serveur de développement
npm run dev
```

---

## 📁 Structure du Projet

```
assurance-transporteurs/
├── backend/                    # Application Symfony
│   ├── config/                 # Configuration Symfony
│   ├── src/
│   │   ├── Controller/         # Controllers API
│   │   ├── Entity/             # Entités Doctrine
│   │   ├── Repository/         # Repositories
│   │   └── Service/            # Services métier
│   ├── templates/
│   │   └── emails/             # Templates emails
│   ├── migrations/             # Migrations DB
│   ├── .env                    # Variables d'environnement
│   └── composer.json
│
├── frontend/                   # Application Next.js
│   ├── app/                    # Pages (App Router)
│   ├── components/             # Composants React
│   │   ├── forms/              # Formulaires
│   │   ├── sections/           # Sections de page
│   │   └── ui/                 # Composants UI
│   ├── lib/                    # Utilitaires
│   │   └── api.ts              # Client API
│   ├── public/                 # Assets statiques
│   ├── styles/                 # Styles globaux
│   ├── .env.local              # Variables d'environnement
│   ├── package.json
│   └── tailwind.config.js
│
└── docker-compose.yml          # Configuration Docker
```

---

## 🔌 API Endpoints

### Devis

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/devis` | Créer un devis |
| GET | `/api/devis/{id}` | Récupérer un devis |

**Exemple de requête POST /api/devis :**

```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "raisonSociale": "Transport Dupont SARL",
  "activite": "transport",
  "demarrageActivite": "oui",
  "assureActuellement": "non",
  "typeTransport": "marchandises",
  "souhaitezAssurer": "véhicule + M/ses trans",
  "codePostal": "75001",
  "email": "jean.dupont@example.com",
  "telephone": "0612345678",
  "rgpdConsent": true
}
```

**Réponse :**

```json
{
  "success": true,
  "message": "Votre demande de devis a été envoyée avec succès",
  "data": {
    "id": 123,
    "reference": "DEV-000123"
  }
}
```

### Autres Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/activites` | Liste des activités |
| GET | `/api/garanties` | Liste des garanties |
| GET | `/api/faqs` | Liste des FAQs |

---

## 🧪 Tests

### Backend (Symfony)

```bash
# Tests unitaires
docker-compose exec php php bin/phpunit

# Tests avec couverture
docker-compose exec php php bin/phpunit --coverage-html coverage
```

### Frontend (Next.js)

```bash
# Tests avec Jest
docker-compose exec frontend npm test

# Tests E2E avec Playwright
docker-compose exec frontend npm run test:e2e
```

---

## 🎨 Personnalisation

### Couleurs (Tailwind)

Modifier `frontend/tailwind.config.js` :

```javascript
colors: {
  primary: '#2563eb',
  green: '#16a34a',
  accent: '#FFD700',
  // ... autres couleurs
}
```

### Emails

Les templates d'emails se trouvent dans `backend/templates/emails/` :
- `devis_confirmation.html.twig` - Email client
- `admin_notification.html.twig` - Email admin

---

## 📧 Configuration des Emails

### Avec MailHog (Développement)

MailHog est inclus dans Docker Compose pour tester les emails :
- Interface web : http://localhost:8025

### Avec SMTP (Production)

Modifier `backend/.env` :

```env
MAILER_DSN=smtp://username:password@smtp.example.com:587
```

---

## 🔒 Sécurité

### CORS

Configurer CORS dans `backend/config/packages/nelmio_cors.yaml` :

```yaml
nelmio_cors:
    defaults:
        origin_regex: true
        allow_origin: ['%env(CORS_ALLOW_ORIGIN)%']
        allow_methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE']
        allow_headers: ['Content-Type', 'Authorization']
        max_age: 3600
```

### Variables d'environnement sensibles

Ne jamais commiter :
- `.env` (backend)
- `.env.local` (frontend)
- Clés API
- Mots de passe

---

## 🚀 Déploiement

### Backend (Symfony)

```bash
# Optimiser l'autoload
composer install --no-dev --optimize-autoloader

# Vider le cache
php bin/console cache:clear --env=prod

# Migrations
php bin/console doctrine:migrations:migrate --no-interaction
```

### Frontend (Next.js)

```bash
# Build de production
npm run build

# Démarrer en production
npm start
```

### Docker en production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📊 Base de Données

### Schéma principal

**Table `devis_request`**:
- Stocke toutes les demandes de devis
- Champs : nom, prénom, email, téléphone, etc.
- Timestamps automatiques

**Table `activite`**:
- Liste des activités professionnelles
- Relation avec `devis_request`

**Table `garantie_type`**:
- Types de garanties disponibles
- Prix et descriptions

**Table `faq`**:
- Questions fréquentes
- Ordre d'affichage

### Migrations

```bash
# Créer une migration
php bin/console make:migration

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Revenir en arrière
php bin/console doctrine:migrations:migrate prev
```

---

## 🐛 Debugging

### Logs Backend

```bash
# Logs Symfony
tail -f backend/var/log/dev.log

# Logs Docker
docker-compose logs -f php
```

### Logs Frontend

```bash
# Logs Next.js
docker-compose logs -f frontend
```

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT.

---

## 📞 Support

Pour toute question :
- Email : contact@assurance-transporteurs.fr
- Téléphone : 01 82 83 48 00

---

## 🔄 Mises à jour

### Mise à jour des dépendances

**Backend :**
```bash
composer update
```

**Frontend :**
```bash
npm update
```

### Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique des versions.

---

## ✅ Checklist de Production

- [ ] Variables d'environnement configurées
- [ ] Base de données migrée
- [ ] Cache Symfony vidé
- [ ] Build Next.js optimisé
- [ ] HTTPS configuré
- [ ] CORS configuré
- [ ] Emails testés
- [ ] Sauvegardes configurées
- [ ] Monitoring actif
- [ ] Logs configurés

---

**Développé avec ❤️ pour les professionnels du transport**
