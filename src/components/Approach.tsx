import { approachPoints } from '@/data/content'
import './Approach.css'

export function Approach() {
  return (
    <section className="section approach" id="approach">
      <div className="container approach__grid">
        <div className="approach__intro">
          <span className="section-label">Approach</span>
          <h2 className="section-title">Built with a designer’s eye</h2>
          <p className="section-lede">
            Design is part of how I think, not a separate service I sell. You get
            interfaces that feel considered — while the engagement stays focused on
            robust full-stack delivery.
          </p>
        </div>

        <ul className="approach__list">
          {approachPoints.map((point) => (
            <li key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
