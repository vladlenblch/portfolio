import { stackGroups } from '../data/content'

export function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="section__head">
        <h2 id="stack-title" className="section__title">
          Стек
        </h2>
      </div>
      <div className="stack-grid">
        {stackGroups.map((group) => (
          <div key={group.title} className="card stack-card">
            <h3 className="stack-card__title">{group.title}</h3>
            <ul className="tag-list">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="tag">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
