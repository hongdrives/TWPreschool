'use client'

import { useState } from 'react'
import { useLang } from '@/context/LangContext'

export default function FaqPage() {
  const { C } = useLang()
  const f = C.faq
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  if (C.site.faqHidden) {
    return (
      <section className="ph">
        <div className="wrap">
          <h1>Coming Soon</h1>
          <p style={{ marginTop: 8 }}>This page is not yet available. Please check back later.</p>
        </div>
      </section>
    )
  }

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? null : i))
  }

  return (
    <>
      {/* Page header */}
      <section className="ph">
        <div className="ph-bg" style={{ backgroundImage: "url('/assets/schools/taoyuan-kindergarten.png')", opacity: C.site.heroBgOpacity ?? 0.10 }} />
        <div className="wrap">
          <h1>{f.title}</h1>
          <p>{f.sub}</p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="section">
        <div className="wrap">
          {f.items.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <div key={i} className="faq-item">
                <button
                  className={`faq-q${isOpen ? ' open' : ''}`}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <span className={`faq-icon${isOpen ? ' open' : ''}`}>
                    {isOpen ? '×' : '+'}
                  </span>
                </button>
                <div className={`faq-a${isOpen ? ' open' : ''}`}>
                  {item.a}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
