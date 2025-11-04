# Guide Complet d'Intégration Next.js + Symfony

## Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                       │
│  http://localhost:3000                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ components/contact-form.tsx                          │   │
│  │ - Formulaire avec validation côté client             │   │
│  │ - Appel à /api/contact (route handler)               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ (POST /api/contact)
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS ROUTE HANDLER                          │
│  app/api/contact/route.ts                                   │
│  - Validation des données                                   │
│  - Appel à l'API Symfony                                    │
│  - Gestion des erreurs                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓ (POST /api/contact)
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Symfony 6.4)                       │
│  http://localhost:8000                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ src/Controller/Api/ContactController.php             │   │
│  │ - Reçoit les données                                 │   │
│  │ - Valide et persiste en base de données              │   │
│  │ - Retourne une réponse JSON                          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ src/Entity/Contact.php                               │   │
│  │ - Modèle de données                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Base de données (MySQL/PostgreSQL)                   │   │
│  │ - Table contacts                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Flux de Données

### 1. Utilisateur remplit le formulaire
\`\`\`
Formulaire → Validation côté client → Soumission
\`\`\`

### 2. Envoi au route handler Next.js
\`\`\`
POST /api/contact
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "telephone": "+33612345678",
  "typeAssurance": "vtc"
}
\`\`\`

### 3. Route handler valide et envoie à Symfony
\`\`\`
POST http://localhost:8000/api/contact
Headers: Content-Type: application/json
Body: {...données...}
\`\`\`

### 4. Symfony traite et sauvegarde
\`\`\`
- Valide les données
- Crée une entité Contact
- Persiste en base de données
- Retourne une réponse JSON
\`\`\`

### 5. Réponse au client
\`\`\`json
{
  "success": true,
  "message": "Demande reçue avec succès",
  "data": {
    "id": 1,
    "createdAt": "2024-01-15 10:30:00",
    "status": "pending"
  }
}
\`\`\`

## Installation Étape par Étape

### Étape 1: Cloner et installer Next.js
\`\`\`bash
# Télécharger le projet depuis v0
# ou cloner depuis GitHub
git clone <votre-repo-nextjs>
cd insurance-website
npm install
\`\`\`

### Étape 2: Configurer l'URL API
\`\`\`bash
# Créer .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
\`\`\`

### Étape 3: Lancer Next.js
\`\`\`bash
npm run dev
# Accessible à http://localhost:3000
\`\`\`

### Étape 4: Créer le projet Symfony
\`\`\`bash
symfony new insurance-api --version=6.4
cd insurance-api
\`\`\`

### Étape 5: Installer les dépendances Symfony
\`\`\`bash
composer require symfony/orm-pack
composer require nelmio/cors-bundle
composer require --dev symfony/maker-bundle
\`\`\`

### Étape 6: Configurer la base de données
\`\`\`bash
# Éditer .env
DATABASE_URL="mysql://root:password@127.0.0.1:3306/insurance_db"

# Créer la base
php bin/console doctrine:database:create
\`\`\`

### Étape 7: Créer l'entité Contact
\`\`\`bash
php bin/console make:entity Contact
# Ajouter les champs: nom, prenom, email, telephone, typeAssurance, createdAt, status
php bin/console make:migration
php bin/console doctrine:migrations:migrate
\`\`\`

### Étape 8: Créer le contrôleur API
\`\`\`bash
php bin/console make:controller Api/ContactController
# Remplacer le contenu par le code fourni dans SYMFONY_CONTROLLER.php
\`\`\`

### Étape 9: Configurer CORS
\`\`\`bash
# Créer config/packages/nelmio_cors.yaml
# Ajouter la configuration CORS
\`\`\`

### Étape 10: Lancer Symfony
\`\`\`bash
symfony server:start
# Accessible à http://localhost:8000
\`\`\`

## Test de l'Intégration

### Test 1: Vérifier que les serveurs tournent
\`\`\`bash
# Terminal 1
npm run dev
# http://localhost:3000

# Terminal 2
symfony server:start
# http://localhost:8000
\`\`\`

### Test 2: Soumettre le formulaire
1. Allez à http://localhost:3000
2. Remplissez le formulaire
3. Cliquez sur "Demander un Devis Gratuit"
4. Vérifiez le message de succès

### Test 3: Vérifier les données en base
\`\`\`bash
# Dans Symfony
php bin/console doctrine:query:sql "SELECT * FROM contacts"
\`\`\`

### Test 4: Vérifier les logs
\`\`\`bash
# Terminal Symfony
tail -f var/log/dev.log
\`\`\`

## Déploiement en Production

### Frontend (Vercel)
1. Pousser le code sur GitHub
2. Connecter le repo à Vercel
3. Ajouter la variable d'environnement:
   \`\`\`
   NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
   \`\`\`
4. Déployer

### Backend (Symfony)
1. Déployer sur un serveur (Heroku, DigitalOcean, etc.)
2. Configurer les variables d'environnement
3. Exécuter les migrations
4. Configurer CORS pour le domaine de production

## Dépannage

### Erreur: "Cannot POST /api/contact"
- Vérifier que Symfony tourne sur http://localhost:8000
- Vérifier la configuration CORS

### Erreur: "CORS policy"
- Vérifier la configuration nelmio_cors.yaml
- Ajouter le domaine Next.js à allow_origin

### Erreur: "Database connection failed"
- Vérifier la configuration DATABASE_URL
- Vérifier que MySQL/PostgreSQL tourne
- Vérifier les identifiants

### Formulaire ne s'envoie pas
- Ouvrir DevTools (F12)
- Aller à l'onglet Network
- Vérifier la requête POST
- Vérifier la réponse du serveur

## Fichiers Importants

### Frontend
- `components/contact-form.tsx` - Formulaire
- `app/api/contact/route.ts` - Route handler
- `lib/api-client.ts` - Client API
- `types/contact.ts` - Types TypeScript
- `.env.local` - Configuration

### Backend
- `src/Controller/Api/ContactController.php` - Contrôleur
- `src/Entity/Contact.php` - Entité
- `config/packages/nelmio_cors.yaml` - Configuration CORS
- `.env` - Configuration Symfony

## Support

Pour toute question ou problème:
1. Vérifier les logs (DevTools, var/log/dev.log)
2. Vérifier la configuration
3. Tester avec curl ou Postman
4. Consulter la documentation officielle
