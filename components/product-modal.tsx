"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  X,
  FileText,
  Info,
  Download,
  ShoppingCart,
  CheckCircle,
  Minus,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { products, type ProductId } from "@/lib/products"

type TabType = "info" | "docs"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  productId: ProductId | null
}

export function ProductModal({ isOpen, onClose, productId }: ProductModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("info")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  const { addItem, removeItem, isInCart, updateQuantity, items } = useCart()

  useEffect(() => {
    if (!showAddedFeedback) return

    const timeout = window.setTimeout(() => {
      setShowAddedFeedback(false)
    }, 2200)

    return () => window.clearTimeout(timeout)
  }, [showAddedFeedback])

  if (!isOpen || !productId) return null

  const product = products[productId]
  const inCart = isInCart(product.id)
  const cartItem = items.find((item) => item.id === product.id)
  const colorClasses =
    product.color === "amber"
      ? {
          accent: "text-slate-700",
          bg: "bg-slate-700",
          bgHover: "hover:bg-slate-800",
      }
      : {
          accent: "text-slate-700",
          bg: "bg-slate-700",
          bgHover: "hover:bg-slate-800",
        }

  const handleAddToCart = () => {
    if (inCart) {
      removeItem(product.id)
      setShowAddedFeedback(false)
    } else {
      addItem({
        id: product.id,
        name: product.name,
        type: "product",
        quantity: quantity,
        description: product.shortDesc,
      })
      setShowAddedFeedback(true)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    if (inCart) {
      updateQuantity(product.id, newQuantity)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 ${colorClasses.bg} text-white text-sm font-bold rounded-full`}
            >
              {productId.toUpperCase()}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {product.name}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-colors ${
              activeTab === "info"
                ? "text-slate-900 border-b-2 border-slate-500"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Info className="h-4 w-4" />
            <span>Stručné info</span>
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-colors ${
              activeTab === "docs"
                ? "text-slate-900 border-b-2 border-slate-500"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Dokumenty na stiahnutie</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-220px)]">
          {activeTab === "info" ? (
            <div className="p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Images */}
                <div className="space-y-4">
                  <div
                    className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white"
                  >
                    <Image
                      src={product.images[activeImageIndex]}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="flex gap-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageIndex === index
                            ? "border-slate-500 ring-2 ring-slate-300"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <p className="text-slate-600 mb-6 whitespace-pre-line text-pretty">
                    {product.description}
                  </p>
                  <h3 className="font-bold text-slate-900 mb-3">
                    Hlavné vlastnosti:
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          className={`h-5 w-5 ${colorClasses.accent} flex-shrink-0 mt-0.5`}
                        />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {product.documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    download={doc.filename}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center`}
                    >
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 group-hover:underline">
                        {doc.name}
                      </h4>
                      <p className="text-sm text-slate-500">{doc.filename}</p>
                    </div>
                    <Download className={`h-5 w-5 ${colorClasses.accent}`} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50">
          {showAddedFeedback && (
            <div className="mb-4 flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CheckCircle className="h-5 w-5" />
              Produkt bol pridaný do dopytu
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Počet kusov:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">
                  {inCart ? cartItem?.quantity || quantity : quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              size="lg"
              className={`flex-1 sm:flex-none ${
                inCart
                  ? "bg-green-500 hover:bg-green-600"
                  : `${colorClasses.bg} ${colorClasses.bgHover}`
              } text-white px-8 transition-all ${
                showAddedFeedback ? "cart-add-success" : ""
              }`}
            >
              {inCart ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Pridané do dopytu
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Pridať do dopytu
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
