export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Assurance Professionnelle pour Chauffeurs
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Protection complète pour VTC, Taxi et Transporteurs. Couverture adaptée à vos besoins, tarifs compétitifs
              et assistance 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold">
                Obtenir un Devis
              </button>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/5 transition font-semibold">
                En Savoir Plus
              </button>
            </div>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🚗</div>
              <p className="text-muted-foreground">Votre sécurité, notre priorité</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
