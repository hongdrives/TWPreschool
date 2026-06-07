'use client'

import { useState, useEffect, useCallback, use } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteContent, School, WhyCard, HiwStep, VettingItem, TeamMember, FaqItem, BlogPost, BenefitItem, StatItem, StepItem, WhyItem } from '@/types/content'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Lang = 'en' | 'zh'

type SectionKey =
  | 'site' | 'home' | 'programs' | 'whyTaiwan' | 'howItWorks'
  | 'about' | 'faq' | 'contact' | 'partner' | 'blog'

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'site',       label: 'Site Settings' },
  { key: 'home',       label: 'Home Page' },
  { key: 'programs',   label: 'Programs' },
  { key: 'whyTaiwan',  label: 'Why Taiwan' },
  { key: 'howItWorks', label: 'How It Works' },
  { key: 'about',      label: 'About' },
  { key: 'faq',        label: 'FAQ' },
  { key: 'contact',    label: 'Contact' },
  { key: 'partner',    label: 'Partner' },
  { key: 'blog',       label: 'Blog' },
]

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const ADMIN_CSS = `
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;height:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f0f4f8;color:#111}
.a-shell{display:flex;min-height:100vh}
/* Sidebar */
.a-sidebar{width:220px;min-width:220px;background:#0f172a;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto}
.a-sidebar-logo{padding:1.25rem 1rem .75rem;border-bottom:1px solid rgba(255,255,255,.08)}
.a-sidebar-logo span{font-size:.8rem;font-weight:700;color:#5eead4;letter-spacing:.04em;text-transform:uppercase}
.a-sidebar-logo p{margin:.25rem 0 0;font-size:.7rem;color:rgba(255,255,255,.4);line-height:1.3}
.a-nav{flex:1;padding:.5rem 0}
.a-nav a{display:block;padding:.55rem 1rem;font-size:.8125rem;color:rgba(255,255,255,.6);text-decoration:none;border-left:3px solid transparent;transition:all .12s;cursor:pointer}
.a-nav a:hover{color:#fff;background:rgba(255,255,255,.05)}
.a-nav a.active{color:#5eead4;border-left-color:#0d9488;background:rgba(94,234,212,.06);font-weight:600}
.a-signout{padding:.75rem 1rem 1rem}
.a-signout button{width:100%;padding:.5rem;font-size:.75rem;background:rgba(255,255,255,.07);color:rgba(255,255,255,.5);border:none;border-radius:6px;cursor:pointer;transition:all .12s}
.a-signout button:hover{background:rgba(220,38,38,.2);color:#fca5a5}
/* Main */
.a-main{flex:1;display:flex;flex-direction:column;min-width:0}
.a-topbar{background:#fff;border-bottom:1px solid #e5e7eb;padding:.75rem 1.5rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}
.a-topbar-left{display:flex;align-items:center;gap:.75rem}
.a-lang-tabs{display:flex;gap:.25rem}
.a-lang-tab{padding:.4rem .875rem;border-radius:6px;font-size:.8125rem;font-weight:500;cursor:pointer;border:1.5px solid #e5e7eb;background:#fff;color:#6b7280;transition:all .12s}
.a-lang-tab.active{background:#0d9488;border-color:#0d9488;color:#fff;font-weight:600}
.a-save-btn{padding:.5rem 1.25rem;background:#0d9488;color:#fff;border:none;border-radius:8px;font-size:.8125rem;font-weight:600;cursor:pointer;transition:background .15s;white-space:nowrap}
.a-save-btn:hover{background:#0f766e}
.a-save-btn:disabled{opacity:.6;cursor:not-allowed}
.a-save-status{font-size:.75rem;padding:.35rem .75rem;border-radius:6px;font-weight:500}
.a-save-status.ok{background:#d1fae5;color:#065f46}
.a-save-status.err{background:#fee2e2;color:#991b1b}
.a-content{flex:1;padding:1.5rem;max-width:900px}
.a-section-title{font-size:1.25rem;font-weight:700;color:#111;margin:0 0 1.5rem;padding-bottom:.75rem;border-bottom:2px solid #0d9488}
/* Form layout */
.a-card{background:#fff;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.06);padding:1.25rem 1.5rem;margin-bottom:1.25rem}
.a-card-title{font-size:.875rem;font-weight:700;color:#374151;margin:0 0 1rem;text-transform:uppercase;letter-spacing:.04em}
.f-row{display:grid;grid-template-columns:160px 1fr;gap:.5rem 1rem;align-items:start;margin-bottom:.875rem}
.f-row:last-child{margin-bottom:0}
.f-label{font-size:.78125rem;font-weight:600;color:#6b7280;padding-top:.45rem;line-height:1.3}
.f-input{width:100%;padding:.5rem .625rem;border:1.5px solid #e5e7eb;border-radius:6px;font-size:.875rem;outline:none;transition:border .12s;background:#fff;font-family:inherit;color:#111;resize:vertical}
.f-input:focus{border-color:#0d9488}
.f-input.sm{padding:.375rem .625rem;font-size:.8125rem}
.f-textarea{min-height:80px}
.f-radio-group{display:flex;gap:1rem;padding-top:.375rem}
.f-radio-group label{display:flex;align-items:center;gap:.35rem;font-size:.8125rem;cursor:pointer;color:#374151}
/* List items */
.a-list-item{border:1.5px solid #e5e7eb;border-radius:8px;margin-bottom:.75rem;overflow:hidden}
.a-list-item-header{display:flex;align-items:center;justify-content:space-between;padding:.6rem .875rem;background:#f9fafb;cursor:pointer;user-select:none}
.a-list-item-header span{font-size:.8125rem;font-weight:600;color:#374151}
.a-list-item-body{padding:.875rem;border-top:1px solid #e5e7eb}
.a-list-item-body .f-row{grid-template-columns:120px 1fr}
.a-chevron{font-size:.6rem;color:#9ca3af;transition:transform .15s}
.a-chevron.open{transform:rotate(180deg)}
.a-add-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.45rem .875rem;background:#f0fdf4;color:#166534;border:1.5px solid #bbf7d0;border-radius:6px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .12s}
.a-add-btn:hover{background:#dcfce7}
.a-remove-btn{padding:.35rem .65rem;background:#fff;color:#ef4444;border:1.5px solid #fecaca;border-radius:6px;font-size:.75rem;cursor:pointer;transition:all .12s;white-space:nowrap}
.a-remove-btn:hover{background:#fee2e2}
.a-list-actions{display:flex;justify-content:space-between;align-items:center;margin-top:.5rem}
/* Skeleton */
.a-skeleton{height:300px;background:linear-gradient(90deg,#f0f4f8 25%,#e5e7eb 50%,#f0f4f8 75%);background-size:400% 100%;animation:shimmer 1.4s ease infinite;border-radius:10px}
@keyframes shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}
/* Responsive */
@media(max-width:640px){
  .a-shell{flex-direction:column}
  .a-sidebar{width:100%;min-width:0;height:auto;position:static;flex-direction:row;flex-wrap:wrap}
  .a-nav{display:flex;flex-wrap:wrap;padding:.25rem}
  .a-nav a{padding:.4rem .6rem;font-size:.75rem;border-left:none;border-bottom:2px solid transparent}
  .a-nav a.active{border-bottom-color:#0d9488;border-left-color:transparent}
  .f-row{grid-template-columns:1fr}
}
`

