"use client"

import Image from "next/image"
import { Mail, Phone, Globe, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="kontakt" className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.png"
              alt="3E-Vision"
              width={160}
              height={48}
              className="h-12 w-auto mb-6"
            />
            <p className="text-slate-400 mb-6 max-w-md text-pretty">
              Inžinierske riešenia pre váš úspech. Od konštrukcie jednoúčelových
              strojov cez robotické efektory až po presnú meraciu techniku.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.3e-vision.sk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sky-500/20 hover:bg-sky-500 flex items-center justify-center transition-colors"
              >
                <Globe className="h-5 w-5 text-sky-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:barna@3e-vision.sk"
                  className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Mail className="h-5 w-5 text-sky-400" />
                  barna@3e-vision.sk
                </a>
              </li>
              <li>
                <a
                  href="tel:+421911359771"
                  className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Phone className="h-5 w-5 text-emerald-400" />
                  +421 911 359 771
                </a>
              </li>
              <li>
                <a
                  href="https://www.3e-vision.sk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Globe className="h-5 w-5 text-violet-400" />
                  www.3e-vision.sk
                </a>
              </li>
            </ul>
          </div>

          {/* Company Details */}
          <div>
            <h3 className="text-lg font-bold mb-6">Spoločnosť</h3>
            <div className="space-y-2 text-slate-400">
              <p className="font-medium text-white">3E-Vision s.r.o.</p>
              <p>Ing. Jozef Barna, PhD.</p>
              <p className="flex items-start gap-2 mt-4">
                <MapPin className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>Smreková 3, 08 001 Prešov, Slovakia</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} 3E-Vision s.r.o. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  )
}
