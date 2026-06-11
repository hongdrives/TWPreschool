'use client'

import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import type { School } from '@/types/content'

export default function HomePage() {
  const { C, lang } = useLang()
  const router = useRouter()
  const h = C.home
  const featured: School[] = C.programs.schools.slice(0, 3)

  const ui = (en: string, zh: string) => lang === 'zh' ? zh : en

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        {h.heroImg && (() => {
          const fade = h.heroImgFade ?? 72
          const mask = fade > 0
            ? `linear-gradient(to right,transparent 0%,rgba(0,0,0,.35) ${(fade*0.25).toFixed(1)}%,rgba(0,0,0,.78) ${(fade*0.61).toFixed(1)}%,black ${fade}%)`
            : 'none'
          return (
            <>
              <style>{`@media(max-width:768px){.hero-img-wrap img{opacity:${h.heroImgMobileOpacity ?? 0.28}!important}}`}</style>
              <div className={`hero-img-wrap${h.heroImgMobile === false ? ' mobile-off' : ''}`}>
                <img
                  src={h.heroImg}
                  alt=""
                  style={{ opacity: h.heroImgOpacity ?? 0.95, WebkitMaskImage: mask, maskImage: mask }}
                  onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none' }}
                />
              </div>
            </>
          )
        })()}
        <div className="wrap hero-inner">
          <div className="hero-badge">✦ {h.badge}</div>
          <h1 style={{ whiteSpace: 'pre-line' }}>{h.headline}</h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-actions">
            <button className="btn btn-lg btn-white" onClick={() => router.push('/programs')}>
              {h.cta1} →
            </button>
            <button className="btn btn-lg btn-ghost" onClick={() => router.push('/how-it-works')}>
              {h.cta2}
            </button>
          </div>
          <div className="hero-trust" style={h.trustPerRow ? {
            display: 'grid',
            gridTemplateColumns: `repeat(${h.trustPerRow}, 1fr)`,
            gap: '10px 20px',
          } : {}}>
            {h.trust.map((t, i) => (
              <div key={i} className="trust-item">
                <div className="trust-check">✓</div>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stats-i">
          {h.stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-n">{s.num}</div>
              <div className="stat-l" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROGRAMS ── */}
      {!C.site.featuredProgramsHidden && <section>
        <div className="wrap">
          <div className="section-hd-row">
            <div>
              <div className="section-label">{ui('Featured Programs', '精選課程')}</div>
              <h2 className="section-title">{h.featuredTitle}</h2>
              <p className="section-sub">{h.featuredSub}</p>
            </div>
            <button className="btn btn-outline" onClick={() => router.push('/programs')}>
              {ui('View All Programs →', '查看所有課程 →')}
            </button>
          </div>
          <div className="grid-3">
            {featured.map((school) => (
              <div
                key={school.id}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/programs/${school.id}`)}
              >
                <img
                  className="card-img"
                  src={school.photo}
                  alt={school.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.background = 'var(--teal-lt)'
                    e.currentTarget.src = ''
                  }}
                />
                <div className="card-body">
                  <div className="card-badge">{school.badge}</div>
                  <div className="card-name">{school.name}</div>
                  <div className="card-loc">📍 {school.city} · {school.area}</div>
                  <div className="card-tags">
                    {school.features.map((f, fi) => (
                      <span key={fi} className="tag">{f}</span>
                    ))}
                    <span className="tag">{ui('Ages ', '年齡 ')}{school.ageRange}</span>
                  </div>
                  <div className="card-foot">
                    <div className="card-price">
                      <small>{ui('From', '起')}</small>
                      <strong>USD {school.priceFrom}</strong>
                      <span>{ui('/ programme', '/ 課程')}</span>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/programs/${school.id}`)
                      }}
                    >
                      {ui('View →', '查看 →')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--light)' }}>
        <div className="wrap">
          <div className="section-hd" style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 38px' }}>
            <div className="section-label">{ui('The Process', '流程')}</div>
            <h2 className="section-title">{h.howTitle}</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>{h.howSub}</p>
          </div>
          <div className="grid-3">
            {h.steps.map((s, i) => (
              <div key={i} className="step">
                <div className="step-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="cta-band">
        <div className="wrap">
          <h2 style={{ whiteSpace: 'pre-line' }}>{h.ctaTitle}</h2>
          <p>{h.ctaSub}</p>
          <div className="acts">
            <button className="btn btn-lg btn-white" onClick={() => router.push('/contact')}>
              {h.ctaBtn} →
            </button>
            <button className="btn btn-lg btn-ghost" onClick={() => router.push('/programs')}>
              {h.ctaBtn2}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
