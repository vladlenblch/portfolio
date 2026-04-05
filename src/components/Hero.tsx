import { marqueeItems, person } from '../data/content'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__inner">
        <h1 id="hero-title" className="hero__title">
          {person.name}
        </h1>
        <p className="hero__lead">{person.tagline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#projects">
            Смотреть проекты
          </a>
          <a
            className="btn btn--ghost"
            href={person.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="marquee__item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
