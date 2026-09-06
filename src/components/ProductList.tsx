import type { Product } from '../types/Product'
import ProductCard from './ProductCard'

interface ProductListProps {
  products: Product[]
  onAddProduct: () => void
}

function ProductList({ products, onAddProduct }: ProductListProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAddProduct} />
      ))}
    </div>
  )
}

export default ProductList
