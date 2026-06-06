'use client'

import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import type { WhyCard } from '@/types/content'

export default function WhyTaiwanPage() {
  const { C, lang } = useLang()
  const router = useRouter()
  const w = C.whyTaiwan

  const ui = (en: string, zh: string) => lang === 'zh' ? zh : en

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="ph">
        <div className="ph-bg" style={{ backgroundImage: "url('/assets/schools/taichung-forest.png')" }} />
        <div className="wrap">
          <h1 style={{ whiteSpace: 'pre-line' }}>{w.title}</h1>
          <p>{w.sub}</p>
        </div>
      </div>

      {/* ── WHY TAIWAN CARDS ── */}
      <section>
        <div className="wrap">
          <div className="tw-grid">
            {w.cards.map((card: WhyCard, i: number) => (
              <div key={i} className="tw-card">
                <div className="tw-bg-icon">{card.icon}</div>
                <div className="tw-icon">{card.icon}</div>
                <div className="tw-stat">{card.stat}</div>
                <div className="tw-title">{card.title}</div>
                <div className="tw-body">{card.body}</div>
                <ul className="tw-bullets">
                  {card.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="cta-band">
        <div className="wrap">
          <h2>{w.ctaTitle}</h2>
          <p>{w.ctaSub}</p>
          <div className="acts">
            <button className="btn btn-lg btn-white" onClick={() => router.push('/contact')}>
              {w.ctaBtn} →
            </button>
            <button className="btn btn-lg btn-ghost" onClick={() => router.push('/programs')}>
              {ui('Browse Programs', '瀏覽課程')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
