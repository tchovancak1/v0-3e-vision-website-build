"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  Download,
  FileText,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/products"

interface ProductDetailProps {
  product: Product
}

type DetailTab = "params" | "docs"

export function ProductDetail({ product }: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  const [activeTab, setActiveTab] = useState<DetailTab>("params")
  const { addItem, removeItem, isInCart, updateQuantity, items } = useCart()

  const inCart = isInCart(product.id)
  const cartItem = items.find((item) => item.id === product.id)
  const colorClasses =
    product.color === "amber"
      ? {
          accent: "text-amber-600",
          bg: "bg-amber-500",
          bgHover: "hover:bg-amber-600",
        }
      : {
          accent: "text-red-600",
          bg: "bg-red-500",
          bgHover: "hover:bg-red-600",
        }

  useEffect(() => {
    if (!showAddedFeedback) return

    const timeout = window.setTimeout(() => {
      setShowAddedFeedback(false)
    }, 2200)

    return () => window.clearTimeout(timeout)
  }, [showAddedFeedback])

  const handleAddToCart = () => {
    if (inCart) {
      removeItem(product.id)
      setShowAddedFeedback(false)
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      type: "product",
      quantity,
      description: product.shortDesc,
    })
    setShowAddedFeedback(true)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    if (inCart) {
      updateQuantity(product.id, newQuantity)
    }
  }

  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/#meracia-technika"
            className={`inline-flex items-center gap-2 text-sm font-medium ${colorClasses.accent} hover:underline`}
          >
            <ArrowLeft className="h-4 w-4" />
            Späť na meraciu techniku
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span
                className={`inline-flex px-3 py-1 ${colorClasses.bg} text-white text-sm font-bold rounded-full`}
              >
                {product.id === "tn110" ? "TN-110" : "TN-210"}
              </span>
              <h1 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                {product.shortDesc}
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-10">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image
                src={product.images[activeImageIndex]}
                alt={`${product.name} fotografia ${activeImageIndex + 1}`}
                fill
                className="object-contain p-5"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {product.images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-slate-500 ring-2 ring-slate-300"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  aria-label={`Zobraziť fotografiu ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">Popis produktu</h2>
            <p className="mt-4 whitespace-pre-line leading-7 text-slate-700">
              {product.description}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("params")}
                className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all ${
                  activeTab === "params"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                Technické parametre
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("docs")}
                className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all ${
                  activeTab === "docs"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="h-4 w-4" />
                Dokumenty na stiahnutie
              </button>
            </div>

            {activeTab === "params" ? (
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-slate-950">
                  Technické parametre
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-slate-700"
                    >
                      <CheckCircle
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${colorClasses.accent}`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-slate-950">
                  Dokumenty na stiahnutie
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.documents.map((doc) => (
                    <a
                      key={doc.url}
                      href={doc.url}
                      download={doc.filename}
                      className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
                    >
                      <span
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${colorClasses.bg}`}
                      >
                        <FileText className="h-5 w-5 text-white" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-900 group-hover:underline">
                          {doc.name}
                        </span>
                        <span className="mt-1 block truncate text-xs text-slate-500">
                          {doc.filename}
                        </span>
                      </span>
                      <Download
                        className={`h-5 w-5 flex-shrink-0 ${colorClasses.accent}`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {showAddedFeedback && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <CheckCircle className="h-5 w-5" />
                Produkt bol pridaný do dopytu
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-slate-700">Počet kusov</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-bold">
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
              className={`mt-5 w-full ${
                inCart ? "bg-green-500 hover:bg-green-600" : `${colorClasses.bg} ${colorClasses.bgHover}`
              } text-white transition-all ${showAddedFeedback ? "cart-add-success" : ""}`}
            >
              {inCart ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Pridané do dopytu
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Pridať do dopytu
                </>
              )}
            </Button>
          </div>

        </aside>
      </section>
    </main>
  )
}
