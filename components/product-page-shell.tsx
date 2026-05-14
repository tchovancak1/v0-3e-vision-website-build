"use client"

import { useState } from "react"
import { CartButton } from "@/components/cart-button"
import { CartDrawer } from "@/components/cart-drawer"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import type { Product } from "@/lib/products"

interface ProductPageShellProps {
  product: Product
}

function ProductPageContent({ product }: ProductPageShellProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Footer />
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export function ProductPageShell({ product }: ProductPageShellProps) {
  return <ProductPageContent product={product} />
}
