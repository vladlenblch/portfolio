import { useCallback, useState } from 'react'
import { person } from '../data/content'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }, [])

  return (
    <section className="section section--contact" id="contact" aria-labelledby="contact-title">
      <div className="section__head">
        <h2 id="contact-title" className="section__title">
          Контакты
        </h2>
      </div>
      <div className="contact-panel">
        <button
          type="button"
          className="contact-tile contact-tile--action"
          onClick={copyEmail}
          aria-label={
            copied
              ? 'Email скопирован в буфер обмена'
              : `Скопировать адрес ${person.email} в буфер обмена`
          }
        >
          <span className="contact-tile__label">Email</span>
          <span className="contact-tile__value" aria-live="polite">
            {copied ? 'Скопировано' : person.email}
          </span>
        </button>
        <a className="contact-tile" href={person.telegram} target="_blank" rel="noreferrer">
          <span className="contact-tile__label">Telegram</span>
          <span className="contact-tile__value">@larionov_vlad</span>
        </a>
        <a className="contact-tile" href={person.github} target="_blank" rel="noreferrer">
          <span className="contact-tile__label">GitHub</span>
          <span className="contact-tile__value">vladlenblch</span>
        </a>
        <a className="contact-tile" href={person.resumePath} download="resume.pdf">
          <span className="contact-tile__label">Резюме</span>
          <span className="contact-tile__value">Скачать PDF</span>
        </a>
      </div>
    </section>
  )
}
