'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { projects, site, type Project } from '@/data/content'
import './project-detail.css'

export function ProjectDetail({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveIndex(0)
  }, [project.id])

  const currentIndex = projects.findIndex((item) => item.id === project.id)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const activeImage = project.images[activeIndex] ?? project.images[0]

  return (
    <article className="case">
      <div className="container case__top">
        <nav aria-label="Breadcrumb">
          <Link className="case__back" href="/#work">
            Back to work
          </Link>
        </nav>

        <header className="case__header">
          <p className="case__eyebrow">{project.category}</p>
          <h1 className="case__title">{project.title}</h1>
          <p className="case__summary">{project.summary}</p>
        </header>

        <dl className="case__facts">
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div className="case__facts-services">
            <dt>Services</dt>
            <dd>
              <ul>
                {project.services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <div className="case__media">
        <div className="container">
          <div className="case__gallery">
            <div className="case__stage">
              <img
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                className="case__stage-image"
              />
            </div>

            {project.images.length > 1 && (
              <ul className="case__thumbs" aria-label="Project images">
                {project.images.map((image, index) => (
                  <li key={image.src}>
                    <button
                      type="button"
                      className={`case__thumb${index === activeIndex ? ' is-active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show image ${index + 1}: ${image.alt}`}
                      aria-current={index === activeIndex ? 'true' : undefined}
                    >
                      <img src={image.src} alt="" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="container case__body">
        <section className="case__block">
          <h2>The brief</h2>
          <p>{project.challenge}</p>
        </section>

        <section className="case__block">
          <h2>What we created</h2>
          <p>{project.solution}</p>
        </section>

        <section className="case__block case__impact">
          <h2>Value delivered</h2>
          <ul>
            {project.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {project.technical.length > 0 && (
          <details className="case__tech">
            <summary>Technical details</summary>
            <ul>
              {project.technical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        )}

        <div className="case__cta">
          <div>
            <p>Have a brand worth building?</p>          </div>
          <Link className="btn btn-primary btn-lg btn-arrow" href={site.meetingUrl}>
            {site.ctaLabel}
          </Link>
        </div>

        {nextProject && nextProject.id !== project.id && (
          <Link className="case__next" href={`/work/${nextProject.id}`}>
            <span>Next project</span>
            <strong>{nextProject.title}</strong>
          </Link>
        )}
      </div>
    </article>
  )
}
