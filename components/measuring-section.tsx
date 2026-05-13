"use client"

import Image from "next/image"
import Link from "next/link"

export function MeasuringSection() {
  return (
    <section
      id="meracia-technika"
      className="py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-4">
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
          <Link
            href="/meracia-technika/tn-110"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 hover:border-slate-300 overflow-hidden text-left"
          >
            <div className="relative aspect-square bg-slate-50 p-8">
              <Image
                src="/images/tn110-front.jpg"
                alt="TN-110 Skúšačka napätia"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900 text-white text-sm font-bold rounded-full">
                TN-110
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                TN-110 Skúšačka napätia
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Dvojpólové meranie napätia 110-400V AC/DC s LED indikáciou
                fázového napätia.
              </p>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
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
          </Link>

          {/* TN-210 Card */}
          <Link
            href="/meracia-technika/tn-210"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 hover:border-slate-300 overflow-hidden text-left"
          >
            <div className="relative aspect-square bg-slate-50 p-8">
              <Image
                src="/images/tn210-front.jpg"
                alt="TN-210 (RCD) Skúšačka napätia"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900 text-white text-sm font-bold rounded-full">
                TN-210
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                TN-210 (RCD) Skúšačka napätia
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Dvojpólové meranie 12-690V AC/DC so skúškou prúdových chráničov
                RCD.
              </p>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
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
          </Link>
        </div>
      </div>
    </section>
  )
}
