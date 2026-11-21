import { About } from './components/About'
import { ApplePortfolio } from './components/ApplePortfolio'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import './portfolio.css'
import './components/ApplePortfolio.css'

function App({ brutalism }: { brutalism: boolean }) {
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        К основному содержимому
      </a>
      <Header brutalism={brutalism} />
      <main id="main" className="app-shell__main">
        {brutalism ? (
          <>
            <Hero />
            <About />
            <Stack />
            <Projects />
            <Contact />
          </>
        ) : (
          <ApplePortfolio />
        )}
      </main>
    </div>
  )
}

export default App
