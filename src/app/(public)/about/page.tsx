'use client'

import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import type { TeamMember } from '@/types/content'

export default function AboutPage() {
  const { C } = useLang()
  const router = useRouter()
  const a = C.about

  function TeamCard({ member, solo }: { member: TeamMember; solo?: boolean }) {
    return (
      <div className={`team-card${solo ? ' team-card-solo' : ''}`}>
        <div className="team-av">
          {member.photo ? (
            <img src={member.photo} alt={member.name} />
          ) : (
            member.initials
          )}
        </div>
        <div className="team-name">{member.name}</div>
        <div className="team-role">{member.role}</div>
        <div className="team-quote">&ldquo;{member.quote}&rdquo;</div>
        <div className="team-bio">{member.bio}</div>
      </div>
    )
  }

  return (
    <>
      {/* Page header */}
      <section className="ph">
        <div className="ph-bg" style={{ backgroundImage: "url('/assets/schools/tainan-waldorf.png')", opacity: C.site.heroBgOpacity ?? 0.10 }} />
        <div className="wrap">
          <h1>{a.title}</h1>
          <p>{a.sub}</p>
        </div>
      </section>

      {/* Mission section */}
      <section
        style={{
          position: 'relative',
          background: '#1C2A2A',
          color: '#fff',
          overflow: 'hidden',
          padding: '60px 0',
        }}
      >
        <img
          src={a.missionBg}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15,
          }}
        />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              lineHeight: 1.5,
              maxWidth: 680,
              marginBottom: 24,
            }}
          >
            {a.mission}
          </p>
          <p
            style={{
              fontSize: 14,
              opacity: 0.75,
              maxWidth: 560,
              lineHeight: 1.72,
            }}
          >
            {a.story}
          </p>
        </div>
      </section>

      {/* Vetting section */}
      <section className="section">
        <div className="wrap">
          <div className="section-hd">
            <h2>{a.vettingTitle}</h2>
            <p>{a.vettingSub}</p>
          </div>
          <div className="vetting-grid">
            {a.vetting.map((item) => (
              <div key={item.num} className="vet">
                <div className="vet-n">{item.num}</div>
                <div>
                  <div className="vet-title">{item.title}</div>
                  <div className="vet-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why families section */}
      <section className="section">
        <div className="wrap">
          <div className="section-hd">
            <h2>{a.whyTitle}</h2>
          </div>
          <div className="grid-3">
            {a.why.map((item, i) => (
              <div key={i} className="val-card">
                <div className="val-icon">{item.icon}</div>
                <div className="val-title">{item.title}</div>
                <div className="val-text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="section">
        <div className="wrap">
          <div className="section-hd">
            <h2>{a.teamTitle}</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(a.team.length, 3)}, 1fr)`,
            gap: '24px',
          }}>
            {a.team.map((member, i) => (
              <TeamCard key={i} member={member} solo={a.team.length === 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
