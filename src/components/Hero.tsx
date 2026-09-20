import { site } from '../data/content'
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
        <p className="hero__role reveal">{site.role}</p>
        <h1 id="hero-brand" className="hero__brand reveal reveal-delay-1">
          {site.name}
        </h1>
        <p className="hero__lede reveal reveal-delay-2">
          I build brand sites, ecommerce platforms, headless WordPress frontends,
          and custom web apps — end to end, with craft that holds up in production.
        </p>
        <div className="hero__actions reveal reveal-delay-3">
          <a className="btn btn-primary" href={site.meetingUrl} target="_blank" rel="noreferrer">
            Schedule a meeting
          </a>
          <a className="btn btn-ghost hero__ghost" href="/#work">
            View selected work
          </a>
        </div>
      </div>
    </section>
  )
}
