import { useCallback, useEffect, useId, useState } from 'react'

const links = [
  { href: '#about', label: 'Обо мне' },
  { href: '#stack', label: 'Стек' },
  { href: '#projects', label: 'Проекты' },
  { href: '#contact', label: 'Контакты' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <header className="site-header">
      <a className="site-logo" href="#top">
        <span className="site-logo__accent">В</span>
        {' начало'}
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-toggle__bar" aria-hidden />
        <span className="nav-toggle__bar" aria-hidden />
        <span className="sr-only">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
      </button>

      <nav className="site-nav" id={menuId} aria-label="Основная навигация">
        <ul className="site-nav__list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="site-nav__link"
                onClick={() => close()}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
