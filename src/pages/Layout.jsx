import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

// Ce composant sert de structure globale pour toutes les pages.
// Il affiche toujours le Header, puis la page courante via <Outlet />.
function Layout() {
  const [theme, setTheme] = useState('theme-gris')

  const cycleTheme = () => {
    const themes = ['theme-gris', 'theme-lune']
    setTheme((current) => {
      const index = themes.indexOf(current)
      return themes[(index + 1) % themes.length]
    })
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Header onToggleTheme={cycleTheme} themeLabel={theme.replace('theme-', '')} />
      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
