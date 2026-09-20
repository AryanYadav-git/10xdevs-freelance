import Link from 'next/link'
import { site } from '@/data/content'
import './Contact.css'

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact__panel">
        <div>
          <span className="section-label">Contact</span>
          <h2 className="section-title contact__title">Let’s scope the next build</h2>
          <p className="section-lede">
            Share the product, timeline, and constraints. We’ll map the right
            architecture and a clear path to launch — no rate sheet, just a focused
            conversation.
          </p>
        </div>

        <div className="contact__actions">
          <Link className="btn btn-primary" href={site.meetingUrl}>
            Schedule a meeting
          </Link>
          <p className="contact__note">{site.location}</p>
        </div>
      </div>
    </section>
  )
}
