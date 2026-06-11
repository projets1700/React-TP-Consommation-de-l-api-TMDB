import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import './index.css'

function HomePage() {
  return (
    <main className="page">
      <p className="eyebrow">Étape 1 — base de l’interface</p>
      <h1>TMDB Explorer</h1>
      <p className="lead">Commencez par choisir la catégorie que vous souhaitez explorer.</p>

      <section className="card-grid">
        <Link className="choice-card" to="/recherche/films">
          <span>🎬</span>
          <strong>Recherche de films</strong>
          <small>Entrer une requête et afficher les résultats.</small>
        </Link>

        <Link className="choice-card" to="/recherche/series">
          <span>📺</span>
          <strong>Recherche de séries</strong>
          <small>Préparer la même logique pour les séries.</small>
        </Link>
      </section>
    </main>
  )
}

function SearchPage() {
  const { mediaType } = useParams()
  const label = mediaType === 'films' ? 'films' : 'séries'

  return (
    <main className="page">
      <Link className="back-link" to="/">← Retour à l’accueil</Link>

      <h1>Recherche de {label}</h1>
      <p className="lead">Cette page sera branchée à l’API TMDB dans la prochaine étape.</p>

      <section className="search-panel">
        <label className="search-label" htmlFor="query">Rechercher un {label.slice(0, -1)}</label>
        <div className="search-row">
          <input id="query" type="search" placeholder={`Tapez un titre de ${label.slice(0, -1)}...`} />
          <button type="button">Chercher</button>
        </div>
      </section>

      <section className="placeholder-box">
        <h2>Résultats à venir</h2>
        <p>Nous afficherons ici les cartes, le chargement et les messages “aucun résultat”.</p>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recherche/:mediaType" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
