<?php

namespace App\Controller\Api;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api', name: 'api_')]
class ContactController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ValidatorInterface $validator
    ) {}

    #[Route('/contacts', name: 'contacts_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!$data) {
                return $this->json([
                    'success' => false,
                    'error' => 'Données invalides'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Créer l'entité Contact
            $contact = new Contact();
            $contact->setNom($data['nom'] ?? '');
            $contact->setPrenom($data['prenom'] ?? '');
            $contact->setEmail($data['email'] ?? '');
            $contact->setTelephone($data['telephone'] ?? '');
            $contact->setTypeAssurance($data['typeAssurance'] ?? 'vtc');
            $contact->setCreatedAt(new \DateTimeImmutable());
            $contact->setStatus('pending');

            // Valider l'entité
            $errors = $this->validator->validate($contact);

            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[$error->getPropertyPath()] = $error->getMessage();
                }

                return $this->json([
                    'success' => false,
                    'error' => 'Erreurs de validation',
                    'errors' => $errorMessages
                ], Response::HTTP_BAD_REQUEST);
            }

            // Sauvegarder en base de données
            $this->entityManager->persist($contact);
            $this->entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Votre demande a été envoyée avec succès',
                'data' => [
                    'id' => $contact->getId(),
                    'reference' => 'CONT-' . str_pad($contact->getId(), 6, '0', STR_PAD_LEFT)
                ]
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            error_log('Erreur API Contact: ' . $e->getMessage());
            
            return $this->json([
                'success' => false,
                'error' => 'Une erreur est survenue: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/contacts/{id}', name: 'contacts_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $contact = $this->entityManager->getRepository(Contact::class)->find($id);

        if (!$contact) {
            return $this->json([
                'success' => false,
                'error' => 'Contact non trouvé'
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'success' => true,
            'data' => [
                'id' => $contact->getId(),
                'nom' => $contact->getNom(),
                'prenom' => $contact->getPrenom(),
                'email' => $contact->getEmail(),
                'telephone' => $contact->getTelephone(),
                'typeAssurance' => $contact->getTypeAssurance(),
                'status' => $contact->getStatus(),
                'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s')
            ]
        ]);
    }

    #[Route('/contacts', name: 'contacts_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $contacts = $this->entityManager->getRepository(Contact::class)->findAll();

        $data = array_map(function($contact) {
            return [
                'id' => $contact->getId(),
                'nom' => $contact->getNom(),
                'prenom' => $contact->getPrenom(),
                'email' => $contact->getEmail(),
                'telephone' => $contact->getTelephone(),
                'typeAssurance' => $contact->getTypeAssurance(),
                'status' => $contact->getStatus(),
                'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }, $contacts);

        return $this->json([
            'success' => true,
            'data' => $data,
            'total' => count($data)
        ]);
    }
}