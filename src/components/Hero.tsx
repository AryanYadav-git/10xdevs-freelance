import Link from 'next/link'
import { site } from '@/data/content'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero__plane" aria-hidden="true">
        <img
          className="hero__image"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          alt=""
        />
        <div className="hero__veil" />
      </div>

      <div className="hero__content container">
        <a className="hero__announce reveal" href="/#services">
          <span className="hero__announce-label">Introducing Support for AI</span>
          <span className="hero__announce-divider" aria-hidden="true" />
          <span className="hero__announce-action" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.5 8h9M8.5 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>

        <h1 id="hero-brand" className="hero__brand reveal reveal-delay-1">
          {site.name}
        </h1>
        <p className="hero__tagline reveal reveal-delay-2">
          Launch your Website In Days, Not Months.
        </p>
        <p className="hero__lede reveal reveal-delay-3">
          Build & Launch Website and That Actually Make Money
        </p>
        <div className="hero__actions reveal reveal-delay-3">
          <Link className="btn btn-primary" href={site.meetingUrl}>
            Schedule a meeting
          </Link>
          <a className="btn btn-ghost hero__ghost" href="/#work">
            View selected work
          </a>
        </div>
      </div>
    </section>
  )
}
