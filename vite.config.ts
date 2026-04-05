import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function pagesBase(): string {
  const raw = process.env.GITHUB_PAGES_BASE?.trim()
  if (!raw) return '/'
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}

export default defineConfig({
  plugins: [react()],
  base: pagesBase(),
})
