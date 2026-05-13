"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalItems } = useCart()

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-600 border-0 shadow-lg transition-all hover:scale-110"
    >
      <ShoppingCart className="h-6 w-6 text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
