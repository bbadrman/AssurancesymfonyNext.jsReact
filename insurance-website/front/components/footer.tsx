import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">PA</span>
              </div>
              <span className="font-bold text-lg">ProAssure</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">Assurance professionnelle pour chauffeurs depuis 2004.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Offres</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Assurance VTC
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Assurance Taxi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Assurance Transporteur
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@proassure.fr</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/80">© 2025 ProAssure. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
