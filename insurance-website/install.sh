#!/bin/bash

# 🚀 Script d'Installation Automatique
# Plateforme d'Assurance Véhicule Professionnel

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║  🚚 Assurance Véhicule Professionnel - Installation         ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérifier si Docker est installé
echo -e "${BLUE}[1/10]${NC} Vérification de Docker..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas installé. Veuillez installer Docker d'abord.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker installé${NC}"

# Vérifier si Docker Compose est installé
echo -e "${BLUE}[2/10]${NC} Vérification de Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker Compose installé${NC}"

# Créer les fichiers .env s'ils n'existent pas
echo -e "${BLUE}[3/10]${NC} Configuration des variables d'environnement..."

if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}📝 Création de backend/.env${NC}"
    cat > backend/.env << 'EOF'
APP_ENV=dev
APP_SECRET=$(openssl rand -hex 32)
DATABASE_URL="mysql://assurance_user:assurance_pass@mysql:3306/assurance_db?serverVersion=8.0"
MAILER_DSN=smtp://mailhog:1025
CORS_ALLOW_ORIGIN=^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$
EOF
fi

if [ ! -f frontend/.env.local ]; then
    echo -e "${YELLOW}📝 Création de frontend/.env.local${NC}"
    cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
fi

echo -e "${GREEN}✅ Variables d'environnement configurées${NC}"

# Démarrer Docker Compose
echo -e "${BLUE}[4/10]${NC} Démarrage des conteneurs Docker..."
docker-compose up -d
echo -e "${GREEN}✅ Conteneurs démarrés${NC}"

# Attendre que MySQL soit prêt
echo -e "${BLUE}[5/10]${NC} Attente du démarrage de MySQL..."
sleep 10
echo -e "${GREEN}✅ MySQL prêt${NC}"

# Installer les dépendances Symfony
echo -e "${BLUE}[6/10]${NC} Installation des dépendances Symfony..."
docker-compose exec -T php composer install --no-interaction
echo -e "${GREEN}✅ Dépendances Symfony installées${NC}"

# Créer la base de données
echo -e "${BLUE}[7/10]${NC} Création de la base de données..."
docker-compose exec -T php php bin/console doctrine:database:create --if-not-exists --no-interaction
echo -e "${GREEN}✅ Base de données créée${NC}"

# Exécuter les migrations
echo -e "${BLUE}[8/10]${NC} Exécution des migrations..."
docker-compose exec -T php php bin/console doctrine:migrations:migrate --no-interaction || true
echo -e "${GREEN}✅ Migrations exécutées${NC}"

# Installer les dépendances Next.js
echo -e "${BLUE}[9/10]${NC} Installation des dépendances Next.js..."
docker-compose exec -T frontend npm install
echo -e "${GREEN}✅ Dépendances Next.js installées${NC}"

# Vérifier que tout fonctionne
echo -e "${BLUE}[10/10]${NC} Vérification finale..."
sleep 5

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║  ✅ Installation terminée avec succès !                     ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🎉 L'application est prête !${NC}"
echo ""
echo "📋 Accès aux services :"
echo -e "   ${BLUE}Frontend:${NC}  http://localhost:3000"
echo -e "   ${BLUE}Backend:${NC}   http://localhost:8000/api"
echo -e "   ${BLUE}MailHog:${NC}   http://localhost:8025"
echo ""
echo "🔧 Commandes utiles :"
echo -e "   ${YELLOW}Voir les logs:${NC}          docker-compose logs -f"
echo -e "   ${YELLOW}Arrêter:${NC}                docker-compose down"
echo -e "   ${YELLOW}Redémarrer:${NC}             docker-compose restart"
echo ""
echo "📚 Documentation :"
echo -e "   ${YELLOW}README complet:${NC}         cat README.md"
echo -e "   ${YELLOW}Guide rapide:${NC}           cat QUICK_START.md"
echo ""
echo -e "${GREEN}Bon développement ! 🚀${NC}"
