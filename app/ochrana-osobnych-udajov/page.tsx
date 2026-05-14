import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | 3E-Vision",
  description:
    "Informácie o spracúvaní osobných údajov na webovej stránke 3E-Vision.",
}

const updatedAt = "14. mája 2026"

export default function PrivacyPolicyPage() {
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
            GDPR
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Ochrana osobných údajov
          </h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            Tieto informácie vysvetľujú, aké osobné údaje spracúvame pri
            používaní webovej stránky a pri odoslaní nezáväzného dopytu.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-10 text-slate-700">
          <PolicySection title="Prevádzkovateľ">
            <p>
              Prevádzkovateľom osobných údajov je 3E-VISION s. r. o., Smreková
              3, 080 01 Prešov, Slovenská republika, IČO: 52 802 493, DIČ:
              2121138151, IČ DPH: SK2121138151.
            </p>
            <p>
              Kontakt pre otázky k ochrane osobných údajov:{" "}
              <a
                href="mailto:barna@3e-vision.sk"
                className="font-semibold text-slate-950 underline underline-offset-4"
              >
                barna@3e-vision.sk
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="Údaje z dopytového formulára">
            <p>
              Pri odoslaní nezáväzného dopytu spracúvame meno a priezvisko,
              e-mail, voliteľne telefón, názov spoločnosti, obsah správy a
              položky pridané do dopytu.
            </p>
            <p>
              Účelom spracúvania je vybavenie dopytu, spätné kontaktovanie a
              príprava obchodnej komunikácie alebo ponuky. Právnym základom je
              vykonanie opatrení pred uzatvorením zmluvy podľa čl. 6 ods. 1
              písm. b) GDPR, prípadne oprávnený záujem na evidencii obchodnej
              komunikácie podľa čl. 6 ods. 1 písm. f) GDPR.
            </p>
          </PolicySection>

          <PolicySection title="Príjemcovia a služby">
            <p>
              Dopyt sa odosiela e-mailom na kontaktnú adresu spoločnosti.
              Technickým sprostredkovateľom odoslania e-mailu je služba Resend.
              Web je nasadený prostredníctvom služby Vercel, ktorá ako
              hostingový poskytovateľ môže spracúvať technické údaje potrebné
              na doručenie stránky, prevádzku, bezpečnosť a riešenie
              incidentov.
            </p>
            <p>
              Pri používaní služieb Vercel a Resend môže dochádzať k
              spracúvaniu alebo prenosu údajov mimo EÚ/EHP. V takom prípade sa
              používajú zmluvné a technické záruky dostupné u daného
              poskytovateľa, najmä zmluva o spracúvaní osobných údajov a
              štandardné zmluvné doložky, ak sú potrebné. Osobné údaje
              neposkytujeme na marketing tretím stranám a nepredávame ich.
            </p>
          </PolicySection>

          <PolicySection title="Technické prevádzkové údaje">
            <p>
              Pri návšteve webu môžu byť v serverových a bezpečnostných logoch
              spracúvané technické údaje, najmä IP adresa, dátum a čas prístupu,
              požadovaná URL, typ prehliadača a informácia o chybe. Účelom je
              bezpečná prevádzka webu, odhaľovanie zneužitia a riešenie
              technických incidentov. Právnym základom je oprávnený záujem podľa
              čl. 6 ods. 1 písm. f) GDPR.
            </p>
          </PolicySection>

          <PolicySection title="Doba uchovávania">
            <p>
              Údaje z dopytu uchovávame najviac 12 mesiacov od poslednej
              komunikácie, ak sa z dopytu nestane objednávka alebo zmluvný
              vzťah. Ak vznikne zmluvný alebo účtovný vzťah, príslušné doklady
              uchovávame počas zákonných lehôt.
            </p>
          </PolicySection>

          <PolicySection title="Cookies a lokálne úložisko">
            <p>
              Web nepoužíva marketingové cookies. Položky nezáväzného dopytu sa
              ukladajú do lokálneho úložiska prehliadača, aby sa dopyt nestratil
              pri prechádzaní stránkou. Ide o funkčné uloženie vo vašom
              zariadení a môžete ho kedykoľvek vymazať v prehliadači alebo
              odoslaním/vyprázdnením dopytu.
            </p>
            <p>
              Podrobnosti sú uvedené na stránke{" "}
              <Link
                href="/cookies"
                className="font-semibold text-slate-950 underline underline-offset-4"
              >
                Cookies
              </Link>
              .
            </p>
          </PolicySection>

          <PolicySection title="Vaše práva">
            <p>
              Máte právo požiadať o prístup k údajom, opravu, vymazanie,
              obmedzenie spracúvania, prenosnosť údajov a namietať proti
              spracúvaniu založenému na oprávnenom záujme. Svoje práva môžete
              uplatniť e-mailom na barna@3e-vision.sk.
            </p>
            <p>
              Ak sa domnievate, že spracúvanie nie je v poriadku, môžete podať
              návrh alebo sťažnosť Úradu na ochranu osobných údajov Slovenskej
              republiky, Hraničná 12, 820 07 Bratislava 27, Slovenská republika,
              alebo prostredníctvom webu www.dataprotection.gov.sk.
            </p>
          </PolicySection>

          <PolicySection title="Aktualizácia">
            <p>Posledná aktualizácia: {updatedAt}.</p>
          </PolicySection>
        </div>
      </section>
    </main>
  )
}

function PolicySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="space-y-3 leading-7">{children}</div>
    </section>
  )
}
