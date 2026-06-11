import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

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
