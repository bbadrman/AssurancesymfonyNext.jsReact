// Types pour la validation des données de contact
export interface ContactFormData {
  nom: string
  prenom: string
  email: string
  telephone: string
  typeAssurance: "vtc" | "taxi" | "transporteur"
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id?: number
    createdAt?: string
    status?: string
  }
  error?: string
}

export interface SymfonyErrorResponse {
  error: string
  message: string
  status: number
}
