import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookies | 3E-Vision",
  description: "Informácie o používaní cookies a lokálneho úložiska.",
}

export default function CookiesPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-16">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm font-semibold text-amber-300 hover:text-amber-200"
          >
            Späť na úvod
          </Link>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-300">
            Nastavenia súkromia
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Cookies
          </h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            Stránka používa iba technicky potrebné ukladanie údajov pre
            fungovanie nezáväzného dopytu.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-slate-700">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Čo používame
            </h2>
            <p className="leading-7">
              Položky pridané do nezáväzného dopytu sa ukladajú v prehliadači
              cez <span className="font-semibold">localStorage</span> pod
              názvom <span className="font-semibold">3e-vision-cart</span>.
              Vďaka tomu zostanú položky v dopyte zachované počas prechádzania
              webom.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Čo nepoužívame
            </h2>
            <p className="leading-7">
              Web nepoužíva marketingové cookies, reklamné pixely ani analytiku,
              ktorá by sa spúšťala bez vášho súhlasu.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Ako údaje vymazať
            </h2>
            <p className="leading-7">
              Uložené položky sa vymažú po odoslaní dopytu alebo po odstránení
              položiek z dopytu. Môžete ich vymazať aj priamo v nastaveniach
              prehliadača vymazaním údajov webu.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Ochrana osobných údajov
            </h2>
            <p className="leading-7">
              Informácie o spracúvaní údajov z dopytového formulára nájdete na
              stránke{" "}
              <Link
                href="/ochrana-osobnych-udajov"
                className="font-semibold text-slate-950 underline underline-offset-4"
              >
                Ochrana osobných údajov
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
