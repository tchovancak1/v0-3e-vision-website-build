"use client"

import { Download, FileText } from "lucide-react"
import { products } from "@/lib/products"

const documents = Object.values(products).flatMap((product) =>
  product.documents.map((document) => ({
    ...document,
    productName: product.name,
  }))
)

export function DocumentsSection() {
  return (
    <section id="dokumenty" className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-1 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
            Na stiahnutie
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Dokumenty na stiahnutie
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 text-pretty">
            Technická dokumentácia a certifikáty pre meraciu techniku TN-110 a TN-210.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {documents.map((document) => (
            <a
              key={`${document.productName}-${document.filename}`}
              href={document.url}
              download={document.filename}
              className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900">
                <FileText className="h-6 w-6 text-white" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900 group-hover:underline">
                  {document.name}
                </span>
                <span className="mt-1 block truncate text-sm text-slate-500">
                  {document.productName}
                </span>
                <span className="mt-1 block truncate text-xs text-slate-400">
                  {document.filename}
                </span>
              </span>
              <Download className="h-5 w-5 flex-shrink-0 text-slate-500 transition-colors group-hover:text-slate-900" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
