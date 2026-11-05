import Link from 'next/link'
import { hero, site } from '@/data/content'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__plane" aria-hidden="true">
        <img
          className="hero__image"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fetchPriority="high"
        />
        <div className="hero__veil" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow reveal">{hero.headline}</p>

        <h1 id="hero-title" className="hero__title reveal reveal-delay-1">
          {site.name}
          <span className="sr-only"> | Website Design &amp; E-commerce Agency</span>
        </h1>

        <div className="hero__row">
          <p className="hero__lede reveal reveal-delay-2">{hero.subheading}</p>
          <div className="hero__actions reveal reveal-delay-3">
            <Link className="btn btn-primary btn-lg btn-arrow" href={site.meetingUrl}>
              {hero.primaryCta}
            </Link>
            <a className="btn btn-ghost btn-lg hero__ghost" href="/#work">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
