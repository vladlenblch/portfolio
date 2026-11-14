import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { portfolioStyles, type PortfolioStyle } from '../data/styles'
import { ChevronDown } from './Icons'

const links = [
  { href: '#about', label: 'Обо мне' },
  { href: '#stack', label: 'Стек' },
  { href: '#projects', label: 'Проекты' },
  { href: '#contact', label: 'Контакты' },
] as const

type HeaderProps = {
  activeStyle: PortfolioStyle
  onStyleChange: (style: PortfolioStyle) => void
}

export function Header({ activeStyle, onStyleChange }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [stylesOpen, setStylesOpen] = useState(false)
  const selectedStyle = portfolioStyles.find((style) => style.id === activeStyle)!
  const menuId = useId()
  const stylesId = useId()
  const stylePicker = useRef<HTMLLIElement>(null)
  const styleToggle = useRef<HTMLButtonElement>(null)
  const navToggle = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setStylesOpen(false)
  }, [])

  useEffect(() => {
    if (!stylesOpen) return

    const dismissOutside = (event: Event) => {
      if (event.target instanceof Node && !stylePicker.current?.contains(event.target)) {
        setStylesOpen(false)
      }
    }
    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('focusin', dismissOutside)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('focusin', dismissOutside)
    }
  }, [stylesOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return

      if (stylesOpen) {
        setStylesOpen(false)
        styleToggle.current?.focus()
      } else if (open) {
        close()
        navToggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, open, stylesOpen])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia(`(min-width: ${activeStyle === 'apple' ? 834 : 769}px)`)
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) close()
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [activeStyle, close])

  function chooseStyle(style: PortfolioStyle) {
    onStyleChange(style)
    setStylesOpen(false)
    if (open) {
      setOpen(false)
      navToggle.current?.focus()
    } else {
      styleToggle.current?.focus()
    }
  }

  return (
    <header className="site-header">
      {activeStyle !== 'apple' && (
        <a className="site-logo" href="#top" onClick={close}>
          <span className="site-logo__accent">В</span>{' начало'}
        </a>
      )}

      <button
        type="button"
        className="nav-toggle"
        ref={navToggle}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? close() : setOpen(true))}
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
          <li className="style-picker" ref={stylePicker}>
            <button
              type="button"
              className="style-picker__toggle"
              ref={styleToggle}
              aria-expanded={stylesOpen}
              aria-controls={stylesId}
              onClick={() => setStylesOpen((value) => !value)}
            >
              <span>Стиль<span className="style-picker__current">: {selectedStyle.label}</span></span>
              <ChevronDown className="style-picker__chevron" />
            </button>
            <ul className="style-picker__list" id={stylesId} aria-label="Стили оформления" hidden={!stylesOpen}>
              {portfolioStyles.map((style) => (
                <li key={style.id}>
                  <button
                    type="button"
                    className="style-picker__option"
                    aria-pressed={activeStyle === style.id}
                    onClick={() => chooseStyle(style.id)}
                  >
                    {style.label}
                    {activeStyle === style.id && <span aria-hidden>✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}
