// lib/api-client.ts
import type { ContactFormData } from "@/types/contact"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend.ddev.site"

interface ApiResponse<T = any> {
  success: boolean
  message?: string
  error?: string
  data?: T
  errors?: Record<string, string>
}

export class APIClient {
  /**
   * Soumettre un formulaire de contact
   */
  static async submitContact(formData: ContactFormData): Promise<ApiResponse> {
    try {
      console.log("[API] Envoi vers:", `${API_BASE_URL}/api/contacts`)
      console.log("[API] Données:", formData)

      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("[API] Status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("[API] Erreur:", errorData)
        
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log("[API] Réponse:", data)

      return data
    } catch (error) {
      console.error("[API] Exception:", error)
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion.")
      }
      
      throw error
    }
  }

  /**
   * Récupérer un contact par ID
   */
  static async getContact(id: number): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("[API] Erreur getContact:", error)
      throw error
    }
  }

  /**
   * Récupérer tous les contacts
   */
  static async getContacts(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("[API] Erreur getContacts:", error)
      throw error
    }
  }
}