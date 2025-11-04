import { Shield } from "lucide-react"

const offers = [
  {
    id: "vtc",
    title: "Assurance VTC",
    description: "Couverture complète pour votre activité VTC avec responsabilité civile et protection passagers.",
    features: ["Responsabilité civile illimitée", "Protection des passagers", "Assistance 24/7", "Couverture dommages"],
    icon: "🚕",
    price: "À partir de 49€/mois",
  },
  {
    id: "taxi",
    title: "Assurance Taxi",
    description: "Protection spécialisée pour les taxis avec couverture adaptée aux exigences légales.",
    features: [
      "Responsabilité civile illimitée",
      "Couverture taximètre",
      "Protection des biens",
      "Assistance routière",
    ],
    icon: "🚖",
    price: "À partir de 59€/mois",
  },
  {
    id: "transporteur",
    title: "Assurance Transporteur",
    description: "Couverture complète pour transporteurs avec protection marchandises et responsabilité civile.",
    features: [
      "Responsabilité civile étendue",
      "Protection marchandises",
      "Couverture flotte",
      "Gestion sinistres rapide",
    ],
    icon: "🚚",
    price: "À partir de 79€/mois",
  },
]

export default function Offers() {
  return (
    <section id="offres" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Nos Offres d'Assurance</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Choisissez l'offre adaptée à votre activité professionnelle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition">
              <div className="text-5xl mb-4">{offer.icon}</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{offer.title}</h3>
              <p className="text-muted-foreground mb-6">{offer.description}</p>

              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <p className="text-primary font-semibold">{offer.price}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {offer.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Shield size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold">
                Demander un Devis
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
