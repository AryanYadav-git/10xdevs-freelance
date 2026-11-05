import Link from 'next/link'
import { portfolio, projects } from '@/data/content'
import './Projects.css'

export function Projects() {
  return (
    <section className="section projects" id="work" aria-labelledby="work-title">
      <div className="container">
        <span className="section-label" data-index="03">
          Selected work
        </span>
        <h2 id="work-title" className="section-title">
          {portfolio.title}
        </h2>
        <p className="section-lede">{portfolio.lede}</p>

        <div className="projects__list">
          {projects.map((project, index) => (
            <article key={project.id} className="project" data-reveal>
              <Link
                className="project__media"
                href={`/work/${project.id}`}
                aria-label={`View case study: ${project.title}`}
              >
                <img
                  src={project.images[0]?.src}
                  alt={project.images[0]?.alt ?? project.title}
                  loading="lazy"
                  width={1904}
                  height={944}
                />
              </Link>

              <div className="project__body">
                <div className="project__meta">
                  <span className="project__index">{String(index + 1).padStart(2, '0')}</span>
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
                  <ul className="project__services" aria-label="Services provided">
                    {project.services.map((item) => (
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
