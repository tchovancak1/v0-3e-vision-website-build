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
  const displayedQuantity = inCart ? cartItem?.quantity ?? quantity : quantity

  const colorClasses =
      product.color === "amber"
          ? {
            accent: "text-slate-700",
            bg: "bg-slate-700",
            bgHover: "hover:bg-slate-800",
            ring: "ring-slate-200",
            softBg: "bg-slate-100",
          }
          : {
            accent: "text-red-600",
            bg: "bg-red-500",
            bgHover: "hover:bg-red-600",
            ring: "ring-red-100",
            softBg: "bg-red-50",
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
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Link
              href="/#meracia-technika"
              className={`inline-flex items-center gap-2 text-sm font-semibold ${colorClasses.accent} hover:underline`}
          >
            <ArrowLeft className="h-4 w-4" />
            Späť na meraciu techniku
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative mx-auto aspect-[4/3] max-h-[540px] w-full">
                  <Image
                      src={product.images[activeImageIndex]}
                      alt={`${product.name} fotografia ${activeImageIndex + 1}`}
                      fill
                      priority
                      className="object-contain p-6 sm:p-8"
                      sizes="(min-width: 1024px) 620px, 100vw"
                  />
                </div>
              </div>

              {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
                    {product.images.map((img, index) => (
                        <button
                            key={img}
                            type="button"
                            onClick={() => setActiveImageIndex(index)}
                            className={`relative aspect-square overflow-hidden rounded-xl border bg-white transition-all ${
                                activeImageIndex === index
                                    ? `border-slate-400 ring-4 ${colorClasses.ring}`
                                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                            }`}
                            aria-label={`Zobraziť fotografiu ${index + 1}`}
                        >
                          <Image
                              src={img}
                              alt=""
                              fill
                              className="object-contain p-2"
                              sizes="96px"
                          />
                        </button>
                    ))}
                  </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div
                    className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${colorClasses.softBg} ${colorClasses.accent}`}
                >
                  Meracia technika
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {product.name}
                </h1>

                <p className="mt-4 text-base leading-7 text-slate-700">
                  {product.shortDesc}
                </p>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  {showAddedFeedback && (
                      <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 shadow-sm animate-in fade-in slide-in-bottom-2 duration-300">
                        <CheckCircle className="h-5 w-5" />
                        Produkt bol pridaný do dopytu
                      </div>
                  )}

                  <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Počet kusov
                  </span>

                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                      <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleQuantityChange(displayedQuantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-12 text-center text-base font-bold text-slate-950">
                      {displayedQuantity}
                    </span>

                      <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleQuantityChange(displayedQuantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                      onClick={handleAddToCart}
                      size="lg"
                      className={`mt-5 h-12 w-full rounded-xl ${
                          inCart
                              ? "bg-green-500 hover:bg-green-600"
                              : `${colorClasses.bg} ${colorClasses.bgHover}`
                      } text-white shadow-sm transition-all ${
                          showAddedFeedback ? "cart-add-success" : ""
                      }`}
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
              </div>
            </aside>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Popis produktu
              </h2>

              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-8 text-slate-700">
                {product.description}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <button
                    type="button"
                    onClick={() => setActiveTab("params")}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-all ${
                        activeTab === "params"
                            ? "bg-white text-slate-950 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  Parametre
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("docs")}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-all ${
                        activeTab === "docs"
                            ? "bg-white text-slate-950 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <FileText className="h-4 w-4" />
                  Dokumenty
                </button>
              </div>

              {activeTab === "params" ? (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-slate-950">
                      Technické parametre
                    </h2>

                    <ul className="mt-4 space-y-3">
                      {product.features.map((feature) => (
                          <li
                              key={feature}
                              className="flex items-start gap-3 text-sm leading-6 text-slate-700"
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
                    <h2 className="text-xl font-bold text-slate-950">
                      Dokumenty na stiahnutie
                    </h2>

                    <div className="mt-4 space-y-3">
                      {product.documents.map((doc) => (
                          <a
                              key={doc.url}
                              href={doc.url}
                              download={doc.filename}
                              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
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
            </section>
          </div>
        </section>
      </main>
  )
}
