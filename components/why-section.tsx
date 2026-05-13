"use client"

import { Shield, Clock, Lightbulb, Users } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Šetríme váš čas",
    description: "Rýchle a efektívne riešenia bez zbytočných prieťahov.",
  },
  {
    icon: Shield,
    title: "Eliminujeme riziká",
    description: "Overené postupy a skúsenosti z praxe.",
  },
  {
    icon: Lightbulb,
    title: "Teoretické výpočty",
    description: "Presné analýzy a simulácie pred realizáciou.",
  },
  {
    icon: Users,
    title: "Praktické skúsenosti",
    description: "Roky skúseností s reálnymi výrobnými procesmi.",
  },
]

export function WhySection() {
  return (
    <section id="preco-3e" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Prečo <span className="text-amber-500">3E-VISION</span>?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Ponúkame vám partnerstvo, ktoré šetrí váš čas a eliminuje technické
            riziká. Vďaka spojeniu teoretických výpočtov a praktických
            skúseností s výrobou dodávame riešenia, ktoré v praxi skutočne
            fungujú.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
