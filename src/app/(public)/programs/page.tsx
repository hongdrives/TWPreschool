'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import type { School } from '@/types/content'

export default function ProgramsPage() {
  const { C } = useLang()
  const router = useRouter()
  const p = C.programs

  const [cityFilter, setCityFilter] = useState<string>('all')
  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [durationFilter, setDurationFilter] = useState<string>('all')

  const cities = useMemo<string[]>(() => {
    const seen = new Set<string>()
    p.schools.forEach((s: School) => seen.add(s.city))
    return Array.from(seen)
  }, [p.schools])

  const ageOptions = [
    { value: 'all',  label: 'All Ages' },
    { value: '2–4',  label: '2–4' },
    { value: '3–5',  label: '3–5' },
    { value: '4–6',  label: '4–6' },
  ]

  const durationOptions = [
    { value: 'all',       label: 'Any Duration' },
    { value: '1–4 weeks', label: '1–4 weeks' },
    { value: '2–8 weeks', label: '2–8 weeks' },
    { value: '4–12 weeks',label: '4–12 weeks' },
  ]

  const filtered = useMemo<School[]>(() => {
    return p.schools.filter((s: School) => {
      const matchCity = cityFilter === 'all' || s.city === cityFilter
      const matchAge =
        ageFilter === 'all' ||
        s.ageRange.includes(ageFilter.split('–')[0]) ||
        s.ageRange === ageFilter
      const matchDuration =
        durationFilter === 'all' ||
        s.durations.replace(/\s/g, '').includes(durationFilter.replace(/\s/g, '').replace('weeks', ''))
      return matchCity && matchAge && matchDuration
    })
  }, [p.schools, cityFilter, ageFilter, durationFilter])

  return (
    <>
      <section className="ph">
        <div className="ph-bg" style={{ backgroundImage: "url('/assets/schools/taipei-bilingual.png')", opacity: C.site.heroBgOpacity ?? 0.10 }} />
        <div className="wrap">
          <h1>{p.title}</h1>
          <p>{p.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="filter-bar">
            <div className="fg">
              <label htmlFor="filter-city">City</label>
              <select
                id="filter-city"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="fg">
              <label htmlFor="filter-age">Age</label>
              <select
                id="filter-age"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                {ageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="fg">
              <label htmlFor="filter-duration">Duration</label>
              <select
                id="filter-duration"
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
              >
                {durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="no-results">No programs match your filters. Try adjusting your selection.</p>
          ) : (
            <div className="grid-3">
              {filtered.map((school: School) => (
                <div
                  key={school.id}
                  className="card"
                  onClick={() => router.push(`/programs/${school.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && router.push(`/programs/${school.id}`)}
                >
                  <div className="card-img">
                    <img src={school.photo} alt={school.name} loading="lazy" />
                  </div>
                  <div className="card-body">
                    {school.badge && <span className="card-badge">{school.badge}</span>}
                    <h3 className="card-name">{school.name}</h3>
                    <p className="card-loc">{school.city} · {school.area}</p>
                    <div className="card-tags">
                      {school.features.map((f: string) => (
                        <span key={f} className="tag">{f}</span>
                      ))}
                    </div>
                    <div className="card-foot">
                      <span className="card-price">From US${school.priceFrom}</span>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/programs/${school.id}`)
                        }}
                      >
                        View Program →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
