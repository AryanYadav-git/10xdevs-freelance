import { whyUs } from '@/data/content'
import './WhyUs.css'

export function WhyUs() {
  return (
    <section className="section whyus" id="why-us" aria-labelledby="whyus-title">
      <div className="container whyus__grid">
        <div className="whyus__intro">
          <span className="section-label" data-index="05">
            Why work with us
          </span>
          <h2 id="whyus-title" className="section-title">
            A partner who treats your brand as their own.
          </h2>
        </div>

        <ul className="whyus__list">
          {whyUs.map((point, index) => (
            <li
              key={point.title}
              data-reveal
              style={{ '--reveal-delay': `${index * 0.08}s` } as React.CSSProperties}
            >
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
