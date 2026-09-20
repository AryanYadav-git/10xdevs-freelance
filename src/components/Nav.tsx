import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/content'
import './Nav.css'

type NavProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  return (
    <header className="nav">
      <div className="nav__inner container">
        <Link className="nav__brand" to="/" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav__theme"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <span className="nav__theme-track" aria-hidden="true">
            <span className={`nav__theme-thumb ${theme === 'dark' ? 'is-dark' : ''}`} />
          </span>
          <span className="nav__theme-label">{theme === 'light' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  )
}