// ---------------------------------------------------------------------------
// Helper: read cookie
// ---------------------------------------------------------------------------
function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}

// ---------------------------------------------------------------------------
// fRow helper
// ---------------------------------------------------------------------------
function fRow(label: string, input: React.ReactNode) {
  return (
    <div className="f-row">
      <div className="f-label">{label}</div>
      <div>{input}</div>
    </div>
  )
}

function inp(
  value: string,
  onChange: (v: string) => void,
  opts?: { textarea?: boolean; rows?: number; placeholder?: string; sm?: boolean }
) {
  const cls = ['f-input', opts?.textarea ? 'f-textarea' : '', opts?.sm ? 'sm' : ''].filter(Boolean).join(' ')
  if (opts?.textarea) {
    return (
      <textarea
        className={cls}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={opts.rows ?? 3}
        placeholder={opts.placeholder}
      />
    )
  }
  return (
    <input
      type="text"
      className={cls}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={opts?.placeholder}
    />
  )
}

// ---------------------------------------------------------------------------
// Collapsible list item
// ---------------------------------------------------------------------------
function CollapsibleItem({
  title,
  onRemove,
  children,
  defaultOpen,
}: {
  title: string
  onRemove: () => void
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  return (
    <div className="a-list-item">
      <div className="a-list-item-header" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <button
            className="a-remove-btn"
            onClick={e => { e.stopPropagation(); onRemove() }}
          >
            Remove
          </button>
          <span className={`a-chevron${open ? ' open' : ''}`}>▼</span>
        </div>
      </div>
      {open && <div className="a-list-item-body">{children}</div>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section editors
// ---------------------------------------------------------------------------

function SiteEditor({ data, onChange }: { data: SiteContent['site']; onChange: (v: SiteContent['site']) => void }) {
  const u = (k: keyof SiteContent['site'], v: string) => onChange({ ...data, [k]: v })
  const opacity = data.heroBgOpacity ?? 0.10
  return (
    <div className="a-card">
      <div className="a-card-title">Site Settings</div>
      {fRow('Site Name', inp(data.name, v => u('name', v)))}
      {fRow('Tagline', inp(data.tagline, v => u('tagline', v)))}
      {fRow('Email', inp(data.email, v => u('email', v)))}
      {fRow('Domain', inp(data.domain, v => u('domain', v)))}
      {fRow('Logo URL', inp(data.logo, v => u('logo', v)))}
      {fRow('Page Hero BG Opacity',
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="range" min="0" max="0.5" step="0.01"
            value={opacity}
            onChange={e => onChange({ ...data, heroBgOpacity: parseFloat(e.target.value) })}
            style={{ flex: 1 }}
          />
          <span style={{ minWidth: 36, fontSize: '.875rem', color: '#374151', fontWeight: 600 }}>
            {Math.round(opacity * 100)}%
          </span>
        </div>
      )}
      {fRow('Default Language',
        <div className="f-radio-group">
          {(['en', 'zh'] as const).map(l => (
            <label key={l}>
              <input type="radio" name="defaultLang" value={l} checked={(data.defaultLang ?? 'en') === l} onChange={() => u('defaultLang', l)} />
              {l === 'en' ? 'English' : '繁體中文'}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function HomeEditor({ data, onChange }: { data: SiteContent['home']; onChange: (v: SiteContent['home']) => void }) {
  const u = <K extends keyof SiteContent['home']>(k: K, v: SiteContent['home'][K]) => onChange({ ...data, [k]: v })

  const trustText = data.trust.join('\n')
  const setTrust = (v: string) => u('trust', v.split('\n'))

  function updateStat(i: number, k: keyof StatItem, v: string) {
    const arr = [...data.stats]
    arr[i] = { ...arr[i], [k]: v }
    u('stats', arr)
  }
  function addStat() { u('stats', [...data.stats, { num: '', label: '' }]) }
  function removeStat(i: number) { u('stats', data.stats.filter((_, idx) => idx !== i)) }

  function updateStep(i: number, k: keyof StepItem, v: string) {
    const arr = [...data.steps]
    arr[i] = { ...arr[i], [k]: v }
    u('steps', arr)
  }
  function addStep() { u('steps', [...data.steps, { title: '', text: '' }]) }
  function removeStep(i: number) { u('steps', data.steps.filter((_, idx) => idx !== i)) }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">Hero</div>
        {fRow('Hero Image URL', inp(data.heroImg, v => u('heroImg', v)))}
        {fRow('Desktop BG Opacity',
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="range" min="0" max="1" step="0.01"
              value={data.heroImgOpacity ?? 0.95}
              onChange={e => u('heroImgOpacity', parseFloat(e.target.value))}
              style={{ flex: 1 }} />
            <span style={{ minWidth: 36, fontSize: '.875rem', fontWeight: 600 }}>{Math.round((data.heroImgOpacity ?? 0.95) * 100)}%</span>
          </div>
        )}
        {fRow('Left Fade %',
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="range" min="0" max="100" step="1"
              value={data.heroImgFade ?? 72}
              onChange={e => u('heroImgFade', parseInt(e.target.value))}
              style={{ flex: 1 }} />
            <span style={{ minWidth: 36, fontSize: '.875rem', fontWeight: 600 }}>{data.heroImgFade ?? 72}%</span>
          </div>
        )}
        {fRow('Show on Mobile',
          <div className="f-radio-group">
            {([true, false] as const).map(v => (
              <label key={String(v)}>
                <input type="radio" checked={(data.heroImgMobile ?? true) === v} onChange={() => u('heroImgMobile', v)} />
                {v ? 'Yes' : 'No'}
              </label>
            ))}
          </div>
        )}
        {fRow('Mobile BG Opacity',
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="range" min="0" max="1" step="0.01"
              value={data.heroImgMobileOpacity ?? 0.28}
              onChange={e => u('heroImgMobileOpacity', parseFloat(e.target.value))}
              style={{ flex: 1 }} />
            <span style={{ minWidth: 36, fontSize: '.875rem', fontWeight: 600 }}>{Math.round((data.heroImgMobileOpacity ?? 0.28) * 100)}%</span>
          </div>
        )}
        {fRow('Badge Text', inp(data.badge, v => u('badge', v)))}
        {fRow('Headline', inp(data.headline, v => u('headline', v), { textarea: true, rows: 2 }))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true, rows: 3 }))}
        {fRow('CTA Button 1', inp(data.cta1, v => u('cta1', v)))}
        {fRow('CTA Button 2', inp(data.cta2, v => u('cta2', v)))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Trust Items</div>
        {fRow('Trust lines', inp(trustText, setTrust, { textarea: true, rows: 4, placeholder: 'One item per line' }))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Stats</div>
        {data.stats.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 100px' }}>
              <input className="f-input sm" value={s.num} onChange={e => updateStat(i, 'num', e.target.value)} placeholder="e.g. 4th" />
            </div>
            <div style={{ flex: 1 }}>
              <textarea className="f-input f-textarea sm" rows={2} value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label (newlines allowed)" />
            </div>
            <button className="a-remove-btn" onClick={() => removeStat(i)}>×</button>
          </div>
        ))}
        <button className="a-add-btn" onClick={addStat}>+ Add Stat</button>
      </div>
      <div className="a-card">
        <div className="a-card-title">Featured Section</div>
        {fRow('Featured Title', inp(data.featuredTitle, v => u('featuredTitle', v)))}
        {fRow('Featured Sub', inp(data.featuredSub, v => u('featuredSub', v)))}
      </div>
      <div className="a-card">
        <div className="a-card-title">How It Works (Home)</div>
        {fRow('Section Title', inp(data.howTitle, v => u('howTitle', v)))}
        {fRow('Section Sub', inp(data.howSub, v => u('howSub', v)))}
        {data.steps.map((s, i) => (
          <CollapsibleItem key={i} title={`Step ${i + 1}: ${s.title || '(untitled)'}`} onRemove={() => removeStep(i)}>
            {fRow('Title', inp(s.title, v => updateStep(i, 'title', v)))}
            {fRow('Text', inp(s.text, v => updateStep(i, 'text', v), { textarea: true }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addStep}>+ Add Step</button>
      </div>
      <div className="a-card">
        <div className="a-card-title">Bottom CTA</div>
        {fRow('CTA Title', inp(data.ctaTitle, v => u('ctaTitle', v), { textarea: true, rows: 2 }))}
        {fRow('CTA Sub', inp(data.ctaSub, v => u('ctaSub', v)))}
        {fRow('CTA Button 1', inp(data.ctaBtn, v => u('ctaBtn', v)))}
        {fRow('CTA Button 2', inp(data.ctaBtn2, v => u('ctaBtn2', v)))}
      </div>
    </>
  )
}

function ProgramsEditor({ data, onChange }: { data: SiteContent['programs']; onChange: (v: SiteContent['programs']) => void }) {
  const u = <K extends keyof SiteContent['programs']>(k: K, v: SiteContent['programs'][K]) => onChange({ ...data, [k]: v })

  function updateSchool(i: number, k: keyof School, v: School[typeof k]) {
    const arr = [...data.schools]
    arr[i] = { ...arr[i], [k]: v } as School
    u('schools', arr)
  }

  function addSchool() {
    const newSchool: School = {
      id: `school-${Date.now()}`, name: '', city: '', area: '', ageRange: '',
      languages: '', durations: '', priceFrom: '', features: [], photo: '',
      badge: '', desc: '', schedule: [], includes: [],
    }
    u('schools', [...data.schools, newSchool])
  }

  function removeSchool(i: number) {
    u('schools', data.schools.filter((_, idx) => idx !== i))
  }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">Programs Section</div>
        {fRow('Title', inp(data.title, v => u('title', v)))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Schools</div>
        {data.schools.map((s, i) => (
          <CollapsibleItem key={s.id} title={`${s.name || '(unnamed)'} — ${s.city}`} onRemove={() => removeSchool(i)}>
            {fRow('ID (slug)', inp(s.id, v => updateSchool(i, 'id', v)))}
            {fRow('Name', inp(s.name, v => updateSchool(i, 'name', v)))}
            {fRow('City', inp(s.city, v => updateSchool(i, 'city', v)))}
            {fRow('Area', inp(s.area, v => updateSchool(i, 'area', v)))}
            {fRow('Age Range', inp(s.ageRange, v => updateSchool(i, 'ageRange', v)))}
            {fRow('Languages', inp(s.languages, v => updateSchool(i, 'languages', v)))}
            {fRow('Durations', inp(s.durations, v => updateSchool(i, 'durations', v)))}
            {fRow('Price From (USD)', inp(s.priceFrom, v => updateSchool(i, 'priceFrom', v)))}
            {fRow('Badge', inp(s.badge, v => updateSchool(i, 'badge', v)))}
            {fRow('Photo URL', inp(s.photo, v => updateSchool(i, 'photo', v)))}
            {fRow('Description', inp(s.desc, v => updateSchool(i, 'desc', v), { textarea: true, rows: 3 }))}
            {fRow('Features', inp(s.features.join(', '), v => updateSchool(i, 'features', v.split(',').map(x => x.trim()).filter(Boolean)), { placeholder: 'Comma-separated' }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addSchool}>+ Add School</button>
      </div>
    </>
  )
}

function WhyTaiwanEditor({ data, onChange }: { data: SiteContent['whyTaiwan']; onChange: (v: SiteContent['whyTaiwan']) => void }) {
  const u = <K extends keyof SiteContent['whyTaiwan']>(k: K, v: SiteContent['whyTaiwan'][K]) => onChange({ ...data, [k]: v })

  function updateCard(i: number, k: keyof WhyCard, v: WhyCard[typeof k]) {
    const arr = [...data.cards]
    arr[i] = { ...arr[i], [k]: v } as WhyCard
    u('cards', arr)
  }
  function addCard() { u('cards', [...data.cards, { icon: '', stat: '', title: '', body: '', bullets: [] }]) }
  function removeCard(i: number) { u('cards', data.cards.filter((_, idx) => idx !== i)) }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">Why Taiwan</div>
        {fRow('Title', inp(data.title, v => u('title', v), { textarea: true, rows: 2 }))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
        {fRow('CTA Title', inp(data.ctaTitle, v => u('ctaTitle', v)))}
        {fRow('CTA Sub', inp(data.ctaSub, v => u('ctaSub', v)))}
        {fRow('CTA Button', inp(data.ctaBtn, v => u('ctaBtn', v)))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Cards</div>
        {data.cards.map((c, i) => (
          <CollapsibleItem key={i} title={`${c.icon} ${c.title || '(untitled)'}`} onRemove={() => removeCard(i)}>
            {fRow('Icon (emoji)', inp(c.icon, v => updateCard(i, 'icon', v)))}
            {fRow('Stat', inp(c.stat, v => updateCard(i, 'stat', v)))}
            {fRow('Title', inp(c.title, v => updateCard(i, 'title', v)))}
            {fRow('Body', inp(c.body, v => updateCard(i, 'body', v), { textarea: true }))}
            {fRow('Bullets', inp(c.bullets.join('\n'), v => updateCard(i, 'bullets', v.split('\n').filter(Boolean)), { textarea: true, placeholder: 'One bullet per line' }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addCard}>+ Add Card</button>
      </div>
    </>
  )
}

function HowItWorksEditor({ data, onChange }: { data: SiteContent['howItWorks']; onChange: (v: SiteContent['howItWorks']) => void }) {
  const u = <K extends keyof SiteContent['howItWorks']>(k: K, v: SiteContent['howItWorks'][K]) => onChange({ ...data, [k]: v })

  function updateStep(i: number, k: keyof HiwStep, v: string) {
    const arr = [...data.steps]
    arr[i] = { ...arr[i], [k]: v }
    u('steps', arr)
  }
  function addStep() { u('steps', [...data.steps, { num: String(data.steps.length + 1).padStart(2, '0'), title: '', body: '' }]) }
  function removeStep(i: number) { u('steps', data.steps.filter((_, idx) => idx !== i)) }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">How It Works</div>
        {fRow('Title', inp(data.title, v => u('title', v)))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
        {fRow('CTA Title', inp(data.ctaTitle, v => u('ctaTitle', v)))}
        {fRow('CTA Sub', inp(data.ctaSub, v => u('ctaSub', v)))}
        {fRow('CTA Button', inp(data.ctaBtn, v => u('ctaBtn', v)))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Steps</div>
        {data.steps.map((s, i) => (
          <CollapsibleItem key={i} title={`${s.num}. ${s.title || '(untitled)'}`} onRemove={() => removeStep(i)}>
            {fRow('Number', inp(s.num, v => updateStep(i, 'num', v)))}
            {fRow('Title', inp(s.title, v => updateStep(i, 'title', v)))}
            {fRow('Body', inp(s.body, v => updateStep(i, 'body', v), { textarea: true }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addStep}>+ Add Step</button>
      </div>
    </>
  )
}

function AboutEditor({ data, onChange }: { data: SiteContent['about']; onChange: (v: SiteContent['about']) => void }) {
  const u = <K extends keyof SiteContent['about']>(k: K, v: SiteContent['about'][K]) => onChange({ ...data, [k]: v })

  function updateVetting(i: number, k: keyof VettingItem, v: string) {
    const arr = [...data.vetting]
    arr[i] = { ...arr[i], [k]: v }
    u('vetting', arr)
  }
  function addVetting() { u('vetting', [...data.vetting, { num: String(data.vetting.length + 1), title: '', text: '' }]) }
  function removeVetting(i: number) { u('vetting', data.vetting.filter((_, idx) => idx !== i)) }

  function updateWhy(i: number, k: keyof WhyItem, v: string) {
    const arr = [...data.why]
    arr[i] = { ...arr[i], [k]: v }
    u('why', arr)
  }
  function addWhy() { u('why', [...data.why, { icon: '✓', title: '', text: '' }]) }
  function removeWhy(i: number) { u('why', data.why.filter((_, idx) => idx !== i)) }

  function updateTeam(i: number, k: keyof TeamMember, v: string) {
    const arr = [...data.team]
    arr[i] = { ...arr[i], [k]: v }
    u('team', arr)
  }
  function addTeam() { u('team', [...data.team, { name: '', role: '', initials: '', quote: '', bio: '' }]) }
  function removeTeam(i: number) { u('team', data.team.filter((_, idx) => idx !== i)) }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">About</div>
        {fRow('Title', inp(data.title, v => u('title', v)))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
        {fRow('Mission', inp(data.mission, v => u('mission', v), { textarea: true, rows: 3 }))}
        {fRow('Story', inp(data.story, v => u('story', v), { textarea: true, rows: 3 }))}
        {fRow('Mission BG Image', inp(data.missionBg, v => u('missionBg', v)))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Vetting Section</div>
        {fRow('Title', inp(data.vettingTitle, v => u('vettingTitle', v)))}
        {fRow('Sub', inp(data.vettingSub, v => u('vettingSub', v)))}
        {data.vetting.map((item, i) => (
          <CollapsibleItem key={i} title={`${item.num}. ${item.title || '(untitled)'}`} onRemove={() => removeVetting(i)}>
            {fRow('Number', inp(item.num, v => updateVetting(i, 'num', v)))}
            {fRow('Title', inp(item.title, v => updateVetting(i, 'title', v)))}
            {fRow('Text', inp(item.text, v => updateVetting(i, 'text', v), { textarea: true }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addVetting}>+ Add Vetting Item</button>
      </div>
      <div className="a-card">
        <div className="a-card-title">Why Choose Us</div>
        {fRow('Title', inp(data.whyTitle, v => u('whyTitle', v)))}
        {data.why.map((item, i) => (
          <CollapsibleItem key={i} title={`${item.icon} ${item.title || '(untitled)'}`} onRemove={() => removeWhy(i)}>
            {fRow('Icon', inp(item.icon, v => updateWhy(i, 'icon', v)))}
            {fRow('Title', inp(item.title, v => updateWhy(i, 'title', v)))}
            {fRow('Text', inp(item.text, v => updateWhy(i, 'text', v), { textarea: true }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addWhy}>+ Add Why Item</button>
      </div>
      <div className="a-card">
        <div className="a-card-title">Team</div>
        {fRow('Title', inp(data.teamTitle, v => u('teamTitle', v)))}
        {data.team.map((m, i) => (
          <CollapsibleItem key={i} title={`${m.name || '(unnamed)'} — ${m.role}`} onRemove={() => removeTeam(i)}>
            {fRow('Name', inp(m.name, v => updateTeam(i, 'name', v)))}
            {fRow('Role', inp(m.role, v => updateTeam(i, 'role', v)))}
            {fRow('Initials', inp(m.initials, v => updateTeam(i, 'initials', v)))}
            {fRow('Quote', inp(m.quote, v => updateTeam(i, 'quote', v), { textarea: true }))}
            {fRow('Bio', inp(m.bio, v => updateTeam(i, 'bio', v), { textarea: true, rows: 3 }))}
            {fRow('Photo URL', inp(m.photo ?? '', v => updateTeam(i, 'photo', v)))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addTeam}>+ Add Team Member</button>
      </div>
    </>
  )
}

function FaqEditor({ data, onChange }: { data: SiteContent['faq']; onChange: (v: SiteContent['faq']) => void }) {
  const u = <K extends keyof SiteContent['faq']>(k: K, v: SiteContent['faq'][K]) => onChange({ ...data, [k]: v })

  function updateItem(i: number, k: keyof FaqItem, v: string) {
    const arr = [...data.items]
    arr[i] = { ...arr[i], [k]: v }
    u('items', arr)
  }
  function addItem() { u('items', [...data.items, { q: '', a: '' }]) }
  function removeItem(i: number) { u('items', data.items.filter((_, idx) => idx !== i)) }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">FAQ</div>
        {fRow('Title', inp(data.title, v => u('title', v)))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
      </div>
      <div className="a-card">
        <div className="a-card-title">FAQ Items</div>
        {data.items.map((item, i) => (
          <CollapsibleItem key={i} title={`Q${i + 1}: ${item.q.slice(0, 60) || '(empty)'}`} onRemove={() => removeItem(i)}>
            {fRow('Question', inp(item.q, v => updateItem(i, 'q', v), { textarea: true, rows: 2 }))}
            {fRow('Answer', inp(item.a, v => updateItem(i, 'a', v), { textarea: true, rows: 3 }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addItem}>+ Add FAQ Item</button>
      </div>
    </>
  )
}

function ContactEditor({ data, onChange }: { data: SiteContent['contact']; onChange: (v: SiteContent['contact']) => void }) {
  const u = <K extends keyof SiteContent['contact']>(k: K, v: string) => onChange({ ...data, [k]: v as SiteContent['contact'][K] })
  return (
    <div className="a-card">
      <div className="a-card-title">Contact</div>
      {fRow('Title', inp(data.title, v => u('title', v)))}
      {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
      {fRow('Email', inp(data.email, v => u('email', v)))}
      {fRow('WhatsApp Label', inp(data.whatsapp, v => u('whatsapp', v)))}
      {fRow('LINE', inp(data.line, v => u('line', v)))}
      {fRow('Response Time', inp(data.response, v => u('response', v)))}
      {fRow('Form Title', inp(data.formTitle, v => u('formTitle', v)))}
    </div>
  )
}

function PartnerEditor({ data, onChange }: { data: SiteContent['partner']; onChange: (v: SiteContent['partner']) => void }) {
  const u = <K extends keyof SiteContent['partner']>(k: K, v: SiteContent['partner'][K]) => onChange({ ...data, [k]: v })

  function updateBenefit(i: number, k: keyof BenefitItem, v: string) {
    const arr = [...data.benefits]
    arr[i] = { ...arr[i], [k]: v }
    u('benefits', arr)
  }
  function addBenefit() { u('benefits', [...data.benefits, { icon: '', title: '', text: '' }]) }
  function removeBenefit(i: number) { u('benefits', data.benefits.filter((_, idx) => idx !== i)) }

  const processText = data.processSteps.join('\n')
  const setProcess = (v: string) => u('processSteps', v.split('\n').filter(Boolean))

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">Partner</div>
        {fRow('Title', inp(data.title, v => u('title', v)))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
        {fRow('Process Title', inp(data.processTitle, v => u('processTitle', v)))}
        {fRow('Process Steps', inp(processText, setProcess, { textarea: true, rows: 5, placeholder: 'One step per line' }))}
        {fRow('CTA Title', inp(data.ctaTitle, v => u('ctaTitle', v)))}
        {fRow('CTA Sub', inp(data.ctaSub, v => u('ctaSub', v)))}
        {fRow('CTA Email', inp(data.ctaEmail, v => u('ctaEmail', v)))}
        {fRow('CTA Button', inp(data.ctaBtn, v => u('ctaBtn', v)))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Benefits</div>
        {data.benefits.map((b, i) => (
          <CollapsibleItem key={i} title={`${b.icon} ${b.title || '(untitled)'}`} onRemove={() => removeBenefit(i)}>
            {fRow('Icon (emoji)', inp(b.icon, v => updateBenefit(i, 'icon', v)))}
            {fRow('Title', inp(b.title, v => updateBenefit(i, 'title', v)))}
            {fRow('Text', inp(b.text, v => updateBenefit(i, 'text', v), { textarea: true }))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addBenefit}>+ Add Benefit</button>
      </div>
    </>
  )
}

function BlogEditor({ data, onChange }: { data: SiteContent['blog']; onChange: (v: SiteContent['blog']) => void }) {
  const u = <K extends keyof SiteContent['blog']>(k: K, v: SiteContent['blog'][K]) => onChange({ ...data, [k]: v })

  function updatePost(i: number, k: keyof BlogPost, v: string) {
    const arr = [...data.posts]
    arr[i] = { ...arr[i], [k]: v }
    u('posts', arr)
  }
  function addPost() { u('posts', [...data.posts, { tag: '', title: '', excerpt: '', date: '', img: '' }]) }
  function removePost(i: number) { u('posts', data.posts.filter((_, idx) => idx !== i)) }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">Blog</div>
        {fRow('Title', inp(data.title, v => u('title', v)))}
        {fRow('Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
      </div>
      <div className="a-card">
        <div className="a-card-title">Posts</div>
        {data.posts.map((p, i) => (
          <CollapsibleItem key={i} title={`[${p.tag}] ${p.title.slice(0, 50) || '(untitled)'}`} onRemove={() => removePost(i)}>
            {fRow('Tag', inp(p.tag, v => updatePost(i, 'tag', v)))}
            {fRow('Title', inp(p.title, v => updatePost(i, 'title', v)))}
            {fRow('Excerpt', inp(p.excerpt, v => updatePost(i, 'excerpt', v), { textarea: true, rows: 3 }))}
            {fRow('Date', inp(p.date, v => updatePost(i, 'date', v)))}
            {fRow('Image URL', inp(p.img, v => updatePost(i, 'img', v)))}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addPost}>+ Add Post</button>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = use(params)
  const router = useRouter()

  const activeSection = (SECTIONS.find(s => s.key === section)?.key ?? 'site') as SectionKey

  const [lang, setLang] = useState<Lang>('en')
  const [enData, setEnData] = useState<SiteContent | null>(null)
  const [zhData, setZhData] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [adminSecret, setAdminSecret] = useState('')

  // Load content on mount
  const loadContent = useCallback(async () => {
    setLoading(true)
    try {
      const [enRes, zhRes, keyRes] = await Promise.all([
        fetch('/api/content?lang=en'),
        fetch('/api/content?lang=zh'),
        fetch('/api/admin/check'),
      ])
      if (enRes.ok) setEnData(await enRes.json() as SiteContent)
      if (zhRes.ok) setZhData(await zhRes.json() as SiteContent)
      if (keyRes.ok) {
        const { secret } = await keyRes.json() as { secret: string }
        setAdminSecret(secret)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadContent() }, [loadContent])

  // Navigate to section
  function goSection(key: SectionKey) {
    router.push(`/admin/${key}`)
  }

  // Save
  async function handleSave() {
    const data = lang === 'en' ? enData : zhData
    if (!data) return
    setSaving(true)
    setSaveStatus('idle')

    // Try cookie secret if not fetched via API yet
    const secret = adminSecret || getCookie('tpe_admin_key')

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secret}`,
        },
        body: JSON.stringify({ lang, data }),
      })
      setSaveStatus(res.ok ? 'ok' : 'err')
    } catch {
      setSaveStatus('err')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  async function handleSignOut() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    document.cookie = 'tpe_admin_key=;path=/;max-age=0'
    router.push('/admin/login')
  }

  // Current data proxy
  const data = lang === 'en' ? enData : zhData

  function setData(updater: (prev: SiteContent) => SiteContent) {
    if (lang === 'en') setEnData(prev => prev ? updater(prev) : prev)
    else setZhData(prev => prev ? updater(prev) : prev)
  }

  function updateSection<K extends keyof SiteContent>(key: K, val: SiteContent[K]) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  const saveLabel = lang === 'en' ? 'Save All — EN Site' : 'Save All — 繁體中文'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ADMIN_CSS }} />
      <div className="a-shell">
        {/* Sidebar */}
        <aside className="a-sidebar" style={{ background: '#0f172a' }}>
          <div className="a-sidebar-logo">
            <span>TPE Admin</span>
            <p>Taiwan Preschool Exchange</p>
          </div>
          <div className="a-nav">
            {SECTIONS.map(s => (
              <a
                key={s.key}
                className={activeSection === s.key ? 'active' : ''}
                onClick={() => goSection(s.key)}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="a-signout">
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </aside>

        {/* Main */}
        <main className="a-main">
          {/* Top bar */}
          <div className="a-topbar">
            <div className="a-topbar-left">
              <div className="a-lang-tabs">
                <button
                  className={`a-lang-tab${lang === 'en' ? ' active' : ''}`}
                  onClick={() => setLang('en')}
                >
                  English
                </button>
                <button
                  className={`a-lang-tab${lang === 'zh' ? ' active' : ''}`}
                  onClick={() => setLang('zh')}
                >
                  繁體中文
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              {saveStatus === 'ok' && <span className="a-save-status ok">Saved!</span>}
              {saveStatus === 'err' && <span className="a-save-status err">Save failed</span>}
              <button className="a-save-btn" onClick={handleSave} disabled={saving || loading}>
                {saving ? 'Saving…' : saveLabel}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="a-content">
            <h1 className="a-section-title">
              {SECTIONS.find(s => s.key === activeSection)?.label}
            </h1>

            {loading && <div className="a-skeleton" />}

            {!loading && data && (
              <>
                {activeSection === 'site' && (
                  <SiteEditor data={data.site} onChange={v => updateSection('site', v)} />
                )}
                {activeSection === 'home' && (
                  <HomeEditor data={data.home} onChange={v => updateSection('home', v)} />
                )}
                {activeSection === 'programs' && (
                  <ProgramsEditor data={data.programs} onChange={v => updateSection('programs', v)} />
                )}
                {activeSection === 'whyTaiwan' && (
                  <WhyTaiwanEditor data={data.whyTaiwan} onChange={v => updateSection('whyTaiwan', v)} />
                )}
                {activeSection === 'howItWorks' && (
                  <HowItWorksEditor data={data.howItWorks} onChange={v => updateSection('howItWorks', v)} />
                )}
                {activeSection === 'about' && (
                  <AboutEditor data={data.about} onChange={v => updateSection('about', v)} />
                )}
                {activeSection === 'faq' && (
                  <FaqEditor data={data.faq} onChange={v => updateSection('faq', v)} />
                )}
                {activeSection === 'contact' && (
                  <ContactEditor data={data.contact} onChange={v => updateSection('contact', v)} />
                )}
                {activeSection === 'partner' && (
                  <PartnerEditor data={data.partner} onChange={v => updateSection('partner', v)} />
                )}
                {activeSection === 'blog' && (
                  <BlogEditor data={data.blog} onChange={v => updateSection('blog', v)} />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
