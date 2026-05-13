"use client"

import { useEffect, useRef, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalItems } = useCart()
  const previousTotal = useRef(totalItems)
  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    if (totalItems > previousTotal.current) {
      setIsHighlighted(true)
      const timeout = window.setTimeout(() => {
        setIsHighlighted(false)
      }, 900)

      previousTotal.current = totalItems
      return () => window.clearTimeout(timeout)
    }

    previousTotal.current = totalItems
  }, [totalItems])

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-600 border-0 shadow-lg transition-all hover:scale-110 ${
        isHighlighted ? "cart-button-added" : ""
      }`}
      aria-label={`Dopytový košík, ${totalItems} položiek`}
    >
      <ShoppingCart className="h-6 w-6 text-white" />
      {isHighlighted && (
        <span className="absolute inset-0 rounded-full border-2 border-amber-300 cart-button-ring" />
      )}
      {totalItems > 0 && (
        <span
          className={`absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white ${
            isHighlighted ? "cart-count-pop" : ""
          }`}
        >
          {totalItems}
        </span>
      )}
    </Button>
  )
}
