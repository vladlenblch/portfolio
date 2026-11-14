import { education, person, projects, softSkills, spokenLanguages, stackGroups, type ProjectBullet } from '../data/content'
import { ArrowUpRight } from './Icons'
import { useScrollReveal } from './useScrollReveal'

function PrimaryMetric({ text }: { text: string }) {
  const match = /^(.*?=\s*)?(\d+(?:[ \u00a0\u202f]\d{3})*(?:,\d+)?)(.*)$/.exec(text)
  if (!match) return text

  const [, before, value, after] = match
  return <>
    {before && <span className="apt-metric-name">{before}</span>}
    <strong>{value}</strong>
    {after && <span className="apt-metric-note">{after}</span>}
  </>
}

function Descriptions({ bullets }: { bullets: readonly ProjectBullet[] }) {
  return <ul className="apt-bullets">
    {bullets.filter((bullet) => typeof bullet === 'string').map((bullet) => <li key={bullet}>{bullet}</li>)}
  </ul>
}

function Results({ bullets, featured = false }: { bullets: readonly ProjectBullet[]; featured?: boolean }) {
  return bullets.filter((bullet) => typeof bullet !== 'string').map((result) => {
    const metrics = featured ? result.sub : result.sub.flatMap((line) => (
      line.split(/,\s+(?=[\w@-]+\s*=)/)
    ))
    return <div className={featured ? 'apt-feature-results' : 'apt-project-results'} data-reveal={featured ? 'featured-results' : undefined} key={result.text}>
      <h4>{result.text}</h4>
      <div className={featured ? 'apt-feature-numbers' : 'apt-project-metrics'}>
        {metrics.map((line, index) => (
          <p key={line} className={featured && index > 0 ? 'apt-profit-metric' : undefined}>
            <PrimaryMetric text={line} />
          </p>
        ))}
      </div>
    </div>
  })
}

function Technologies({ tags }: { tags: readonly string[] }) {
  return <ul className="apt-tech" aria-label="Технологии проекта">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
}

export function ApplePortfolio() {
  const portfolioRef = useScrollReveal()
  const [featured, ...otherProjects] = projects
  const [intro, ...featuredDetails] = featured.bullets
  const contacts = [
    { label: 'Email', value: person.email, href: `mailto:${person.email}` },
    { label: 'Telegram', value: `@${new URL(person.telegram).pathname.slice(1)}`, href: person.telegram },
    { label: 'GitHub', value: new URL(person.github).pathname.slice(1), href: person.github },
    { label: 'Resume', value: 'Скачать PDF', href: person.resumePath, download: 'resume.pdf' },
  ]

  return <div className="apple-portfolio" ref={portfolioRef}>
    <section id="top" className="apt-hero" aria-labelledby="apple-name">
      <h1 id="apple-name" data-reveal="hero-name">{person.name}</h1>
      <p className="apt-tagline" data-reveal="hero-tagline" data-reveal-delay="150">{person.tagline}</p>
      <div className="apt-actions" data-reveal="hero-actions" data-reveal-delay="300">
        <a className="apt-button" href="#projects">Смотреть проекты</a>
        <a className="apt-button apt-outline" href={person.github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </section>

    <section id="about" className="apt-about apt-section" aria-labelledby="apple-about-title"><div className="apt-inner">
      <h2 id="apple-about-title" data-reveal="about-heading">Обо мне</h2>
      <div className="apt-about-grid">
        <div className="apt-education" data-reveal="about-education">{education.map((item) => <article key={item.place}>
          <p className="apt-period">{item.period}</p>
          <h3>{item.place}</h3>
          {item.program && <p className="apt-program">{item.program}</p>}
          {item.details.map((detail) => <p key={detail} className="apt-education-detail">{detail}</p>)}
        </article>)}</div>
        <div className="apt-about-side" data-reveal="about-skills">
          <div className="apt-skills"><h3>Навыки</h3><ul>{softSkills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
          <div className="apt-languages"><h3>Языки</h3>{spokenLanguages.map((language) => <p key={language}>{language}</p>)}</div>
        </div>
      </div>
    </div></section>

    <section id="stack" className="apt-stack apt-section" aria-labelledby="apple-stack-title"><div className="apt-inner">
      <h2 id="apple-stack-title" data-reveal="stack-heading">Стек</h2>
      <div className="apt-stack-grid">{stackGroups.map((group) => <div key={group.title} data-reveal={`stack:${group.title}`}>
        <h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>)}</div>
    </div></section>

    <section id="projects" className="apt-projects" aria-labelledby="apple-projects-title">
      <article className="apt-feature"><div className="apt-feature-inner">
        <div className="apt-project-heading" data-reveal="featured-heading"><div>
          <h2 id="apple-projects-title" className="apt-section-label">Проекты</h2>
          <h3>{featured.title}</h3>
        </div><a className="apt-button apt-small" href={featured.url} target="_blank" rel="noreferrer">Репозиторий <ArrowUpRight /></a></div>
        <p className="apt-feature-lead" data-reveal="featured-lead">{intro}</p>
        <div className="apt-feature-body"><div className="apt-project-copy" data-reveal="featured-description"><Descriptions bullets={featuredDetails} /></div><Results bullets={featuredDetails} featured /></div>
        <Technologies tags={featured.tags} />
      </div></article>
      <div className="apt-project-grid">{otherProjects.map((project) => <article className="apt-project" key={project.title} data-reveal={`project:${project.title}`} data-reveal-variant="card">
        <h3>{project.title}</h3>
        <Descriptions bullets={project.bullets} />
        <Results bullets={project.bullets} />
        <Technologies tags={project.tags} />
        <a className="apt-repo" href={project.url} target="_blank" rel="noreferrer">Репозиторий <ArrowUpRight /></a>
      </article>)}</div>
    </section>

    <section id="contact" className="apt-contact apt-section" aria-labelledby="apple-contact-title"><div className="apt-inner">
      <h2 id="apple-contact-title" data-reveal="contact-heading">Контакты</h2>
      <div className="apt-contact-grid">{contacts.map((contact) => <a
        key={contact.label}
        data-reveal={`contact:${contact.label}`}
        href={contact.href}
        download={contact.download}
        target={contact.href.startsWith('https://') ? '_blank' : undefined}
        rel={contact.href.startsWith('https://') ? 'noreferrer' : undefined}
      >
        <span className="apt-contact-label">{contact.label}</span>
        <span className="apt-contact-row"><span className="apt-contact-value">{contact.value}</span><ArrowUpRight /></span>
      </a>)}</div>
    </div></section>
  </div>
}
