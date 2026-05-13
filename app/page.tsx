"use client"

import { useState } from "react"
import { CartProvider } from "@/context/cart-context"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhySection } from "@/components/why-section"
import { ConstructionSection } from "@/components/construction-section"
import { EffectorsSection } from "@/components/effectors-section"
import { MeasuringSection } from "@/components/measuring-section"
import { Footer } from "@/components/footer"
import { CartButton } from "@/components/cart-button"
import { CartDrawer } from "@/components/cart-drawer"
import { ProductModal } from "@/components/product-modal"

type ProductId = "tn110" | "tn210"

function HomeContent() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductId | null>(null)

  const handleProductClick = (productId: ProductId) => {
    setSelectedProduct(productId)
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhySection />
        <ConstructionSection />
        <EffectorsSection />
        <MeasuringSection onProductClick={handleProductClick} />
      </main>
      <Footer />
      
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProductModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        productId={selectedProduct}
      />
    </>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  )
}
