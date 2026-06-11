import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './pages/Layout'
import PageAccueil from './pages/PageAccueil'
import PageDetailMedia from './pages/PageDetailMedia'
import PageRechercheFilm from './pages/PageRechercheFilm'
import PageRechercheSerie from './pages/PageRechercheSerie'

// Point d'entrée de l'application React.
// On crée ici les routes principales de l'application.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <PageAccueil /> },
      { path: '/recherche-films', element: <PageRechercheFilm /> },
      { path: '/recherche-series', element: <PageRechercheSerie /> },
      { path: '/film/:id', element: <PageDetailMedia type="movies" /> },
      { path: '/serie/:id', element: <PageDetailMedia type="tv" /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
