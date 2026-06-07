'use client'

import { useRouter, useParams } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import type { School, ScheduleItem, IncludeItem } from '@/types/content'

export default function ProgramDetailPage() {
  const { C } = useLang()
  const router = useRouter()
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : ''

  const schools: School[] = C.programs.schools
  const school = schools.find((s: School) => s.id === id)

  if (!school) {
    return (
      <section className="ph">
        <div className="wrap">
          <h1>Program Not Found</h1>
          <p style={{ marginBottom: 24 }}>We could not find the program you are looking for.</p>
          <button className="btn btn-outline" onClick={() => router.push('/programs')}>← Back to Programs</button>
        </div>
      </section>
    )
  }

  const similar = schools.filter((s: School) => s.id !== school.id).slice(0, 3)

  return (
    <>
      {/* Hero image — applied directly to img so object-fit:cover and height:340px take effect */}
      <img className="school-hero-img" src={school.photo} alt={school.name} />

      <div className="school-layout">

        {/* ── Left: main content ── */}
        <div>
          {school.badge && (
            <span className="card-badge" style={{ display: 'inline-block', marginBottom: 12 }}>
              {school.badge}
            </span>
          )}
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px,3.5vw,36px)', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.18, marginBottom: 8 }}>
            {school.name}
          </h1>
          <p className="card-loc" style={{ marginBottom: 14 }}>{school.city} · {school.area}</p>

          <div className="card-tags" style={{ marginBottom: 22 }}>
            {school.features.map((f: string) => <span key={f} className="tag">{f}</span>)}
          </div>

          <p style={{ fontSize: '14.5px', color: 'var(--grey)', lineHeight: 1.72, marginBottom: 32 }}>
            {school.desc}
          </p>

          {/* Daily Schedule */}
          <div className="detail-sec">
            <h3>Daily Schedule</h3>
            {school.schedule.map((item: ScheduleItem, i: number) => (
              <div key={i} className="sched-item">
                <span className="sched-time">{item.t}</span>
                <span className="sched-act">{item.a}</span>
              </div>
            ))}
          </div>

          {/* What's Included */}
          <div className="detail-sec">
            <h3>What&apos;s Included</h3>
            <ul className="inc-list">
              {school.includes.map((item: IncludeItem, i: number) => (
                <li key={i}>
                  <span className={item.inc ? 'inc-check' : 'inc-x'}>{item.inc ? '✓' : '✗'}</span>
                  {item.item}
                </li>
              ))}
            </ul>
          </div>

          {/* Similar Programs */}
          {similar.length > 0 && (
            <div className="detail-sec">
              <h3>Similar Programs</h3>
              <div className="similar-grid">
                {similar.map((s: School) => (
                  <div
                    key={s.id}
                    className="card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/programs/${s.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && router.push(`/programs/${s.id}`)}
                  >
                    <img className="card-img" src={s.photo} alt={s.name} loading="lazy" />
                    <div className="card-body">
                      <p className="card-name">{s.name}</p>
                      <p className="card-loc">{s.city}</p>
                      <p style={{ fontSize: 13, color: 'var(--teal-dk)', fontWeight: 600, marginTop: 4 }}>
                        From US${s.priceFrom}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: booking card ── */}
        <aside className="bk-card">
          <div className="bk-price">
            From US${school.priceFrom}
            <small> / child</small>
          </div>
          <div className="divider" />
          <div className="info-row"><span>Duration</span><span>{school.durations}</span></div>
          <div className="info-row"><span>Age Range</span><span>{school.ageRange}</span></div>
          <div className="info-row"><span>Languages</span><span>{school.languages}</span></div>
          <div className="divider" />
          <div className="card-tags" style={{ marginBottom: 20 }}>
            {school.features.map((f: string) => <span key={f} className="tag">{f}</span>)}
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => router.push('/contact')}
          >
            Apply Now
          </button>
          <button
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
            onClick={() => router.push('/contact')}
          >
            Ask a Question
          </button>
        </aside>

      </div>
    </>
  )
}
