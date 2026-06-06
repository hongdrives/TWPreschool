'use client'

import { useLang } from '@/context/LangContext'
import { useRouter } from 'next/navigation'

export default function Footer() {
  const { C } = useLang()
  const router = useRouter()

  const pages = [
    ['Programs', 'programs'], ['Why Taiwan', 'why-taiwan'], ['How It Works', 'how-it-works'],
    ['About', 'about'], ['Blog', 'blog'], ['FAQ', 'faq'], ['Contact', 'contact'],
  ]
  const legal = [
    ['Partner With Us', 'partner'], ['T&C', '#'], ['Privacy Policy', '#'],
    ['Cancellation Policy', '#'], ['Child Safety Policy', '#'],
  ]

  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo" onClick={() => router.push('/')}>
            {C.site.name}
            <small>{C.site.tagline}</small>
          </div>
          <p className="footer-desc">{C.footer.desc}</p>
        </div>
        <div className="fc">
          <h4>Explore</h4>
          {pages.slice(0, 4).map(([label, page]) => (
            <a key={page} onClick={() => router.push(page === 'home' ? '/' : `/${page}`)}>{label}</a>
          ))}
        </div>
        <div className="fc">
          <h4>More</h4>
          {pages.slice(4).map(([label, page]) => (
            <a key={page} onClick={() => router.push(`/${page}`)}>{label}</a>
          ))}
        </div>
        <div className="fc">
          <h4>Legal</h4>
          {legal.map(([label, page]) => (
            <a key={label} onClick={() => page !== '#' && router.push(`/${page}`)}>{label}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>{C.footer.copyright}</span>
        <span style={{ opacity: 0.5 }}>{C.footer.legal}</span>
      </div>
    </footer>
  )
}
