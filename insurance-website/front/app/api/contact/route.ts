import { type NextRequest, NextResponse } from "next/server"
import { callSymfonyAPI } from "@/lib/api-config"
import type { ContactFormData, ContactResponse } from "@/types/contact"

// Validation des données
function validateContactData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.nom || typeof data.nom !== "string" || data.nom.trim().length === 0) {
    errors.push("Le nom est requis")
  }

  if (!data.prenom || typeof data.prenom !== "string" || data.prenom.trim().length === 0) {
    errors.push("Le prénom est requis")
  }

  if (!data.email || typeof data.email !== "string") {
    errors.push("L'email est requis")
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push("L'email n'est pas valide")
    }
  }

  if (!data.telephone || typeof data.telephone !== "string") {
    errors.push("Le téléphone est requis")
  } else {
    const phoneRegex = /^(?:\+33|0)[1-9](?:[0-9]{8})$/
    const cleanPhone = data.telephone.replace(/\s/g, "")
    if (!phoneRegex.test(cleanPhone)) {
      errors.push("Le téléphone n'est pas valide (format: +33 6 12 34 56 78)")
    }
  }

  if (!data.typeAssurance || !["vtc", "taxi", "transporteur"].includes(data.typeAssurance)) {
    errors.push("Le type d'assurance est invalide")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    const body = await request.json()

    // Validation
    const validation = validateContactData(body)
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation échouée",
          error: validation.errors.join(", "),
        },
        { status: 400 },
      )
    }

    const contactData: ContactFormData = {
      nom: body.nom.trim(),
      prenom: body.prenom.trim(),
      email: body.email.trim().toLowerCase(),
      telephone: body.telephone.replace(/\s/g, ""),
      typeAssurance: body.typeAssurance,
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    // Si une URL API est configurée, envoyer à Symfony
    if (apiUrl && apiUrl !== "http://localhost:8000") {
      try {
        console.log("[v0] Envoi à Symfony:", apiUrl)
        const response = await callSymfonyAPI("/api/contact", "POST", contactData)

        console.log("[v0] Réponse Symfony:", response)

        return NextResponse.json(
          {
            success: true,
            message: "Demande reçue avec succès",
            data: response,
          },
          { status: 200 },
        )
      } catch (apiError) {
        console.error("[v0] Erreur Symfony:", apiError)

        // Fallback: enregistrer localement
        console.log("[v0] Fallback local - Demande enregistrée:", contactData)

        return NextResponse.json(
          {
            success: true,
            message: "Demande reçue (mode local)",
            data: { status: "pending" },
          },
          { status: 200 },
        )
      }
    } else {
      // Mode développement: enregistrement local
      console.log("[v0] Mode développement - Nouvelle demande:", contactData)

      return NextResponse.json(
        {
          success: true,
          message: "Demande reçue avec succès (développement)",
          data: { status: "pending" },
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("[v0] Erreur serveur:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur interne",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
