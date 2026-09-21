import { site } from '@/data/content'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">{site.name}</p>
        <p className="footer__copy">
          © {year} · Full-stack product agency for websites, commerce, and custom apps
        </p>
      </div>
    </footer>
  )
}
