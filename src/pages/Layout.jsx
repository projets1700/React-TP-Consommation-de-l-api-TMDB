import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

// Ce composant sert de structure globale pour toutes les pages.
// Il affiche toujours le Header, puis la page courante via <Outlet />.
function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
