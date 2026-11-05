import { about } from '@/data/content'
import './About.css'

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <span className="section-label" data-index="01">
          About
        </span>

        <div className="about__grid">
          <h2 id="about-title" className="about__title" data-reveal>
            {about.title}
          </h2>

          <div className="about__copy" data-reveal style={{ '--reveal-delay': '0.12s' } as React.CSSProperties}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="about__audience" aria-label="Who we work with">
          {about.audience.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              style={{ '--reveal-delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
