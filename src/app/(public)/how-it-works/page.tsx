'use client'

import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'

export default function HowItWorksPage() {
  const { C } = useLang()
  const router = useRouter()
  const h = C.howItWorks

  return (
    <>
      {/* Page header */}
      <section className="ph">
        <div className="wrap">
          <h1>{h.title}</h1>
          <p>{h.sub}</p>
        </div>
      </section>

      {/* Steps grid */}
      <section className="section">
        <div className="wrap">
          <div className="hiw-grid">
            {h.steps.map((step) => (
              <div key={step.num} className="hiw-step">
                <div className="hiw-num">{step.num}</div>
                <div className="hiw-title">{step.title}</div>
                <div className="hiw-text">{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta-band">
        <div className="wrap">
          <h2>{h.ctaTitle}</h2>
          <p>{h.ctaSub}</p>
          <button onClick={() => router.push('/contact')}>{h.ctaBtn}</button>
        </div>
      </section>
    </>
  )
}
