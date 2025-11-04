import { CheckCircle, Headphones, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "Couverture Complète",
    description: "Protection adaptée à tous les risques liés à votre activité professionnelle",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Assistance disponible à tout moment pour vos questions et sinistres",
  },
  {
    icon: Zap,
    title: "Devis Rapide",
    description: "Obtenez votre devis en moins de 5 minutes, sans engagement",
  },
  {
    icon: Shield,
    title: "Garanties Solides",
    description: "Assureur de confiance avec plus de 20 ans d'expérience",
  },
]

export default function Features() {
  return (
    <section id="avantages" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Pourquoi Nous Choisir ?</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Des avantages pensés pour les professionnels du transport
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="bg-card rounded-xl p-6 border border-border">
                <Icon size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
