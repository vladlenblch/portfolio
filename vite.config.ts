import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function pagesBase(): string {
  const raw = process.env.GITHUB_PAGES_BASE?.trim()
  if (!raw) return '/'
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'brutalism-page',
      enforce: 'post',
      generateBundle(_, bundle) {
        // GitHub Pages serves directory indexes on direct visits and reloads.
        const index = bundle['index.html']
        if (index?.type !== 'asset') this.error('Missing index.html for the brutalism page')
        this.emitFile({ type: 'asset', fileName: 'brutalism/index.html', source: index.source })
      },
    },
  ],
  base: pagesBase(),
})
