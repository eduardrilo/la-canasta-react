function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <p>Cargando productos...</p>
    </div>
  )
}

export default Loader
