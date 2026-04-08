import { useEffect, useRef, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import './portfolio.css'

function App() {
  const [showCat, setShowCat] = useState(false)
  const typedRef = useRef('')
  const hideTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName
      return (
        target.isContentEditable ||
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT'
      )
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      if (event.key.length !== 1) return

      typedRef.current = `${typedRef.current}${event.key.toLowerCase()}`.slice(-3)
      if (typedRef.current !== 'cat') return

      setShowCat(true)
      if (hideTimerRef.current != null) window.clearTimeout(hideTimerRef.current)
      hideTimerRef.current = window.setTimeout(() => setShowCat(false), 1000)
      typedRef.current = ''
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (hideTimerRef.current != null) window.clearTimeout(hideTimerRef.current)
    }
  }, [])

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        К основному содержимому
      </a>
      <Header />
      <main id="main" className="app-shell__main">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {showCat ? (
        <div className="cat-easter" aria-hidden>
          <div className="cat-easter__frame">
            <img className="cat-easter__img" src={`${import.meta.env.BASE_URL}cat.jpg`} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
