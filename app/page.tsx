"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhySection } from "@/components/why-section"
import { ConstructionSection } from "@/components/construction-section"
import { EffectorsSection } from "@/components/effectors-section"
import { MeasuringSection } from "@/components/measuring-section"
import { DocumentsSection } from "@/components/documents-section"
import { Footer } from "@/components/footer"
import { CartButton } from "@/components/cart-button"
import { CartDrawer } from "@/components/cart-drawer"

function HomeContent() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ConstructionSection />
        <EffectorsSection />
        <MeasuringSection />
        <DocumentsSection />
        <WhySection />
      </main>
      <Footer />
      
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default function Home() {
  return <HomeContent />
}
