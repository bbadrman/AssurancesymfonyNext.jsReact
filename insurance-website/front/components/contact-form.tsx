"use client"

import type React from "react"
import { useState } from "react"
import { APIClient } from "@/lib/api-client"
import type { ContactFormData } from "@/types/contact"

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    typeAssurance: "vtc",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Effacer l'erreur du champ quand l'utilisateur commence à taper
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")
    setFieldErrors({})

    try {
      console.log("[v0] Soumission du formulaire:", formData)
      const response = await APIClient.submitContact(formData)

      if (response.success) {
        setSubmitStatus("success")
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          typeAssurance: "vtc",
        })
        // Réinitialiser le message après 5 secondes
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
        setErrorMessage(response.error || "Une erreur s'est produite")
      }
    } catch (error) {
      console.error("[v0] Erreur formulaire:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Erreur de connexion")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Demander un Devis Gratuit
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Remplissez le formulaire ci-dessous et recevez votre devis personnalisé
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="prenom" className="block text-sm font-semibold text-foreground mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    fieldErrors.prenom ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Jean"
                />
                {fieldErrors.prenom && <p className="text-red-500 text-sm mt-1">{fieldErrors.prenom}</p>}
              </div>
              <div>
                <label htmlFor="nom" className="block text-sm font-semibold text-foreground mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    fieldErrors.nom ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Dupont"
                />
                {fieldErrors.nom && <p className="text-red-500 text-sm mt-1">{fieldErrors.nom}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    fieldErrors.email ? "border-red-500" : "border-border"
                  }`}
                  placeholder="jean@example.com"
                />
                {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-foreground mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    fieldErrors.telephone ? "border-red-500" : "border-border"
                  }`}
                  placeholder="+33 6 12 34 56 78"
                />
                {fieldErrors.telephone && <p className="text-red-500 text-sm mt-1">{fieldErrors.telephone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="typeAssurance" className="block text-sm font-semibold text-foreground mb-2">
                Type d'assurance *
              </label>
              <select
                id="typeAssurance"
                name="typeAssurance"
                value={formData.typeAssurance}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <option value="vtc">Assurance VTC</option>
                <option value="taxi">Assurance Taxi</option>
                <option value="transporteur">Assurance Transporteur</option>
              </select>
            </div>

            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                ✓ Merci ! Votre demande a été envoyée avec succès. Nous vous recontacterons rapidement.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                ✗ {errorMessage || "Une erreur s'est produite. Veuillez réessayer."}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Envoi en cours..." : "Demander un Devis Gratuit"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
