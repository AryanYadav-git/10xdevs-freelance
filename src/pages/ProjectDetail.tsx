import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjectById, site } from '../data/content'
import './ProjectDetail.css'

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? getProjectById(projectId) : undefined
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveIndex(0)
  }, [projectId])

  if (!project || project.images.length === 0) {
    return <Navigate to="/#work" replace />
  }

  const activeImage = project.images[activeIndex] ?? project.images[0]

  return (
    <article className="case">
      <div className="container case__top">
        <Link className="case__back" to="/#work">
          Back to work
        </Link>

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
          <h2>Challenge</h2>
          <p>{project.challenge}</p>
        </section>

        <section className="case__block">
          <h2>Solution</h2>
          <p>{project.solution}</p>
        </section>

        <section className="case__block case__impact">
          <h2>Impact</h2>
          <ul>
            {project.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="case__cta">
          <p>Have a similar build in mind?</p>
          <Link className="btn btn-primary" to={site.meetingUrl}>
            Schedule a meeting
          </Link>
        </div>
      </div>
    </article>
  )
}
