import { useLayoutEffect, useState } from 'react'
import { About } from './components/About'
import { ApplePortfolio } from './components/ApplePortfolio'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { getInitialStyle, styleStorageKey, type PortfolioStyle } from './data/styles'
import './portfolio.css'
import './components/ApplePortfolio.css'

function App() {
  const [activeStyle, setActiveStyle] = useState(getInitialStyle)

  useLayoutEffect(() => {
    document.documentElement.dataset.style = activeStyle
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      activeStyle === 'apple' ? '#ffffff' : '#f4f0e8',
    )
  }, [activeStyle])

  function chooseStyle(style: PortfolioStyle) {
    setActiveStyle(style)
    try {
      window.localStorage.setItem(styleStorageKey, style)
    } catch {
      // Styling still works when browser storage is unavailable.
    }
  }

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        К основному содержимому
      </a>
      <Header activeStyle={activeStyle} onStyleChange={chooseStyle} />
      <main id="main" className="app-shell__main">
        {activeStyle === 'apple' ? (
          <ApplePortfolio />
        ) : (
          <>
            <Hero />
            <About />
            <Stack />
            <Projects />
            <Contact />
          </>
        )}
      </main>
    </div>
  )
}

export default App
