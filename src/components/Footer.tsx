import Link from 'next/link'
import { navLinks, site } from '@/data/content'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__lead">
          <p className="footer__brand">{site.name}</p>
          <p className="footer__tagline">{site.tagline}</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href={site.meetingUrl}>{site.ctaLabel}</Link>
        </nav>

        <p className="footer__copy">
          © {year} {site.name}. Website design and e-commerce for ambitious brands.
        </p>
      </div>
    </footer>
  )
}
