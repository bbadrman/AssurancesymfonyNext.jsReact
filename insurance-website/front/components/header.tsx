"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PA</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">ProAssure</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#offres" className="text-foreground hover:text-primary transition">
              Offres
            </Link>
            <Link href="#avantages" className="text-foreground hover:text-primary transition">
              Avantages
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
              Devis Gratuit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link href="#offres" className="block text-foreground hover:text-primary transition">
              Offres
            </Link>
            <Link href="#avantages" className="block text-foreground hover:text-primary transition">
              Avantages
            </Link>
            <Link href="#contact" className="block text-foreground hover:text-primary transition">
              Contact
            </Link>
            <button className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
              Devis Gratuit
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
