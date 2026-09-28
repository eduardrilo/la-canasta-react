import { useEffect, useMemo, useState } from 'react'
import Button from './components/Button'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/Footer'
import Header from './components/Header'
import Loader from './components/Loader'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import type { Product } from './types/Product'
import './App.css'

interface ProductsResponse {
  products: Product[]
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('https://dummyjson.com/products')

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de productos.')
      }

      const data: ProductsResponse = await response.json()
      setProducts(data.products)
    } catch {
      setError('No pudimos cargar los productos. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) return products

    return products.filter((product) =>
      `${product.title} ${product.category}`.toLowerCase().includes(normalizedSearch),
    )
  }, [products, searchTerm])

  return (
    <div className="app-shell" id="inicio">
      <Header cartCount={cartCount} />

      <main>
        <section className="intro container" aria-labelledby="page-title">
          <p className="eyebrow">Productos seleccionados</p>
          <h1 id="page-title">Encuentra lo que necesitas</h1>
          <p>Explora nuestro catálogo y busca productos por nombre o categoría.</p>
        </section>

        <section className="catalog container" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <h2 id="catalog-title">Productos</h2>
              {!loading && !error && (
                <p>
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1
                    ? 'producto encontrado'
                    : 'productos encontrados'}
                </p>
              )}
            </div>

            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchProducts} />
          ) : filteredProducts.length > 0 ? (
            <ProductList
              products={filteredProducts}
              onAddProduct={() => setCartCount((currentCount) => currentCount + 1)}
            />
          ) : (
            <div className="empty-state">
              <h3>No encontramos productos</h3>
              <p>Prueba con otro nombre o categoría.</p>
              <Button variant="secondary" onClick={() => setSearchTerm('')}>
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
