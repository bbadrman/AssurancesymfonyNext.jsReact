<?php
// src/Controller/Api/ContactController.php

namespace App\Controller\Api;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[Route('/api', name: 'api_')]
class ContactController extends AbstractController
{
    /**
     * Soumettre une demande de devis
     */
    #[Route('/contact', name: 'contact_submit', methods: ['POST'])]
    public function submitContact(
        Request $request,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
    ): JsonResponse {
        try {
            // Récupérer les données JSON
            $data = json_decode($request->getContent(), true);

            // Valider les données
            $errors = $this->validateContactData($data, $validator);
            if (!empty($errors)) {
                return $this->json([
                    'success' => false,
                    'message' => 'Validation échouée',
                    'errors' => $errors,
                ], Response::HTTP_BAD_REQUEST);
            }

            // Créer une nouvelle entité Contact
            $contact = new Contact();
            $contact->setNom($data['nom']);
            $contact->setPrenom($data['prenom']);
            $contact->setEmail($data['email']);
            $contact->setTelephone($data['telephone']);
            $contact->setTypeAssurance($data['typeAssurance']);
            $contact->setStatus('pending');
            $contact->setCreatedAt(new \DateTimeImmutable());

            // Persister et flush
            $entityManager->persist($contact);
            $entityManager->flush();

            // Envoyer un email de confirmation (optionnel)
            // $this->sendConfirmationEmail($contact);

            return $this->json([
                'success' => true,
                'message' => 'Demande reçue avec succès',
                'data' => [
                    'id' => $contact->getId(),
                    'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s'),
                    'status' => $contact->getStatus(),
                ],
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Récupérer toutes les demandes (admin)
     */
    #[Route('/contact', name: 'contact_list', methods: ['GET'])]
    public function listContacts(ContactRepository $contactRepository): JsonResponse
    {
        $contacts = $contactRepository->findAll();

        return $this->json([
            'success' => true,
            'data' => array_map(fn($contact) => [
                'id' => $contact->getId(),
                'nom' => $contact->getNom(),
                'prenom' => $contact->getPrenom(),
                'email' => $contact->getEmail(),
                'telephone' => $contact->getTelephone(),
                'typeAssurance' => $contact->getTypeAssurance(),
                'status' => $contact->getStatus(),
                'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s'),
            ], $contacts),
        ]);
    }

    /**
     * Récupérer une demande par ID
     */
    #[Route('/contact/{id}', name: 'contact_show', methods: ['GET'])]
    public function showContact(Contact $contact): JsonResponse
    {
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
                'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Mettre à jour le statut d'une demande
     */
    #[Route('/contact/{id}', name: 'contact_update', methods: ['PUT'])]
    public function updateContact(
        Contact $contact,
        Request $request,
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (isset($data['status'])) {
            $validStatuses = ['pending', 'contacted', 'converted'];
            if (in_array($data['status'], $validStatuses)) {
                $contact->setStatus($data['status']);
                $entityManager->flush();

                return $this->json([
                    'success' => true,
                    'message' => 'Demande mise à jour',
                    'data' => [
                        'id' => $contact->getId(),
                        'status' => $contact->getStatus(),
                    ],
                ]);
            }
        }

        return $this->json([
            'success' => false,
            'message' => 'Données invalides',
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Supprimer une demande
     */
    #[Route('/contact/{id}', name: 'contact_delete', methods: ['DELETE'])]
    public function deleteContact(
        Contact $contact,
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        $entityManager->remove($contact);
        $entityManager->flush();

        return $this->json([
            'success' => true,
            'message' => 'Demande supprimée',
        ]);
    }

    /**
     * Valider les données du formulaire
     */
    private function validateContactData(array $data, ValidatorInterface $validator): array
    {
        $errors = [];

        // Validation nom
        if (empty($data['nom']) || !is_string($data['nom'])) {
            $errors['nom'] = 'Le nom est requis';
        }

        // Validation prénom
        if (empty($data['prenom']) || !is_string($data['prenom'])) {
            $errors['prenom'] = 'Le prénom est requis';
        }

        // Validation email
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'L\'email n\'est pas valide';
        }

        // Validation téléphone
        if (empty($data['telephone'])) {
            $errors['telephone'] = 'Le téléphone est requis';
        }

        // Validation type d'assurance
        $validTypes = ['vtc', 'taxi', 'transporteur'];
        if (empty($data['typeAssurance']) || !in_array($data['typeAssurance'], $validTypes)) {
            $errors['typeAssurance'] = 'Le type d\'assurance est invalide';
        }

        return $errors;
    }
}
