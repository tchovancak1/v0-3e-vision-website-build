export type ProductId = "tn110" | "tn210"
export type ProductColor = "amber" | "red"

export interface ProductDocument {
  name: string
  filename: string
  url: string
}

export interface Product {
  id: ProductId
  slug: string
  name: string
  shortDesc: string
  description: string
  features: string[]
  images: string[]
  documents: ProductDocument[]
  color: ProductColor
}

export const products: Record<ProductId, Product> = {
  tn110: {
    id: "tn110",
    slug: "tn-110",
    name: "TN-110 Skúšačka napätia",
    shortDesc:
      "Skúšačka TN-110 je určená k dvojpólovému meraniu veľkosti jednosmerného a striedavého napätia od 110 do 400V.",
    description: `Skúšačka TN-110 je určená k dvojpólovému meraniu veľkosti jednosmerného a striedavého napätia od 110 do 400V s frekvenciou 0-60 Hz, na určenie fázového vodiča, poradia fáz trojfázovej sústavy s nulovým vodičom a určenie polarity jednosmerného napätia.

Skúšačka vyhovuje norme EN61243-3:2014, v rozsahu 110-400V/ CAT III 400V, so stupňom ochrany IP40.

S touto skúšačkou môžete vykonávať meranie v elektrických inštaláciách a zariadeniach, ktoré zodpovedajú prepäťovej kategórii CATIII 400V.`,
    features: [
      "LED indikácia fázového napätia",
      "Podsvietený indikátor napätia",
      "Snímateľný držiak pohyblivého hrotu",
      "Rozsah: 110-400V AC/DC",
      "Kategória: CAT III 400V",
      "Stupeň ochrany: IP40",
      "Pracovná teplota: -10°C až +50°C",
    ],
    images: [
      "/images/tn-110/110_Front_hi_DSC07865.jpg",
      "/images/tn-110/110_Back_hi_DSC07871.jpg",
      "/images/tn-110/110_hi_DSC07879.jpg",
      "/images/tn-110/110_hi_DSC07880.jpg",
      "/images/tn-110/110_hi_DSC07884.jpg",
      "/images/tn-110/110_hi_DSC07899.jpg",
      "/images/tn-110/110_hi_DSC07903.jpg",
    ],
    documents: [
      {
        name: "TN-110 Technická dokumentácia",
        filename: "TN-110.pdf",
        url: "/docs/TN-110.pdf",
      },
      {
        name: "TN-110 CE certifikát",
        filename: "2026-CE-TN110.pdf",
        url: "/docs/2026-CE-TN110.pdf",
      },
    ],
    color: "amber",
  },
  tn210: {
    id: "tn210",
    slug: "tn-210",
    name: "TN-210 (RCD) Skúšačka napätia",
    shortDesc:
      "Skúšačka TN-210 (RCD) je určená ku dvojpólovému meraniu veľkosti jednosmerného a striedavého napätia od 12V do 690V.",
    description: `Skúšačka TN-210 (RCD) je určená ku dvojpólovému meraniu veľkosti jednosmerného a striedavého napätia od 12 V do 690 V s frekvenciou 0-60Hz, na určenie fázového vodiča, poradia fáz trojfázovej sústavy s nulovým vodičom, určenie polarity jednosmerného napätia, testovanie kontinuity.

Skúšačka vyhovuje norme EN 61243-3:2015. S touto skúšačkou môžete vykonávať meranie v elektrických inštaláciách a zariadeniach, ktoré zodpovedajú prepäťovej kategórii CATIII 690V.

Kategória CATIII je určená na meranie obvodov z vybavenia napájaného pevnou inštaláciou, ako relé, zásuvky, rozvodné panely, napájacie a krátke vetviace obvody a osvetľovacie systémy vo veľkých budovách.`,
    features: [
      "LED indikácia fázového napätia aj bez batérie",
      "Skúška prúdových chráničov (RCD) aj bez batérie",
      "Malý prúd Is (1.85mA pri 230V, 3.28mA pri 400V)",
      "Odnímateľný držiak pohyblivého hrotu",
      "Dvojtónová signalizácia počas merania",
      "Rozsah: 12-690V AC/DC",
      "Kategória: CAT III 690V",
      "Stupeň ochrany: IP40",
    ],
    images: [
      "/images/tn-210/210_Front_hi_DSC07861.jpg",
      "/images/tn-210/210_Back_hi_DSC07864.jpg",
      "/images/tn-210/210_hi_DSC07887.jpg",
      "/images/tn-210/210_hi_DSC07889.jpg",
      "/images/tn-210/210_hi_DSC07890.jpg",
      "/images/tn-210/210_hi_DSC07897.jpg",
      "/images/tn-210/210_hi_DSC07906.jpg",
    ],
    documents: [
      {
        name: "TN-210 (RCD) Technická dokumentácia",
        filename: "TN-210_RCD.pdf",
        url: "/docs/TN-210_RCD.pdf",
      },
      {
        name: "TN-210 (RCD) CE certifikát",
        filename: "2026-CE-TN210(RCD).pdf",
        url: "/docs/2026-CE-TN210(RCD).pdf",
      },
    ],
    color: "red",
  },
}

export const productsBySlug = Object.fromEntries(
  Object.values(products).map((product) => [product.slug, product])
) as Record<string, Product>
