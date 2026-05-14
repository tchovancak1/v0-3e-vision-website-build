import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/cart-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "3E-Vision | Inžinierske riešenia pre váš úspech",
  description:
    "Od konštrukcie jednoúčelových strojov cez robotické efektory až po presnú meraciu techniku. Komplexné riešenia pod jednou strechou.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "3E-Vision",
    "konštrukcia strojov",
    "robotické efektory",
    "meracia technika",
    "TN-110",
    "TN-210",
    "skúšačka napätia",
    "Slovensko",
  ],
  authors: [{ name: "3E-Vision s.r.o." }],
  creator: "3E-Vision s.r.o.",
  openGraph: {
    title: "3E-Vision | Inžinierske riešenia pre váš úspech",
    description:
      "Od konštrukcie jednoúčelových strojov cez robotické efektory až po presnú meraciu techniku.",
    url: "https://www.3e-vision.sk",
    siteName: "3E-Vision",
    locale: "sk_SK",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f59e0b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk" className="scroll-smooth bg-white">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <CartProvider>{children}</CartProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
