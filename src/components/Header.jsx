import { Link } from 'react-router-dom'

// Barre de navigation principale du site.
// Elle permet d'aller vers l'accueil, les films et les séries.
function Header({ onToggleTheme }) {
  return (
    <header className="header-bar">
      <Link to="/" className="brand-link">TMDB Explorer</Link>
      <nav className="nav-row">
        <ul className="nav-list">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/recherche-films">Films</Link></li>
          <li><Link to="/recherche-series">Séries</Link></li>
          <li><Link to="/favoris">Favoris</Link></li>
        </ul>
        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          Thème
        </button>
      </nav>
    </header>
  )
}

export default Header
