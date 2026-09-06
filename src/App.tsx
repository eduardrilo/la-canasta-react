import { useMemo, useState } from 'react'
import Button from './components/Button'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import { products } from './data/products'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) return products

    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(normalizedSearch),
    )
  }, [searchTerm])

  return (
    <div className="app-shell" id="inicio">
      <Header cartCount={cartCount} />

      <main>
        <section className="intro container" aria-labelledby="page-title">
          <p className="eyebrow">Productos seleccionados</p>
          <h1 id="page-title">Lo básico para tu despensa</h1>
          <p>
            Una selección pequeña de productos para el desayuno y la cocina.
          </p>
        </section>

        <section className="catalog container" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <h2 id="catalog-title">Productos</h2>
              <p>
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              </p>
            </div>

            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {filteredProducts.length > 0 ? (
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
