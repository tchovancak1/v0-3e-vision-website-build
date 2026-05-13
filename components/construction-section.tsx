"use client"

import {
  Target,
  Box,
  FileText,
  Cog,
  BookOpen,
  Factory,
  CheckCircle,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

const steps = [
  {
    number: "1",
    icon: Target,
    iconColor: "text-sky-500",
    title: "Definícia cieľov a technická realizovateľnosť",
    description:
      "Úspech projektu začína presným zadaním. Spoločne zadefinujeme vaše požiadavky a v prípade potreby vypracujeme:",
    points: [
      "Štúdiu technickej uskutočniteľnosti a realizovateľnosti",
      "Detailný prieskum trhu",
      "Základné technické rámce pre vývojový proces",
    ],
  },
  {
    number: "2",
    icon: Box,
    iconColor: "text-violet-500",
    title: "3D Modelovanie a pokročilé pevnostné analýzy",
    description:
      "Navrhujeme produkty, ktoré sú bezpečné a efektívne. Vytvoríme pre vás:",
    points: [
      "Profesionálny 3D CAD model zariadenia",
      "Komplexné výpočty a analýzy MKP/FEM (metóda konečných prvkov)",
      "Samostatné pevnostné posúdenia podľa individuálnych potrieb",
    ],
  },
  {
    number: "3",
    icon: FileText,
    iconColor: "text-emerald-500",
    title: "Precízna výkresová dokumentácia",
    description:
      "Náš konštrukčný tím spracuje kompletné podklady v špičkových softvéroch CREO 5. Výsledkom je bezchybná technická dokumentácia pripravená priamo pre výrobu.",
    points: [],
  },
  {
    number: "4",
    icon: Cog,
    iconColor: "text-amber-500",
    title: "Prototypovanie a testovanie",
    description:
      "Prevedieme váš projekt z virtuálneho sveta do reality. Zabezpečíme:",
    points: [
      "Výrobu funkčného modelu alebo prototypu na kľúč",
      "Dôsledné testovanie a overenie zhody so zadanými technickými parametrami",
    ],
  },
  {
    number: "5",
    icon: BookOpen,
    iconColor: "text-rose-500",
    title: "Komplexná sprievodná dokumentácia",
    description:
      "Garantujeme plynulý priebeh výrobného procesu vďaka príprave všetkých potrebných podkladov:",
    points: [
      "Návody na obsluhu a údržbu",
      "Katalógy náhradných dielov",
      "Individuálna dokumentácia podľa špecifických požiadaviek klienta",
    ],
  },
  {
    number: "6",
    icon: Factory,
    iconColor: "text-cyan-500",
    title: "Odborná asistencia pri nábehu výroby",
    description:
      "Výroba vyžaduje synergiu mnohých činností. Poskytneme vám technickú podporu pri:",
    points: [
      "Zavádzaní produktu do sériovej výroby",
      "Dohľade nad dodržiavaním noriem, kvality a bezpečnosti",
      "Homologizácii v štátnej skúšobni a certifikačných procesoch",
    ],
  },
]

export function ConstructionSection() {
  const { addItem, removeItem, isInCart } = useCart()
  const serviceId = "konstrukcia-komplet"
  const inCart = isInCart(serviceId)

  const handleToggleCart = () => {
    if (inCart) {
      removeItem(serviceId)
    } else {
      addItem({
        id: serviceId,
        name: "Kompletné zastrešenie projektu",
        type: "service",
        description:
          "Konštrukcia a vývoj jednoúčelových strojov - od idey až po finálnu realizáciu",
      })
    }
  }

  return (
    <section
      id="konstrukcia"
      className="py-20 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Služby
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Kompletné zastrešenie vášho projektu
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Preberáme plnú zodpovednosť za váš projekt – od prvotnej idey až po
            finálnu realizáciu. Vďaka dlhoročným skúsenostiam v oblasti
            projektovania, konštrukcie a pevnostných výpočtov dodávame komplexné
            riešenia s dôrazom na rýchlosť, precíznosť a odbornú kvalitu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:border-amber-200 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <step.icon className={`h-8 w-8 ${step.iconColor} mt-2`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm mb-3">{step.description}</p>
              {step.points.length > 0 && (
                <ul className="space-y-2">
                  {step.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
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
          <p className="text-sm text-slate-500 mt-3">
            Kliknutím pridáte celú službu do nezáväzného dopytu
          </p>
        </div>
      </div>
    </section>
  )
}
