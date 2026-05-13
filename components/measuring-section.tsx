"use client"

import Image from "next/image"

interface MeasuringSectionProps {
  onProductClick: (productId: "tn110" | "tn210") => void
}

export function MeasuringSection({ onProductClick }: MeasuringSectionProps) {
  return (
    <section
      id="meracia-technika"
      className="py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Produkty
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Meracia technika
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Ponúkame spoľahlivé riešenia pre presné meranie a štandardizáciu
            výrobných procesov. Produkty TN210 a TN110 pomáhajú zabezpečiť
            stabilnú kvalitu, opakovateľné výsledky a efektívnu kontrolu podľa
            požiadaviek zákazníka.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* TN-110 Card */}
          <button
            onClick={() => onProductClick("tn110")}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-amber-400 overflow-hidden text-left"
          >
            <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-amber-100 p-8">
              <Image
                src="/images/tn110-front.jpg"
                alt="TN-110 Skúšačka napätia"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded-full">
                TN-110
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-amber-50 to-white">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                TN-110 Skúšačka napätia
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Dvojpólové meranie napätia 110-400V AC/DC s LED indikáciou
                fázového napätia.
              </p>
              <div className="flex items-center gap-2 text-amber-600 font-medium">
                <span>Zobraziť detail</span>
                <svg
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* TN-210 Card */}
          <button
            onClick={() => onProductClick("tn210")}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-red-400 overflow-hidden text-left"
          >
            <div className="relative aspect-square bg-gradient-to-br from-red-50 to-red-100 p-8">
              <Image
                src="/images/tn210-front.jpg"
                alt="TN-210 (RCD) Skúšačka napätia"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                TN-210
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-red-50 to-white">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                TN-210 (RCD) Skúšačka napätia
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Dvojpólové meranie 12-690V AC/DC so skúškou prúdových chráničov
                RCD.
              </p>
              <div className="flex items-center gap-2 text-red-600 font-medium">
                <span>Zobraziť detail</span>
                <svg
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
