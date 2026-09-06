interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="product-search">Buscar productos</label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ejemplo: café o desayuno"
      />
    </div>
  )
}

export default SearchBar
