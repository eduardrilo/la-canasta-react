interface HeaderProps {
  cartCount: number
}

function Header({ cartCount }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="brand" href="#inicio" aria-label="Ir al inicio de La Canasta">
          <span className="brand-mark" aria-hidden="true">
            LC
          </span>
          <span>
            <strong>La Canasta</strong>
            <small>Almacén de barrio</small>
          </span>
        </a>

        <div className="cart-summary" aria-live="polite">
          Carrito: <strong>{cartCount}</strong>
        </div>
      </div>
    </header>
  )
}

export default Header
