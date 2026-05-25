import { notFound } from 'next/navigation'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product] = await db.select().from(products).where(eq(products.id, Number(id))).limit(1)
  if (!product) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-body">Edit Product</h1>
        <p className="text-sm text-muted mt-0.5 truncate">{product.name}</p>
      </div>
      <ProductForm
        productId={product.id}
        initialData={{
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription ?? '',
          description: product.description ?? '',
          categoryId: product.categoryId ? String(product.categoryId) : '',
          amazonUrl: product.amazonUrl,
          affiliateTag: product.affiliateTag ?? 'benlanry-20',
          imageUrl: product.imageUrl ?? '',
          price: product.price ?? '',
          originalPrice: product.originalPrice ?? '',
          rating: product.rating ?? '',
          reviewCount: product.reviewCount ? String(product.reviewCount) : '',
          pros: product.pros as string[] ?? [],
          cons: product.cons as string[] ?? [],
          isBestPick: product.isBestPick ?? false,
          isDeal: product.isDeal ?? false,
          isActive: product.isActive ?? true,
          quickVerdict: product.quickVerdict ?? '',
          whoIsItFor: product.whoIsItFor ?? '',
          verdict: product.verdict ?? '',
          metaTitle: product.metaTitle ?? '',
          metaDescription: product.metaDescription ?? '',
        }}
      />
    </div>
  )
}
