import { useEffect, useId, useRef, useState } from 'react'

const links = [
  { href: '#about', label: 'Обо мне' },
  { href: '#stack', label: 'Стек' },
  { href: '#projects', label: 'Проекты' },
  { href: '#contact', label: 'Контакты' },
] as const

export function Header({ brutalism }: { brutalism: boolean }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const navToggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        navToggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia(`(min-width: ${brutalism ? 769 : 834}px)`)
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [brutalism])

  return (
    <header className="site-header">
      {brutalism && (
        <a className="site-logo" href="#top" onClick={() => setOpen(false)}>
          <span className="site-logo__accent">В</span>{' начало'}
        </a>
      )}

      <button
        type="button"
        className="nav-toggle"
        ref={navToggle}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(value => !value)}
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
                onClick={() => setOpen(false)}
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
