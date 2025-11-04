# Guide Complet d'Intégration Symfony 6.4

## 1. Installation du Projet Symfony

### Créer un nouveau projet Symfony
\`\`\`bash
symfony new insurance-api --version=6.4
cd insurance-api
\`\`\`

### Ou cloner un projet existant
\`\`\`bash
git clone <votre-repo>
cd insurance-api
composer install
\`\`\`

## 2. Configuration de la Base de Données

### Installer Doctrine
\`\`\`bash
composer require symfony/orm-pack
composer require --dev symfony/maker-bundle
\`\`\`

### Configurer .env
\`\`\`env
DATABASE_URL="mysql://root:password@127.0.0.1:3306/insurance_db?serverVersion=8.0"
\`\`\`

### Créer la base de données
\`\`\`bash
php bin/console doctrine:database:create
\`\`\`

## 3. Créer l'Entité Contact

### Générer l'entité
\`\`\`bash
php bin/console make:entity Contact
\`\`\`

### Ajouter les champs:
- nom (string, 255)
- prenom (string, 255)
- email (string, 255)
- telephone (string, 20)
- typeAssurance (string, 50) - vtc, taxi, transporteur
- createdAt (datetime_immutable)
- status (string, 50) - pending, contacted, converted

### Générer la migration
\`\`\`bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
\`\`\`

## 4. Créer le Contrôleur API

### Générer le contrôleur
\`\`\`bash
php bin/console make:controller Api/ContactController
\`\`\`

## 5. Configurer CORS

### Installer le bundle CORS
\`\`\`bash
composer require nelmio/cors-bundle
\`\`\`

### Créer config/packages/nelmio_cors.yaml
\`\`\`yaml
nelmio_cors:
  defaults:
    allow_credentials: false
    allow_origin: ['http://localhost:3000', 'https://votre-domaine.com']
    allow_headers: ['Content-Type', 'Authorization']
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    max_age: 3600
    expose_headers: ['Link', 'X-Total-Count']
\`\`\`

## 6. Lancer le serveur Symfony

\`\`\`bash
symfony server:start
# ou
php -S localhost:8000 -t public
\`\`\`

Le serveur sera accessible à: http://localhost:8000

## 7. Tester l'intégration

### Depuis Next.js (http://localhost:3000)
- Remplissez le formulaire
- Les données seront envoyées à http://localhost:8000/api/contact

### Vérifier les logs
\`\`\`bash
tail -f var/log/dev.log
\`\`\`

## 8. Déploiement en Production

### Sur un serveur (ex: Heroku, DigitalOcean)
1. Configurer les variables d'environnement
2. Exécuter les migrations
3. Déployer le code

### Mettre à jour Next.js
Dans Vercel, ajouter la variable d'environnement:
\`\`\`
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
