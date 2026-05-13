"use client"

import {
  Wrench,
  Zap,
  CheckCircle,
  ShoppingCart,
  Settings,
  TestTube,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

const benefits = [
  {
    icon: Settings,
    color: "from-sky-400 to-sky-500",
    title: "Návrh na mieru",
    description:
      "Každý efektor vyvíjame podľa konkrétnej aplikácie, typu výrobku a prostredia.",
  },
  {
    icon: TestTube,
    color: "from-emerald-400 to-emerald-500",
    title: "Testovanie na vašom produkte",
    description:
      "Riešenie testujeme priamo na zákazníkovom produkte a ladíme jeho funkčnosť.",
  },
  {
    icon: Package,
    color: "from-violet-400 to-violet-500",
    title: "Kompletné dodanie",
    description:
      "Od návrhu cez výrobu až po nasadenie - všetko pod jednou strechou.",
  },
]

const capabilities = [
  "Manipulácia a uchopovanie",
  "Zakladanie a odoberanie",
  "Kontrola kvality",
  "Značenie produktov",
  "Špeciálne technologické operácie",
]

export function EffectorsSection() {
  const { addItem, removeItem, isInCart } = useCart()
  const serviceId = "efektory"
  const inCart = isInCart(serviceId)

  const handleToggleCart = () => {
    if (inCart) {
      removeItem(serviceId)
    } else {
      addItem({
        id: serviceId,
        name: "Vývoj a realizácia efektorov na mieru",
        type: "service",
        description:
          "Návrh, výroba a testovanie robotických efektorov pre vašu aplikáciu",
      })
    }
  }

  return (
    <section id="efektory" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              Robotika
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Vývoj a realizácia efektorov na mieru
            </h2>
            <p className="text-slate-300 text-lg mb-6 text-pretty">
              V 3E-vision navrhujeme a vyrábame efektory, ktoré premieňajú
              robotické a automatizačné systémy na presné, spoľahlivé a
              efektívne riešenia pre prax.
            </p>
            <p className="text-slate-300 mb-6 text-pretty">
              Naším cieľom je dodať zákazníkovi riešenie, ktoré nielen funguje,
              ale zároveň zvyšuje produktivitu, presnosť a bezpečnosť výroby. Od
              prvotného návrhu cez konštrukciu, výrobu a testovanie až po
              nasadenie do prevádzky zabezpečujeme celý proces pod jednou
              strechou.
            </p>
            <p className="text-slate-300 mb-8 text-pretty">
              Zákazník tak získava odskúšaný a vyladený efektor, nie iba
              teoretický návrh. S 3E-vision získate partnera, ktorý rozumie
              technológii aj výrobe.
            </p>

            <Button
              onClick={handleToggleCart}
              size="lg"
              className={`${
                inCart
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-amber-500 hover:bg-amber-600"
              } text-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105`}
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

          <div className="space-y-6">
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-cyan-400" />
                Vyvíjame efektory pre:
              </h3>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((cap, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
