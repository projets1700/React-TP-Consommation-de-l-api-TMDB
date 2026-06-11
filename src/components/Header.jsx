import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header-bar${scrolled ? ' header-scrolled' : ''}`}>
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
