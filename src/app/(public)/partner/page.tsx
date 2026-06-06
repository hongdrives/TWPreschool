'use client'

import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import type { BenefitItem } from '@/types/content'

export default function PartnerPage() {
  const { C } = useLang()
  const router = useRouter()
  const pt = C.partner

  return (
    <>
      <section className="ph">
        <div className="wrap">
          <h1>{pt.title}</h1>
          <p>{pt.sub}</p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="section">
        <div className="wrap">
          {pt.benefitsTitle && <h2 className="sec-title">{pt.benefitsTitle}</h2>}
          <div className="ben-grid">
            {pt.benefits.map((ben: BenefitItem, i: number) => (
              <div key={i} className="ben">
                <div className="ben-icon">{ben.icon}</div>
                <h3 className="ben-title">{ben.title}</h3>
                <p className="ben-text">{ben.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="section section-alt">
        <div className="wrap">
          <h2 className="sec-title">{pt.processTitle}</h2>
          <ol className="process-list">
            {pt.processSteps.map((step: string, i: number) => (
              <li key={i} className="process-step">
                <span className="process-num">{i + 1}</span>
                <span className="process-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta-band">
        <div className="wrap">
          <h2>{pt.ctaTitle}</h2>
          <p>{pt.ctaSub}</p>
          <a
            className="btn"
            href={`mailto:${pt.ctaEmail}`}
          >
            {pt.ctaBtn}
          </a>
          <button
            className="btn btn-outline"
            onClick={() => router.push('/contact')}
          >
            Contact Us
          </button>
        </div>
      </section>
    </>
  )
}
