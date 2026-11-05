import { approachSteps } from '@/data/content'
import './Approach.css'

export function Approach() {
  return (
    <section className="section approach" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <span className="section-label" data-index="04">
          Our approach
        </span>
        <h2 id="approach-title" className="section-title">
          From first conversation to launch, and beyond.
        </h2>

        <ol className="approach__steps">
          {approachSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ '--reveal-delay': `${index * 0.08}s` } as React.CSSProperties}
            >
              <span className="approach__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
