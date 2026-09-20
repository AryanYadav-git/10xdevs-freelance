import { services } from '@/data/content'
import './Services.css'

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <span className="section-label">Services</span>
        <h2 className="section-title">What we ship</h2>
        <p className="section-lede">
          Full-stack delivery across marketing, commerce, and internal software —
          from first architecture decisions through launch.
        </p>

        <ul className="services__list">
          {services.map((service, index) => (
            <li key={service.id} className="services__item">
              <span className="services__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="services__copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
