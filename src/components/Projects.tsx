import type { ProjectBullet } from '../data/content'
import { projects } from '../data/content'

function BulletBlock({ bullet }: { bullet: ProjectBullet }) {
  if (typeof bullet === 'string') {
    return <li>{bullet}</li>
  }
  return (
    <li>
      <span className="project-card__bullet-intro">{bullet.text}</span>
      <ul className="project-card__sublist">
        {bullet.sub.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </li>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section__head">
        <h2 id="projects-title" className="section__title">
          Проекты
        </h2>
      </div>
      <ul className="project-grid">
        {projects.map((p) => (
          <li key={p.url}>
            <article className="card project-card">
              <h3 className="project-card__title">{p.title}</h3>
              <ul className="project-card__bullets">
                {p.bullets.map((b, i) => (
                  <BulletBlock key={i} bullet={b} />
                ))}
              </ul>
              <ul className="tag-list tag-list--compact">
                {p.tags.map((t) => (
                  <li key={t}>
                    <span className="tag tag--small">{t}</span>
                  </li>
                ))}
              </ul>
              <a
                className="project-card__link"
                href={p.url}
                target="_blank"
                rel="noreferrer"
              >
                Репозиторий
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
