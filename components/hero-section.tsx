"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

const heroImages = [
  "/homepage/magnific_imagereference-img1-task-_2932586813.png",
  "/homepage/magnific_imagereference-img1-task-_2932516219.png",
  "/homepage/magnific_imagereference-img1-task-_2932479128.png",
  "/homepage/magnific_imagereference-img1-task-_2932407658.png",
]

export function HeroSection() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length)
    }, 6500)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt=""
            fill
            className={`hero-background-slide object-cover ${
              index === activeImage ? "is-active" : ""
            }`}
            priority={index === 0}
            sizes="100vw"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            Inžinierske riešenia
            <span className="block text-amber-400">pre váš úspech</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto text-pretty">
            Od konštrukcie jednoúčelových strojov cez robotické efektory až po
            presnú meraciu techniku. Komplexné riešenia pod jednou strechou.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#konstrukcia"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg"
            >
              Naše služby
            </a>
            <a
              href="/#kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all border border-white/30"
            >
              Kontaktujte nás
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="/#preco-3e"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
      >
        <ChevronDown className="h-10 w-10 text-white/80" />
      </a>
    </section>
  )
}
