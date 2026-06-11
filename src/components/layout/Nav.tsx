'use client'

import { useState } from 'react'
import { useLang } from '@/context/LangContext'
import { useRouter, usePathname } from 'next/navigation'

export default function Nav() {
  const { C, lang, setLang } = useLang()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  function go(page: string) {
    router.push(page === 'home' ? '/' : `/${page}`)
    setMobileOpen(false)
  }

  function isActive(page: string) {
    const path = page === 'home' ? '/' : `/${page}`
    return pathname === path
  }

  const logo = C.site.logo
  const isImg = logo && (logo.startsWith('/') || logo.startsWith('http'))

  return (
    <>
      <nav>
        <div className="nav-i">
          <div className="nav-logo" onClick={() => go('home')} style={{ cursor: 'pointer' }}>
            <div className="nav-logo-icon" style={{ width: 68, height: 68, ...(isImg ? { background: 'transparent', borderRadius: 0 } : {}) }}>
              {isImg
                ? <img src={logo} alt="logo" style={{ width: 68, height: 68, objectFit: 'contain' }} />
                : '🌿'}
            </div>
          </div>

          <div className="nav-links">
            {C.nav.links
              .filter(l => !(l.page === 'blog' && C.site.blogHidden) && !(l.page === 'faq' && C.site.faqHidden))
              .map(l => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className={isActive(l.page) ? 'active' : ''}
                data-page={l.page}
              >
                {l.label}
              </button>
            ))}
            <button className="nav-cta" onClick={() => go(C.nav.cta.page)}>
              {C.nav.cta.label}
            </button>
          </div>

          <div className="nav-right">
            <div className="lang-sw">
              <button
                className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                onClick={() => setLang('en')}
              >EN</button>
              <button
                className={`lang-btn${lang === 'zh' ? ' active' : ''}`}
                onClick={() => setLang('zh')}
              >中</button>
            </div>
            <button className="nav-mobile-btn" onClick={() => setMobileOpen(o => !o)}>☰</button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {C.nav.links
          .filter(l => !(l.page === 'blog' && C.site.blogHidden) && !(l.page === 'faq' && C.site.faqHidden))
          .map(l => (
          <button key={l.page} onClick={() => go(l.page)}>{l.label}</button>
        ))}
        <button onClick={() => go(C.nav.cta.page)}>{C.nav.cta.label}</button>
      </div>
    </>
  )
}
