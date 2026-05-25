import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-body">Add New Product</h1>
        <p className="text-sm text-muted mt-0.5">Fill in the details below. Required fields are marked *.</p>
      </div>
      <ProductForm />
    </div>
  )
}
