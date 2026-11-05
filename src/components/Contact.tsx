import Link from 'next/link'
import { finalCta, site } from '@/data/content'
import './Contact.css'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.2C12.3 3 11 4.5 11 6.9v1.6H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z"
      />
    </svg>
  )
}

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__panel" data-reveal>
        <div className="contact__copy">
          <h2 id="contact-title" className="section-title contact__title">
            {finalCta.title}
          </h2>
          <p className="section-lede">{finalCta.subheading}</p>
        </div>

        <div className="contact__actions">
          <Link className="btn btn-primary btn-lg btn-arrow contact__cta" href={site.meetingUrl}>
            {finalCta.cta}
          </Link>

          <div className="contact__meta">
            <p className="contact__meta-label">Follow</p>
            <ul className="contact__social" aria-label="Social">
              <li>
                <a
                  className="contact__social-link contact__social-link--instagram"
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  className="contact__social-link contact__social-link--facebook"
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
            <p className="contact__note">{site.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
