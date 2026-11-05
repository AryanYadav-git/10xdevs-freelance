import Link from 'next/link'
import { services, site } from '@/data/content'
import './Services.css'

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="services__head">
          <div>
            <span className="section-label" data-index="02">
              Services
            </span>
            <h2 id="services-title" className="section-title">
              What we create for your brand
            </h2>
          </div>
        </div>

        <ul className="services__list">
          {services.map((service, index) => (
            <li
              key={service.id}
              className="services__item"
              data-reveal
              style={{ '--reveal-delay': `${index * 0.06}s` } as React.CSSProperties}
            >
              <span className="services__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>

        <p className="services__cta">
          <Link className="btn btn-primary btn-arrow" href={site.meetingUrl}>
            {site.ctaLabel}
          </Link>
        </p>
      </div>
    </section>
  )
}
