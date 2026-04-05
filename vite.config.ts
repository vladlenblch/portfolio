import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Project Pages: site lives at https://<user>.github.io/<repo>/
 * → set base to /<repo>/ (CI sets GITHUB_PAGES_BASE).
 * User/org site (repo named <user>.github.io): base stays "/".
 */
function pagesBase(): string {
  const raw = process.env.GITHUB_PAGES_BASE?.trim()
  if (!raw) return '/'
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: pagesBase(),
})
