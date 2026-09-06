import { useState } from 'react'
import type { Product } from '../types/Product'
import Button from './Button'

interface ProductCardProps {
  product: Product
  onAdd: () => void
}

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function ProductCard({ product, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (added) return

    setAdded(true)
    onAdd()
  }

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />

      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-card__price">{priceFormatter.format(product.price)}</p>

        <Button onClick={handleAdd} disabled={added}>
          {added ? 'Agregado' : 'Agregar al carrito'}
        </Button>
      </div>
    </article>
  )
}

export default ProductCard
