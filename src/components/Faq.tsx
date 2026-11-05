import { faqs } from '@/data/content'
import './Faq.css'

export function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__intro">
          <span className="section-label" data-index="06">
            FAQ
          </span>
          <h2 id="faq-title" className="section-title">
            Good questions to ask before you start.
          </h2>
          <p className="section-lede">
            Straight answers on cost, timelines and how we work.
          </p>
        </div>

        <div className="faq__list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq__item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
