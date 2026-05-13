"use client"

import { useState } from "react"
import { X, Minus, Plus, Trash2, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        clearCart()
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
        setTimeout(() => {
          setIsSuccess(false)
          setShowForm(false)
          onClose()
        }, 3000)
      } else {
        const data = await response.json().catch(() => null)
        setSubmitError(
          data?.error || "Dopyt sa nepodarilo odoslať. Skúste to prosím neskôr."
        )
      }
    } catch (error) {
      console.error("Error sending inquiry:", error)
      setSubmitError("Dopyt sa nepodarilo odoslať. Skontrolujte pripojenie a skúste to znova.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white shadow-xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-amber-500 to-amber-600">
          <h2 className="text-xl font-bold text-white">Nezáväzný dopyt</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Dopyt bol odoslaný!
              </h3>
              <p className="text-slate-600">
                Ďakujeme za váš záujem. Ozveme sa vám čo najskôr.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <ShoppingCartIcon className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Váš dopyt je prázdny
              </h3>
              <p className="text-slate-600 text-sm">
                Pridajte položky kliknutím na tlačidlo &quot;Pridať do dopytu&quot;
              </p>
            </div>
          ) : showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Meno a priezvisko *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ján Novák"
                  className="border-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  E-mail *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="jan.novak@email.sk"
                  className="border-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Telefón
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+421 900 000 000"
                  className="border-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Spoločnosť
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Názov spoločnosti"
                  className="border-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Správa
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Vaša správa alebo požiadavky..."
                  rows={4}
                  className="border-slate-300"
                />
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Položky v dopyte:
                </h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  {items.map((item) => (
                    <li key={item.id}>
                      {item.name}
                      {item.type === "product" && item.quantity
                        ? ` (${item.quantity} ks)`
                        : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm text-slate-600 mt-1">
                        {item.description}
                      </p>
                    )}
                    {item.type === "product" && (
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity || 1}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-slate-500 ml-2">ks</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isSuccess && items.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            {showForm ? (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Späť
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Odosielam...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Odoslať dopyt
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              >
                Pokračovať k dopytu
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  )
}
