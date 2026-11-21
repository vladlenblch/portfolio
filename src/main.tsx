import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const pagePath = window.location.pathname.replace(/\/(?:index\.html)?$/, '')
const brutalism = pagePath === `${import.meta.env.BASE_URL}brutalism`
document.documentElement.dataset.style = brutalism ? 'brutalism' : 'apple'
if (brutalism) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f4f0e8')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App brutalism={brutalism} />
  </StrictMode>,
)
