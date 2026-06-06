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
          <p>We could not find the program you are looking for.</p>
          <button className="btn" onClick={() => router.push('/programs')}>
            Back to Programs
          </button>
        </div>
      </section>
    )
  }

  const similar = schools.filter((s: School) => s.id !== school.id).slice(0, 3)

  return (
    <>
      <div className="school-hero-img">
        <img src={school.photo} alt={school.name} />
      </div>

      <section className="section">
        <div className="wrap">
          <div className="school-layout">
            {/* Main content */}
            <div className="school-main">
              {school.badge && <span className="card-badge">{school.badge}</span>}
              <h1>{school.name}</h1>
              <p className="card-loc">{school.city} · {school.area}</p>

              <div className="card-tags">
                {school.features.map((f: string) => (
                  <span key={f} className="tag">{f}</span>
                ))}
              </div>

              <p className="school-desc">{school.desc}</p>

              {/* Schedule */}
              <div className="detail-sec">
                <h2>Daily Schedule</h2>
                <div className="sched-list">
                  {school.schedule.map((item: ScheduleItem, i: number) => (
                    <div key={i} className="sched-item">
                      <span className="sched-time">{item.t}</span>
                      <span className="sched-act">{item.a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Excluded */}
              <div className="detail-sec">
                <h2>What's Included</h2>
                <ul className="inc-list">
                  {school.includes.map((item: IncludeItem, i: number) => (
                    <li key={i} className={item.inc ? 'inc-yes' : 'inc-no'}>
                      <span className="inc-icon">{item.inc ? '✓' : '✗'}</span>
                      {item.item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Similar schools */}
              {similar.length > 0 && (
                <div className="detail-sec">
                  <h2>Similar Programs</h2>
                  <div className="similar-grid">
                    {similar.map((s: School) => (
                      <div
                        key={s.id}
                        className="similar-card"
                        onClick={() => router.push(`/programs/${s.id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && router.push(`/programs/${s.id}`)}
                      >
                        <div className="similar-img">
                          <img src={s.photo} alt={s.name} loading="lazy" />
                        </div>
                        <div className="similar-body">
                          <p className="similar-name">{s.name}</p>
                          <p className="similar-loc">{s.city}</p>
                          <p className="similar-price">From US${s.priceFrom}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking card */}
            <aside className="bk-card">
              <p className="bk-price">From US${school.priceFrom}</p>
              <p className="bk-duration">{school.durations}</p>
              <p className="bk-age">{school.ageRange}</p>

              <ul className="bk-features">
                {school.features.map((f: string) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <p className="bk-lang">{school.languages}</p>

              <button
                className="btn btn-full"
                onClick={() => router.push('/contact')}
              >
                Apply Now
              </button>

              <button
                className="btn btn-outline btn-full"
                onClick={() => router.push('/contact')}
              >
                Ask a Question
              </button>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
