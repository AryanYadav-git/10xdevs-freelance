import Link from 'next/link'
import { navLinks, site } from '@/data/content'
import './Nav.css'

export function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner container">
        <Link className="nav__brand" href="/" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="nav__cta" href={site.meetingUrl}>
          {site.ctaLabel}
        </Link>
      </div>
    </header>
  )
}
