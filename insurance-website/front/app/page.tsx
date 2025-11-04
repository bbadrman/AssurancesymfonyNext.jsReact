import Header from "@/components/header"
import Hero from "@/components/hero"
import Offers from "@/components/offers"
import Features from "@/components/features"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ContactForm />
      <Offers />
      <Features /> 
      <Footer />
    </main>
  )
}
