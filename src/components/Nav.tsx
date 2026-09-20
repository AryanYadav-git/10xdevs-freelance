import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/content'
import './Nav.css'

export function Nav() {
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
      </div>
    </header>
  )
}
