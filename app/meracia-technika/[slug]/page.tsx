import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductPageShell } from "@/components/product-page-shell"
import { products, productsBySlug } from "@/lib/products"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return Object.values(products).map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = productsBySlug[slug]

  if (!product) {
    return {}
  }

  return {
    title: `${product.name} | 3E-Vision`,
    description: product.shortDesc,
    openGraph: {
      title: `${product.name} | 3E-Vision`,
      description: product.shortDesc,
      images: [product.images[0]],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = productsBySlug[slug]

  if (!product) {
    notFound()
  }

  return <ProductPageShell product={product} />
}
