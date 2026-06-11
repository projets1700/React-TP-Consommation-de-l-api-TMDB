function SearchPanel({ id, placeholder, value, onChange, onSearch }) {
  return (
    <section className="search-panel">
      <label className="search-label" htmlFor={id}>Votre recherche</label>
      <div className="search-row">
        <input
          id={id}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button type="button" onClick={onSearch}>Chercher</button>
      </div>
    </section>
  )
}

export default SearchPanel
