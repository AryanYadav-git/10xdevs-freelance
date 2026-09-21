import Link from 'next/link'
import { projects } from '@/data/content'
import './Projects.css'

export function Projects() {
  return (
    <section className="section projects" id="work">
      <div className="container">
        <span className="section-label">Selected work</span>
        <h2 className="section-title">Recent Projects</h2>
        <p className="section-lede">
          Selected work from our agency — from ecommerce redesigns to custom
          product work with lasting operational impact.
        </p>

        <div className="projects__list">
          {projects.map((project) => (
            <article key={project.id} className="project">
              <Link
                className="project__media"
                href={`/work/${project.id}`}
                aria-label={`View case study: ${project.title}`}
              >
                <img
                  src={project.images[0]?.src}
                  alt={project.images[0]?.alt ?? project.title}
                  loading="lazy"
                />
              </Link>

              <div className="project__body">
                <div className="project__meta">
                  <span>{project.category}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.year}</span>
                </div>
                <h3>
                  <Link className="project__title-link" href={`/work/${project.id}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="project__summary">{project.summary}</p>

                <ul className="project__outcomes">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>

                <div className="project__footer">
                  <ul className="project__stack" aria-label="Tech stack">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link className="project__open" href={`/work/${project.id}`}>
                    View case study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
