import { siteStackFooterText } from '../data/content'

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__stack">{siteStackFooterText}</p>
    </footer>
  )
}
