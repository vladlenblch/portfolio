import { education, softSkills, spokenLanguages } from '../data/content'

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="section__head">
        <h2 id="about-title" className="section__title">
          Обо мне
        </h2>
      </div>
      <div className="about-columns">
        <div className="about-columns__left">
          {education.map((row) => (
            <article key={row.place} className="about-edu">
              <div className="timeline__marker" aria-hidden />
              <div className="timeline__body">
                <p className="timeline__period">{row.period}</p>
                <h3 className="timeline__place">{row.place}</h3>
                {row.details.map((line) => (
                  <p key={line} className="timeline__detail">
                    {line}
                  </p>
                ))}
                {row.program ? <p className="timeline__program">{row.program}</p> : null}
              </div>
            </article>
          ))}
        </div>
        <div className="about-columns__right">
          <aside className="about-skills card" aria-labelledby="about-skills-title">
            <h3 id="about-skills-title" className="card__title about-side__heading">
              Навыки
            </h3>
            <ul className="about-side__list">
              {softSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
          <aside className="about-lang card" aria-labelledby="about-lang-title">
            <h3 id="about-lang-title" className="card__title about-side__heading">
              Языки
            </h3>
            <ul className="about-side__list">
              {spokenLanguages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
