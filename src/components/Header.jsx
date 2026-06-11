import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header-bar">
      <Link to="/" className="brand-link">
        <span className="brand-cine">CINE</span><span className="brand-scape">SCAPE</span>
      </Link>
      <nav className="nav-row">
        <ul className="nav-list">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/recherche-films">Films</Link></li>
          <li><Link to="/recherche-series">Séries</Link></li>
          <li><Link to="/favoris">Favoris</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
