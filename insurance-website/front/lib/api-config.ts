// Configuration centralisée pour l'API Symfony
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  endpoints: {
    contact: "/api/contact",
    devis: "/api/devis",
  },
  timeout: 10000, // 10 secondes
}

export async function callSymfonyAPI(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
  data?: Record<string, any>,
) {
  const url = `${API_CONFIG.baseUrl}${endpoint}`

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Erreur API: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur de connexion à l'API: ${error.message}`)
    }
    throw error
  }
}
