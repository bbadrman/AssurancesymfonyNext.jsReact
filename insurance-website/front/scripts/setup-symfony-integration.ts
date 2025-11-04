/**
 * Guide d'intégration Symfony 6.4
 *
 * Ce fichier contient les instructions pour configurer votre backend Symfony
 * afin qu'il communique correctement avec ce frontend Next.js
 */

// ============================================
// 1. CRÉER LE CONTRÔLEUR SYMFONY
// ============================================

const symfonyController = `
// src/Controller/Api/ContactController.php
<?php

namespace App\\Controller\\Api;

use Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;
use Symfony\\Component\\HttpFoundation\\JsonResponse;
use Symfony\\Component\\HttpFoundation\\Request;
use Symfony\\Component\\Routing\\Attribute\\Route;
use Symfony\\Component\\Validator\\Validator\\ValidatorInterface;
use Symfony\\Component\\Validator\\Constraints as Assert;

#[Route('/api', name: 'api_')]
class ContactController extends AbstractController
{
    #[Route('/contact', name: 'contact', methods: ['POST'])]
    public function submitContact(
        Request $request,
        ValidatorInterface $validator
    ): JsonResponse {
        try {
            $data = json_decode($request->getContent(), true);

            // Validation des données
            $constraints = new Assert\\Collection([
                'nom' => new Assert\\NotBlank(),
                'prenom' => new Assert\\NotBlank(),
                'email' => new Assert\\Email(),
                'telephone' => new Assert\\NotBlank(),
                'typeAssurance' => new Assert\\Choice(['vtc', 'taxi', 'transporteur']),
            ]);

            $violations = $validator->validate($data, $constraints);

            if (count($violations) > 0) {
                return $this->json([
                    'error' => 'Données invalides',
                    'violations' => (string) $violations,
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            // Traiter les données (sauvegarder en BD, envoyer email, etc.)
            // Exemple: \$contact = new Contact();
            // \$contact->setNom(\$data['nom']);
            // etc...

            return $this->json([
                'success' => true,
                'message' => 'Demande reçue avec succès',
                'data' => [
                    'id' => 1, // ID généré par Symfony
                    'status' => 'pending',
                ]
            ], JsonResponse::HTTP_OK);

        } catch (\\Exception \$e) {
            return $this->json([
                'error' => 'Erreur serveur',
                'message' => \$e->getMessage(),
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
`

// ============================================
// 2. CONFIGURER CORS
// ============================================

const corsConfig = `
# config/packages/nelmio_cors.yaml
nelmio_cors:
  defaults:
    allow_credentials: false
    allow_origin: ['http://localhost:3000', 'https://votre-domaine.com']
    allow_headers: ['Content-Type', 'Authorization']
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    max_age: 3600
    expose_headers: ['Content-Type']
`

// ============================================
// 3. CONFIGURER LES ROUTES
// ============================================

const routesConfig = `
# config/routes.yaml
api:
  resource: ../src/Controller/Api/
  type: attribute
  prefix: /api
`

// ============================================
// 4. CRÉER L'ENTITÉ CONTACT
// ============================================

const contactEntity = `
// src/Entity/Contact.php
<?php

namespace App\\Entity;

use App\\Repository\\ContactRepository;
use Doctrine\\ORM\\Mapping as ORM;
use DateTime;

#[ORM\\Entity(repositoryClass: ContactRepository::class)]
#[ORM\\Table(name: 'contacts')]
class Contact
{
    #[ORM\\Id]
    #[ORM\\GeneratedValue]
    #[ORM\\Column]
    private ?int \$id = null;

    #[ORM\\Column(length: 255)]
    private string \$nom;

    #[ORM\\Column(length: 255)]
    private string \$prenom;

    #[ORM\\Column(length: 255)]
    private string \$email;

    #[ORM\\Column(length: 20)]
    private string \$telephone;

    #[ORM\\Column(length: 50)]
    private string \$typeAssurance;

    #[ORM\\Column]
    private DateTime \$createdAt;

    #[ORM\\Column(length: 50)]
    private string \$status = 'pending';

    public function __construct()
    {
        \$this->createdAt = new DateTime();
    }

    // Getters et Setters...
    public function getId(): ?int { return \$this->id; }
    public function getNom(): string { return \$this->nom; }
    public function setNom(string \$nom): self { \$this->nom = \$nom; return \$this; }
    // ... etc
}
`

// ============================================
// 5. MIGRATION DOCTRINE
// ============================================

const migration = `
// Exécuter:
// php bin/console make:migration
// php bin/console doctrine:migrations:migrate
`

console.log("Configuration Symfony 6.4 pour l'intégration avec Next.js")
console.log("=========================================================")
console.log("\n1. Contrôleur API:")
console.log(symfonyController)
console.log("\n2. Configuration CORS:")
console.log(corsConfig)
console.log("\n3. Configuration Routes:")
console.log(routesConfig)
console.log("\n4. Entité Contact:")
console.log(contactEntity)
console.log("\n5. Migration:")
console.log(migration)
