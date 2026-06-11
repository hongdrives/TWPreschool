'use client'

import { useState, useEffect, useCallback, use, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteContent, School, WhyCard, HiwStep, VettingItem, TeamMember, FaqItem, BlogPost, BenefitItem, StatItem, StepItem, WhyItem, ScheduleItem, IncludeItem } from '@/types/content'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Lang = 'en' | 'zh'

type SectionKey =
  | 'site' | 'home' | 'programs' | 'whyTaiwan' | 'howItWorks'
  | 'about' | 'faq' | 'contact' | 'partner' | 'blog' | 'backup'

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
  { key: 'backup',     label: '⬇ Backup & Restore' },
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
/* Site settings two-col */
.a-site-cols{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;align-items:start}
@media(max-width:860px){.a-site-cols{grid-template-columns:1fr}}
.a-check-list{display:flex;flex-direction:column;gap:.25rem;margin-top:.25rem}
.a-check-item{display:flex;align-items:flex-start;gap:.5rem;font-size:.8125rem;color:#374151;cursor:pointer;padding:.3rem .5rem;border-radius:6px;transition:background .1s}
.a-check-item:hover{background:#f9fafb}
.a-check-item input{width:15px;height:15px;cursor:pointer;accent-color:#e8759a;margin-top:2px;flex-shrink:0}
.a-check-label{display:flex;flex-direction:column;gap:2px}
.a-check-desc{font-size:.7rem;color:#9ca3af;line-height:1.4}
.a-theme-hint{font-size:.75rem;color:#9ca3af;margin-top:.75rem;line-height:1.5}
/* Reset modal */
.a-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem}
.a-modal{background:#fff;border-radius:12px;padding:2rem;max-width:480px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25)}
.a-modal h3{margin:0 0 .75rem;font-size:1.05rem;font-weight:700;color:#111}
.a-modal p{margin:0 0 1.25rem;font-size:.875rem;color:#4b5563;line-height:1.6}
.a-modal-input{width:100%;padding:.55rem .75rem;border:1.5px solid #e5e7eb;border-radius:6px;font-size:.875rem;margin-bottom:1.25rem;outline:none;box-sizing:border-box}
.a-modal-input:focus{border-color:#0d9488}
.a-modal-actions{display:flex;flex-direction:column;gap:.6rem}
.a-modal-btn-en{padding:.6rem 1rem;background:#0d9488;color:#fff;border:none;border-radius:8px;font-size:.8125rem;font-weight:600;cursor:pointer;transition:background .15s}
.a-modal-btn-en:hover:not(:disabled){background:#0f766e}
.a-modal-btn-zh{padding:.6rem 1rem;background:#1e40af;color:#fff;border:none;border-radius:8px;font-size:.8125rem;font-weight:600;cursor:pointer;transition:background .15s}
.a-modal-btn-zh:hover:not(:disabled){background:#1d3a8a}
.a-modal-btn-cancel{padding:.6rem 1rem;background:#f3f4f6;color:#374151;border:none;border-radius:8px;font-size:.8125rem;font-weight:500;cursor:pointer}
.a-modal-btn-en:disabled,.a-modal-btn-zh:disabled{opacity:.4;cursor:not-allowed}
.a-reset-btn{padding:.5rem 1rem;background:#fff;color:#92400e;border:1.5px solid #fcd34d;border-radius:8px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap}
.a-reset-btn:hover{background:#fffbeb}
/* Programs split layout */
.a-prog-cols{display:grid;grid-template-columns:200px 1fr;gap:1.25rem;align-items:start}
.a-prog-list{background:#fff;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.06);overflow:hidden;position:sticky;top:5rem}
.a-prog-tab{display:block;width:100%;text-align:left;padding:.65rem 1rem;font-size:.8125rem;color:#374151;background:none;border:none;border-bottom:1px solid #f3f4f6;cursor:pointer;transition:background .12s;line-height:1.3}
.a-prog-tab:hover{background:#f9fafb}
.a-prog-tab.active{background:#f0fdf4;color:#0d9488;font-weight:700;border-left:3px solid #0d9488}
.a-prog-tab-name{display:block;font-weight:600;font-size:.8rem}
.a-prog-tab-loc{display:block;font-size:.7rem;color:#9ca3af;margin-top:2px}
.a-prog-add{display:block;width:100%;text-align:center;padding:.65rem 1rem;font-size:.8rem;font-weight:600;color:#0d9488;background:#f0fdf4;border:none;border-top:1.5px solid #bbf7d0;cursor:pointer;transition:background .12s}
.a-prog-add:hover{background:#dcfce7}
.a-prog-empty{padding:1.5rem 1rem;text-align:center;color:#9ca3af;font-size:.8rem;line-height:1.6}
.a-sched-row{display:grid;grid-template-columns:110px 1fr auto;gap:.5rem;margin-bottom:.5rem;align-items:center}
.a-inc-row{display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem}
.a-inc-check{width:16px;height:16px;cursor:pointer;accent-color:#0d9488;flex-shrink:0}
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

const T3_ELEMENTS: { key: keyof NonNullable<SiteContent['site']['t3Elements']>; label: string; desc: string }[] = [
  // Nav
  { key: 'navCta',          label: 'Nav — "Apply Now" button',          desc: 'The CTA button on the right of the top navigation bar' },
  { key: 'navLogo',         label: 'Nav — Logo text colour',            desc: 'The site name text next to the logo icon in the nav' },
  { key: 'navLogoIcon',     label: 'Nav — Logo icon square',            desc: 'The small square icon block that sits left of the site name' },
  { key: 'navActiveLink',   label: 'Nav — Active page link',            desc: 'The currently-active page link highlight in the nav bar' },
  { key: 'navPrograms',     label: 'Nav — Programs link',               desc: 'The "Programs" text link in the nav bar' },
  { key: 'navWhyTaiwan',    label: 'Nav — Why Taiwan link',             desc: 'The "Why Taiwan" text link in the nav bar' },
  { key: 'navHowItWorks',   label: 'Nav — How It Works link',           desc: 'The "How It Works" text link in the nav bar' },
  { key: 'navAbout',        label: 'Nav — About link',                  desc: 'The "About" text link in the nav bar' },
  { key: 'navBlog',         label: 'Nav — Blog link',                   desc: 'The "Blog" text link in the nav bar' },
  { key: 'navFaq',          label: 'Nav — FAQ link',                    desc: 'The "FAQ" text link in the nav bar' },
  { key: 'navContact',      label: 'Nav — Contact link',                desc: 'The "Contact" text link in the nav bar' },
  // Buttons
  { key: 'btnPrimary',      label: 'Buttons — Primary (filled)',        desc: 'All solid primary buttons site-wide (hero CTAs, page CTAs, etc.)' },
  { key: 'btnOutline',      label: 'Buttons — Outline style',           desc: 'All outline/bordered buttons used as secondary actions' },
  // Hero
  { key: 'heroBadge',       label: 'Hero — Badge pill',                 desc: 'The small rounded badge above the hero headline ("Curated…")' },
  { key: 'heroCta1',        label: 'Hero — CTA Button 1 (primary)',     desc: 'The first/main CTA button in the hero section (e.g. "View Programs")' },
  { key: 'heroCta2',        label: 'Hero — CTA Button 2 (secondary)',   desc: 'The second/ghost CTA button in the hero section (e.g. "Learn More")' },
  { key: 'trustItems',      label: 'Hero — Trust checkmarks',           desc: 'The circular checkmarks in the trust strip below the hero CTAs' },
  // Section labels
  { key: 'sectionLabel',    label: 'Sections — Label text',            desc: 'Small uppercase labels above every section title across all pages' },
  // Numbers
  { key: 'statNumbers',     label: 'Stats bar — Numbers',              desc: 'The large stat numbers below the hero (4th, 98%, etc.)' },
  { key: 'stepNumbers',     label: 'Home — Step numbers',              desc: 'Large step numbers in the "How It Works" section on the home page' },
  { key: 'hiwNumbers',      label: 'How It Works page — Step numbers', desc: 'Large step numbers on the dedicated How It Works page' },
  { key: 'vettingNumbers',  label: 'About — Vetting numbers',          desc: 'Large numbers in the school vetting section on the About page' },
  { key: 'whyStats',        label: 'Why Taiwan — Card stats',          desc: 'The large stat values on the Why Taiwan feature cards' },
  // Tags & badges
  { key: 'tags',            label: 'Cards — Feature tags',             desc: 'Small feature tags on program cards (e.g. "English", "Bilingual")' },
  { key: 'cardBadge',       label: 'Cards — Category badge',           desc: '"Featured" / category badge at the top of program cards' },
  { key: 'blogTag',         label: 'Blog — Category label',            desc: 'Category label text above blog post titles' },
  // Other
  { key: 'faqIcon',         label: 'FAQ — Expand icon',                desc: 'The + / × icon that opens and closes FAQ accordion items' },
  { key: 'teamRole',        label: 'Team — Role label',                desc: 'The uppercase role/title text on team member cards' },
  { key: 'ctaBand',         label: 'CTA Band — Background',            desc: 'Full-width call-to-action band at page bottoms — changes gradient to include pink' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800) }}
      style={{ fontSize: '.7rem', padding: '.2rem .5rem', background: copied ? '#d1fae5' : '#f0fdf4', color: copied ? '#065f46' : '#166534', border: '1px solid #bbf7d0', borderRadius: 4, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .2s', flexShrink: 0 }}
    >
      {copied ? '✓ Copied' : 'Copy URL'}
    </button>
  )
}

function ColorPicker({ value, defaultColor, onChange }: {
  value: string | undefined
  defaultColor: string
  onChange: (v: string | undefined) => void
}) {
  const effective = (value && /^#[0-9a-fA-F]{6}$/i.test(value)) ? value : defaultColor
  const [text, setText] = useState(effective)
  useEffect(() => { setText(effective) }, [effective])

  function commit(v: string) {
    if (/^#[0-9a-fA-F]{6}$/i.test(v)) onChange(v.toLowerCase() === defaultColor.toLowerCase() ? undefined : v)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="color"
        value={effective}
        onChange={e => { setText(e.target.value); commit(e.target.value) }}
        style={{ width: 36, height: 32, padding: 2, border: '1.5px solid #e5e7eb', borderRadius: 6, cursor: 'pointer', flexShrink: 0 }}
      />
      {/* Hex input + Reset grouped as one unit */}
      <div style={{ display: 'flex', border: '1.5px solid #e5e7eb', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
        <input
          type="text"
          value={text}
          onChange={e => { setText(e.target.value); commit(e.target.value) }}
          onBlur={() => setText(effective)}
          placeholder={defaultColor}
          style={{ width: 88, padding: '.375rem .5rem', fontSize: '.8125rem', border: 'none', outline: 'none', fontFamily: 'monospace', color: '#111', background: '#fff' }}
        />
        <button
          onClick={() => { setText(defaultColor); onChange(undefined) }}
          style={{ padding: '.375rem .65rem', background: '#f3f4f6', color: '#6b7280', border: 'none', borderLeft: '1px solid #e5e7eb', fontSize: '.75rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          Reset
        </button>
      </div>
      {value && <span style={{ fontSize: '.7rem', color: effective, fontWeight: 700 }}>●</span>}
    </div>
  )
}

function SiteEditor({ data, onChange, adminSecret, otherLangData, onOtherLangChange }: {
  data: SiteContent['site']
  onChange: (v: SiteContent['site']) => void
  adminSecret: string
  otherLangData?: SiteContent['site']
  onOtherLangChange?: (v: SiteContent['site']) => void
}) {
  const opacity = data.heroBgOpacity ?? 0.10
  const theme = data.theme ?? 't1'

  function handleChange(v: SiteContent['site']) {
    onChange(v)
    if (otherLangData && onOtherLangChange) {
      onOtherLangChange({
        ...otherLangData,
        theme: v.theme,
        customPink: v.customPink,
        customGreen: v.customGreen,
        t2PinkIntensity: v.t2PinkIntensity,
        t3PinkInject: v.t3PinkInject,
        t3Elements: v.t3Elements,
        heroBgOpacity: v.heroBgOpacity,
        logo: v.logo,
        logoSize: v.logoSize,
        blogHidden: v.blogHidden,
        faqHidden: v.faqHidden,
      })
    }
  }

  function toggleT3(key: keyof NonNullable<SiteContent['site']['t3Elements']>, val: boolean) {
    handleChange({ ...data, t3Elements: { ...data.t3Elements, [key]: val } })
  }

  return (
    <div className="a-site-cols">
      {/* Left: main settings */}
      <div className="a-card">
        <div className="a-card-title">Site Settings</div>
        {fRow('Site Name', inp(data.name, v => handleChange({ ...data, name: v })))}
        {fRow('Tagline', inp(data.tagline, v => handleChange({ ...data, tagline: v })))}
        {fRow('Email', inp(data.email, v => handleChange({ ...data, email: v })))}
        {fRow('Domain', inp(data.domain, v => handleChange({ ...data, domain: v })))}
        {fRow('Logo', <ImageUploader value={data.logo} onChange={v => handleChange({ ...data, logo: v })} adminSecret={adminSecret} syncOtherLang={otherLangData ? (url => onOtherLangChange?.({ ...otherLangData, logo: url })) : undefined} />)}
        {fRow('Logo Size',
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="range" min="24" max="120" step="2"
              value={data.logoSize ?? 68}
              onChange={e => handleChange({ ...data, logoSize: parseInt(e.target.value) })}
              style={{ flex: 1 }} />
            <span style={{ minWidth: 36, fontSize: '.875rem', fontWeight: 600 }}>{data.logoSize ?? 68}px</span>
            <button
              onClick={() => handleChange({ ...data, logoSize: undefined })}
              style={{ padding: '.25rem .5rem', fontSize: '.75rem', background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: 5, cursor: 'pointer' }}
            >Reset</button>
          </div>
        )}
        {fRow('Colour Theme',
          <select className="f-input" value={theme} onChange={e => handleChange({ ...data, theme: e.target.value as 't1'|'t2'|'t3' })}>
            <option value="t1">T1 — Default Green</option>
            <option value="t2">T2 — Green &amp; Pink</option>
            <option value="t3">T3 — Green &amp; Pink (select elements)</option>
          </select>
        )}
        {fRow('Page Hero BG Opacity',
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="range" min="0" max="0.5" step="0.01"
              value={opacity}
              onChange={e => handleChange({ ...data, heroBgOpacity: parseFloat(e.target.value) })}
              style={{ flex: 1 }} />
            <span style={{ minWidth: 36, fontSize: '.875rem', color: '#374151', fontWeight: 600 }}>{Math.round(opacity * 100)}%</span>
          </div>
        )}
        {fRow('Green Colour', <ColorPicker value={data.customGreen} defaultColor="#619394" onChange={v => handleChange({ ...data, customGreen: v })} />)}
        {fRow('Default Language',
          <div className="f-radio-group">
            {(['en', 'zh'] as const).map(l => (
              <label key={l}>
                <input type="radio" name="defaultLang" value={l} checked={(data.defaultLang ?? 'en') === l} onChange={() => handleChange({ ...data, defaultLang: l })} />
                {l === 'en' ? 'English' : '繁體中文'}
              </label>
            ))}
          </div>
        )}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '.875rem', marginTop: '.25rem' }}>
          <div className="a-card-title" style={{ marginBottom: '.625rem' }}>Page Visibility</div>
          <p className="a-theme-hint" style={{ marginBottom: '.75rem' }}>Hides the nav link only — page stays accessible via direct URL. Syncs to both EN and CN.</p>
          {([
            { key: 'blogHidden' as const, label: 'Hide Blog from nav', path: '/blog' },
            { key: 'faqHidden' as const, label: 'Hide FAQ from nav', path: '/faq' },
          ]).map(({ key, label, path }) => (
            <div key={key}>
              <label className="a-check-item">
                <input
                  type="checkbox"
                  checked={!!data[key]}
                  onChange={e => handleChange({ ...data, [key]: e.target.checked })}
                />
                <div className="a-check-label">
                  <span>{label}</span>
                  {path && <span className="a-check-desc">Page still accessible via direct URL</span>}
                </div>
              </label>
              {path && data[key] && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '1.625rem', marginTop: '-2px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '.7rem', color: '#6b7280', fontFamily: 'monospace' }}>
                    https://{data.domain}{path}
                  </span>
                  <CopyButton text={`https://${data.domain}${path}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: theme-specific panel */}
      <div>
        {theme === 't1' && (
          <div className="a-card">
            <div className="a-card-title">T1 — Default Green</div>
            <p className="a-theme-hint">Pure green theme — no additional settings needed.</p>
          </div>
        )}

        {theme === 't2' && (
          <div className="a-card">
            <div className="a-card-title">T2 — Green &amp; Pink Settings</div>
            {fRow('Pink Colour', <ColorPicker value={data.customPink} defaultColor="#E8759A" onChange={v => handleChange({ ...data, customPink: v })} />)}
            {fRow('Pink Intensity',
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="range" min="0" max="100" step="1"
                  value={data.t2PinkIntensity ?? 30}
                  onChange={e => handleChange({ ...data, t2PinkIntensity: parseInt(e.target.value) })}
                  style={{ flex: 1 }} />
                <span style={{ minWidth: 36, fontSize: '.875rem', fontWeight: 600 }}>{data.t2PinkIntensity ?? 30}%</span>
              </div>
            )}
            <p className="a-theme-hint">
              Controls how much pink splashes into the hero &amp; CTA band gradients.<br />
              0% = green only (like T1) · 30% = subtle splash · 100% = strong pink
            </p>
          </div>
        )}

        {theme === 't3' && (
          <div className="a-card">
            <div className="a-card-title">T3 — Green &amp; Pink (select elements)</div>
            {fRow('Pink Colour', <ColorPicker value={data.customPink} defaultColor="#E8759A" onChange={v => handleChange({ ...data, customPink: v })} />)}
            {fRow('Pink Injection',
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="range" min="0" max="100" step="1"
                  value={data.t3PinkInject ?? 0}
                  onChange={e => handleChange({ ...data, t3PinkInject: parseInt(e.target.value) })}
                  style={{ flex: 1 }} />
                <span style={{ minWidth: 36, fontSize: '.875rem', fontWeight: 600 }}>{data.t3PinkInject ?? 0}%</span>
              </div>
            )}
            <p className="a-theme-hint" style={{ marginBottom: '1rem' }}>
              Blends pink into all green gradient areas (hero, CTA band).<br />
              0% = pure green · 50% = half-pink · 100% = fully pink gradients
            </p>
            <p className="a-theme-hint" style={{ marginBottom: '.75rem' }}>Tick each individual element you also want to turn pink:</p>
            <div className="a-check-list">
              {T3_ELEMENTS.map(({ key, label, desc }) => (
                <label key={key} className="a-check-item">
                  <input
                    type="checkbox"
                    checked={!!(data.t3Elements?.[key])}
                    onChange={e => toggleT3(key, e.target.checked)}
                  />
                  <div className="a-check-label">
                    <span>{label}</span>
                    <span className="a-check-desc">{desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function HomeEditor({ data, onChange, adminSecret, otherLangData, onOtherLangChange }: { data: SiteContent['home']; onChange: (v: SiteContent['home']) => void; adminSecret: string; otherLangData?: SiteContent['home']; onOtherLangChange?: (v: SiteContent['home']) => void }) {
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
        {fRow('Hero Image', <ImageUploader value={data.heroImg} onChange={v => u('heroImg', v)} adminSecret={adminSecret} syncOtherLang={otherLangData ? (url => onOtherLangChange?.({ ...otherLangData, heroImg: url })) : undefined} />)}
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
        {fRow('Items per row',
          <div className="f-radio-group">
            {([2, 3, 4] as const).map(n => (
              <label key={n}>
                <input type="radio" checked={(data.trustPerRow ?? 0) === n} onChange={() => onChange({ ...data, trustPerRow: n })} />
                {n} per row
              </label>
            ))}
            <label>
              <input type="radio" checked={!data.trustPerRow} onChange={() => onChange({ ...data, trustPerRow: undefined })} />
              Auto (flex)
            </label>
          </div>
        )}
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
        {fRow('Show Section',
          <label className="a-check-item" style={{ paddingLeft: 0 }}>
            <input
              type="checkbox"
              checked={!data.featuredHidden}
              onChange={e => {
                const val = !e.target.checked
                onChange({ ...data, featuredHidden: val })
                if (otherLangData) onOtherLangChange?.({ ...otherLangData, featuredHidden: val })
              }}
            />
            <span style={{ fontSize: '.8125rem', color: '#374151' }}>Show Featured Programs on Home page</span>
          </label>
        )}
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

// ---------------------------------------------------------------------------
// Image uploader — used by all editors that have image fields
// ---------------------------------------------------------------------------
function isStorageUrl(url: string) {
  return /\/storage\/v1\/object\/public\//.test(url)
}

function ImageUploader({ value, onChange, adminSecret, syncOtherLang }: {
  value: string
  onChange: (url: string) => void
  adminSecret: string
  syncOtherLang?: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')
  const [urlInput, setUrlInput] = useState(value)
  const [pendingForm, setPendingForm] = useState<FormData | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setUrlInput(value) }, [value])

  const isExternalPendingImport = /^https?:\/\//i.test(urlInput) && !isStorageUrl(urlInput) && urlInput !== value

  async function executeUpload(form: FormData) {
    if (value && isStorageUrl(value)) form.append('deleteUrl', value)
    setUploading(true)
    setUploadErr('')
    setPendingForm(null)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminSecret}` },
        body: form,
      })
      let json: { url?: string; error?: string }
      try {
        json = await res.json() as { url?: string; error?: string }
      } catch {
        setUploadErr(`Server error (HTTP ${res.status}) — check Supabase Storage config`)
        setUploading(false)
        if (fileRef.current) fileRef.current.value = ''
        return
      }
      if (json.url) {
        onChange(json.url)
        setUrlInput(json.url)
        syncOtherLang?.(json.url)
      } else {
        setUploadErr(json.error ?? 'Upload failed')
      }
    } catch {
      setUploadErr('Network error — could not reach upload server')
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  function requestUpload(form: FormData) {
    // If there's already an image, ask for confirmation first
    if (value) {
      setPendingForm(form)
    } else {
      void executeUpload(form)
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    requestUpload(form)
  }

  function handleImport() {
    if (!isExternalPendingImport) return
    const form = new FormData()
    form.append('importUrl', urlInput)
    requestUpload(form)
  }

  function handleUrlBlur() {
    if (urlInput !== value) onChange(urlInput)
  }

  const previewSrc = urlInput || value

  return (
    <>
      {/* Confirmation modal — shown before replacing an existing image */}
      {pendingForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '1.75rem', maxWidth: 420, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,.25)' }}>
            <h3 style={{ margin: '0 0 .625rem', fontSize: '1.05rem', fontWeight: 700, color: '#111' }}>Replace Image?</h3>
            <p style={{ margin: '0 0 .875rem', fontSize: '.875rem', color: '#4b5563', lineHeight: 1.65 }}>
              The current image will be <strong>permanently removed</strong> from storage and replaced with the new one.
            </p>
            <p style={{ margin: '0 0 1.375rem', fontSize: '.8125rem', color: '#dc2626', fontWeight: 600, lineHeight: 1.5 }}>
              ⚠ This change applies to <strong>both the EN and CN sites</strong> simultaneously.
            </p>
            <div style={{ display: 'flex', gap: '.625rem' }}>
              <button
                onClick={() => void executeUpload(pendingForm)}
                disabled={uploading}
                style={{ flex: 1, padding: '.625rem', background: '#0d9488', color: '#fff', border: 'none', borderRadius: 8, fontSize: '.8125rem', fontWeight: 600, cursor: 'pointer' }}
              >
                {uploading ? 'Replacing…' : 'Confirm Replace'}
              </button>
              <button
                onClick={() => { setPendingForm(null); if (fileRef.current) fileRef.current.value = '' }}
                disabled={uploading}
                style={{ flex: 1, padding: '.625rem', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontSize: '.8125rem', fontWeight: 500, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        {previewSrc && (
          <img
            src={previewSrc}
            alt="Preview"
            style={{ width: '100%', maxWidth: 280, height: 110, objectFit: 'cover', borderRadius: 6, border: '1.5px solid #e5e7eb', display: 'block' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
            onLoad={e => { e.currentTarget.style.display = 'block' }}
          />
        )}
        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="f-input"
            style={{ minWidth: 0, flex: 1 }}
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onBlur={handleUrlBlur}
            placeholder="Paste URL or use Upload →"
          />
          {isExternalPendingImport && (
            <button
              type="button"
              className="a-add-btn"
              onClick={handleImport}
              disabled={uploading}
              style={{ whiteSpace: 'nowrap', flexShrink: 0, background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}
            >
              {uploading ? 'Importing…' : '↓ Import'}
            </button>
          )}
          <button
            type="button"
            className="a-add-btn"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {uploading ? 'Uploading…' : '↑ Upload'}
          </button>
        </div>
        {uploadErr && <span style={{ fontSize: '.75rem', color: '#ef4444' }}>{uploadErr}</span>}
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      </div>
    </>
  )
}

function ProgramsEditor({ data, onChange, adminSecret, otherLangData, onOtherLangChange }: { data: SiteContent['programs']; onChange: (v: SiteContent['programs']) => void; adminSecret: string; otherLangData?: SiteContent['programs']; onOtherLangChange?: (v: SiteContent['programs']) => void }) {
  const u = <K extends keyof SiteContent['programs']>(k: K, v: SiteContent['programs'][K]) => onChange({ ...data, [k]: v })
  const [selectedIdx, setSelectedIdx] = useState(0)

  const idx = Math.min(selectedIdx, Math.max(0, data.schools.length - 1))
  const school = data.schools.length > 0 ? data.schools[idx] : null

  function updateSchool(si: number, patch: Partial<School>) {
    const arr = [...data.schools]
    arr[si] = { ...arr[si], ...patch }
    u('schools', arr)
  }

  function addSchool() {
    const newSchool: School = {
      id: `school-${Date.now()}`, name: 'New Program', city: '', area: '', ageRange: '',
      languages: '', durations: '', priceFrom: '', features: [], photo: '',
      badge: '', desc: '', schedule: [], includes: [],
    }
    const newArr = [...data.schools, newSchool]
    u('schools', newArr)
    setSelectedIdx(newArr.length - 1)
  }

  function removeSchool(si: number) {
    u('schools', data.schools.filter((_, i) => i !== si))
    setSelectedIdx(Math.max(0, si - 1))
  }

  function updateSchedule(si: number, k: keyof ScheduleItem, v: string) {
    if (!school) return
    const sched = [...(school.schedule ?? [])]
    sched[si] = { ...sched[si], [k]: v }
    updateSchool(idx, { schedule: sched })
  }

  function addSchedule() {
    if (!school) return
    updateSchool(idx, { schedule: [...(school.schedule ?? []), { t: '', a: '' }] })
  }

  function removeSchedule(si: number) {
    if (!school) return
    updateSchool(idx, { schedule: (school.schedule ?? []).filter((_, i) => i !== si) })
  }

  function updateInclude(ii: number, patch: Partial<IncludeItem>) {
    if (!school) return
    const incs = [...(school.includes ?? [])]
    incs[ii] = { ...incs[ii], ...patch }
    updateSchool(idx, { includes: incs })
  }

  function addInclude() {
    if (!school) return
    updateSchool(idx, { includes: [...(school.includes ?? []), { item: '', inc: true }] })
  }

  function removeInclude(ii: number) {
    if (!school) return
    updateSchool(idx, { includes: (school.includes ?? []).filter((_, i) => i !== ii) })
  }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">Programs Section</div>
        {fRow('Page Title', inp(data.title, v => u('title', v)))}
        {fRow('Page Subtitle', inp(data.sub, v => u('sub', v), { textarea: true }))}
      </div>

      <div className="a-prog-cols">
        {/* Left: program tab list */}
        <div className="a-prog-list">
          {data.schools.length === 0 ? (
            <div className="a-prog-empty">No programs yet.<br />Click below to add one.</div>
          ) : (
            data.schools.map((s, i) => (
              <button
                key={s.id}
                className={`a-prog-tab${i === idx ? ' active' : ''}`}
                onClick={() => setSelectedIdx(i)}
              >
                <span className="a-prog-tab-name">{s.name || '(unnamed)'}</span>
                <span className="a-prog-tab-loc">{s.city || '—'}</span>
              </button>
            ))
          )}
          <button className="a-prog-add" onClick={addSchool}>+ Add Program</button>
        </div>

        {/* Right: full editor for selected program */}
        {school ? (
          <div>
            {/* Basic Info */}
            <div className="a-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="a-card-title" style={{ margin: 0 }}>Basic Info</div>
                <button className="a-remove-btn" onClick={() => removeSchool(idx)}>Remove Program</button>
              </div>
              {fRow('Slug (URL)', inp(school.id, v => updateSchool(idx, { id: v }), { placeholder: 'e.g. taipei-bilingual' }))}
              {fRow('Name', inp(school.name, v => updateSchool(idx, { name: v })))}
              {fRow('Badge', inp(school.badge, v => updateSchool(idx, { badge: v }), { placeholder: 'e.g. Most Popular' }))}
              {fRow('City', inp(school.city, v => updateSchool(idx, { city: v })))}
              {fRow('Area / District', inp(school.area, v => updateSchool(idx, { area: v })))}
              {fRow('Age Range', inp(school.ageRange, v => updateSchool(idx, { ageRange: v }), { placeholder: 'e.g. 2–6 years' }))}
              {fRow('Languages', inp(school.languages, v => updateSchool(idx, { languages: v }), { placeholder: 'e.g. English · Mandarin' }))}
              {fRow('Durations', inp(school.durations, v => updateSchool(idx, { durations: v }), { placeholder: 'e.g. 1–4 weeks' }))}
              {fRow('Price From (USD)', inp(school.priceFrom, v => updateSchool(idx, { priceFrom: v }), { placeholder: 'e.g. 2200' }))}
              {fRow('Photo', <ImageUploader value={school.photo} onChange={v => updateSchool(idx, { photo: v })} adminSecret={adminSecret} syncOtherLang={otherLangData?.schools[idx] ? (url => { const sc = otherLangData.schools.map((x, j) => j === idx ? { ...x, photo: url } : x); onOtherLangChange?.({ ...otherLangData, schools: sc }) }) : undefined} />)}
              {fRow('Description', inp(school.desc, v => updateSchool(idx, { desc: v }), { textarea: true, rows: 4 }))}
              {fRow('Feature Tags', inp(school.features.join(', '), v => updateSchool(idx, { features: v.split(',').map((x: string) => x.trim()).filter(Boolean) }), { placeholder: 'Comma-separated, e.g. English Support, City Centre' }))}
            </div>

            {/* Daily Schedule */}
            <div className="a-card">
              <div className="a-card-title">Daily Schedule</div>
              <p className="a-theme-hint" style={{ marginTop: 0, marginBottom: '.875rem' }}>Time &amp; activity pairs shown on the program detail page</p>
              {(school.schedule ?? []).map((item, si) => (
                <div key={si} className="a-sched-row">
                  <input className="f-input sm" value={item.t} onChange={e => updateSchedule(si, 't', e.target.value)} placeholder="8:30am" />
                  <input className="f-input sm" value={item.a} onChange={e => updateSchedule(si, 'a', e.target.value)} placeholder="Activity description" />
                  <button className="a-remove-btn" onClick={() => removeSchedule(si)}>✕</button>
                </div>
              ))}
              <button className="a-add-btn" onClick={addSchedule}>+ Add Time Slot</button>
            </div>

            {/* What's Included */}
            <div className="a-card">
              <div className="a-card-title">What&apos;s Included</div>
              <p className="a-theme-hint" style={{ marginTop: 0, marginBottom: '.875rem' }}>Checked = included ✓ &nbsp; Unchecked = not included ✗</p>
              {(school.includes ?? []).map((item, ii) => (
                <div key={ii} className="a-inc-row">
                  <input type="checkbox" className="a-inc-check" checked={item.inc} onChange={e => updateInclude(ii, { inc: e.target.checked })} />
                  <input className="f-input sm" style={{ flex: 1 }} value={item.item} onChange={e => updateInclude(ii, { item: e.target.value })} placeholder="e.g. Daily lunch &amp; snacks" />
                  <button className="a-remove-btn" onClick={() => removeInclude(ii)}>✕</button>
                </div>
              ))}
              <button className="a-add-btn" onClick={addInclude}>+ Add Item</button>
            </div>
          </div>
        ) : (
          <div className="a-card" style={{ textAlign: 'center', color: '#9ca3af', padding: '3rem 1.5rem', fontSize: '.875rem' }}>
            Select a program on the left to edit its details
          </div>
        )}
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

function AboutEditor({ data, onChange, adminSecret, otherLangData, onOtherLangChange }: { data: SiteContent['about']; onChange: (v: SiteContent['about']) => void; adminSecret: string; otherLangData?: SiteContent['about']; onOtherLangChange?: (v: SiteContent['about']) => void }) {
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
        {fRow('Mission BG Image', <ImageUploader value={data.missionBg} onChange={v => u('missionBg', v)} adminSecret={adminSecret} syncOtherLang={otherLangData ? (url => onOtherLangChange?.({ ...otherLangData, missionBg: url })) : undefined} />)}
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
            {fRow('Photo', <ImageUploader value={m.photo ?? ''} onChange={v => updateTeam(i, 'photo', v)} adminSecret={adminSecret} syncOtherLang={otherLangData?.team[i] ? (url => { const t = otherLangData.team.map((x, j) => j === i ? { ...x, photo: url } : x); onOtherLangChange?.({ ...otherLangData, team: t }) }) : undefined} />)}
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
      {fRow('WhatsApp Number', inp(data.whatsapp, v => u('whatsapp', v), { placeholder: '+60123456789' }))}
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

function BlogEditor({ data, onChange, adminSecret, otherLangData, onOtherLangChange }: { data: SiteContent['blog']; onChange: (v: SiteContent['blog']) => void; adminSecret: string; otherLangData?: SiteContent['blog']; onOtherLangChange?: (v: SiteContent['blog']) => void }) {
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
            {fRow('Image', <ImageUploader value={p.img} onChange={v => updatePost(i, 'img', v)} adminSecret={adminSecret} syncOtherLang={otherLangData?.posts[i] ? (url => { const ps = otherLangData.posts.map((x, j) => j === i ? { ...x, img: url } : x); onOtherLangChange?.({ ...otherLangData, posts: ps }) }) : undefined} />)}
          </CollapsibleItem>
        ))}
        <button className="a-add-btn" onClick={addPost}>+ Add Post</button>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Backup & Restore
// ---------------------------------------------------------------------------
const SITE_CONTENT_REQUIRED_KEYS: (keyof SiteContent)[] = [
  'site', 'home', 'programs', 'whyTaiwan', 'howItWorks', 'about', 'faq', 'contact', 'partner', 'blog',
]

function isValidSiteContent(data: unknown): data is SiteContent {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false
  const d = data as Record<string, unknown>
  return SITE_CONTENT_REQUIRED_KEYS.every(k => k in d)
}

interface BackupMeta { exported?: string; entries: { lang: string; data: SiteContent }[] }

function BackupEditor({ enData, zhData, adminSecret }: {
  enData: SiteContent | null
  zhData: SiteContent | null
  adminSecret: string
}) {
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'ok' | 'err' | 'partial'>('idle')
  const [restoring, setRestoring] = useState(false)
  const [restoreMsg, setRestoreMsg] = useState('')
  const [confirmMeta, setConfirmMeta] = useState<BackupMeta | null>(null)
  const dataReady = !!enData && !!zhData

  function handleBackup() {
    if (!enData || !zhData) return
    const backup = {
      version: 2,
      site: 'Taiwan Preschool Exchange',
      exported: new Date().toISOString(),
      content: [
        { lang: 'en', data: enData },
        { lang: 'zh', data: zhData },
      ],
    }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tpe-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setRestoreStatus('idle')
    setRestoreMsg('')
    try {
      const json = JSON.parse(await file.text()) as Record<string, unknown>

      if (!Array.isArray(json.content) || json.content.length === 0) {
        throw new Error('File does not contain a valid content array.')
      }

      const validEntries: { lang: string; data: SiteContent }[] = []
      const invalidLangs: string[] = []

      for (const entry of json.content as unknown[]) {
        if (!entry || typeof entry !== 'object') continue
        const e = entry as Record<string, unknown>
        const lang = typeof e.lang === 'string' ? e.lang : '?'
        if (!isValidSiteContent(e.data)) {
          invalidLangs.push(lang)
        } else {
          validEntries.push({ lang, data: e.data })
        }
      }

      if (validEntries.length === 0) {
        throw new Error(`No valid language entries found.${invalidLangs.length ? ` (${invalidLangs.join(', ')} failed structure check)` : ''}`)
      }

      if (invalidLangs.length > 0) {
        setRestoreMsg(`Warning: ${invalidLangs.join(', ')} entries are missing required fields and will be skipped.`)
      }

      setConfirmMeta({ exported: json.exported as string | undefined, entries: validEntries })
    } catch (err) {
      setRestoreStatus('err')
      setRestoreMsg(err instanceof Error ? err.message : 'Invalid file — could not parse.')
    }
    e.target.value = ''
  }

  async function executeRestore() {
    if (!confirmMeta) return
    setRestoring(true)
    const results: { lang: string; ok: boolean }[] = []

    for (const entry of confirmMeta.entries) {
      try {
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminSecret}` },
          body: JSON.stringify({ lang: entry.lang, data: entry.data }),
        })
        results.push({ lang: entry.lang, ok: res.ok })
      } catch {
        results.push({ lang: entry.lang, ok: false })
      }
    }

    const failed = results.filter(r => !r.ok).map(r => r.lang.toUpperCase())
    const succeeded = results.filter(r => r.ok).map(r => r.lang.toUpperCase())

    setConfirmMeta(null)
    setRestoring(false)

    if (failed.length === 0) {
      setRestoreStatus('ok')
      setRestoreMsg(`✓ Restored ${succeeded.join(' + ')} — reloading…`)
      setTimeout(() => window.location.reload(), 1800)
    } else if (succeeded.length > 0) {
      setRestoreStatus('partial')
      setRestoreMsg(`Partially restored: ${succeeded.join(', ')} succeeded — ${failed.join(', ')} failed.`)
    } else {
      setRestoreStatus('err')
      setRestoreMsg('Restore failed — server rejected the request. Check the admin secret and try again.')
    }
  }

  const statusColour = { idle: '', ok: '#065f46', err: '#991b1b', partial: '#92400e' }
  const statusBg = { idle: '', ok: '#d1fae5', err: '#fee2e2', partial: '#fef3c7' }

  return (
    <>
      <div className="a-card">
        <div className="a-card-title">Backup Data</div>
        <p style={{ fontSize: '.875rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '1rem' }}>
          Downloads all site content (EN + CN) as a single JSON file. Keep it safe — use it to restore everything if needed.
        </p>
        <p style={{ fontSize: '.8rem', color: '#9ca3af', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Note: uploaded images in Supabase Storage are not included — only the URLs. Back up images separately if needed.
        </p>
        {!dataReady
          ? <p style={{ fontSize: '.875rem', color: '#9ca3af' }}>Loading data…</p>
          : <button className="a-save-btn" onClick={handleBackup}>⬇ Download Backup (.json)</button>
        }
      </div>

      <div className="a-card">
        <div className="a-card-title">Restore Data</div>
        <p style={{ fontSize: '.875rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '.5rem' }}>
          Upload a backup file to restore all content.{' '}
          <strong style={{ color: '#b91c1c' }}>This overwrites all current content — use with caution.</strong>
        </p>
        {restoreStatus !== 'idle' && restoreMsg && (
          <p style={{ color: statusColour[restoreStatus], background: statusBg[restoreStatus], fontSize: '.875rem', margin: '.75rem 0 0', padding: '.625rem .875rem', borderRadius: 6, fontWeight: 500, lineHeight: 1.5 }}>
            {restoreMsg}
          </p>
        )}
        {restoreStatus === 'idle' && restoreMsg && (
          <p style={{ color: '#92400e', background: '#fef3c7', fontSize: '.8rem', margin: '.75rem 0 0', padding: '.5rem .75rem', borderRadius: 6, lineHeight: 1.5 }}>
            {restoreMsg}
          </p>
        )}
        <label className="a-reset-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', cursor: 'pointer', marginTop: '1rem' }}>
          ⬆ Upload Backup File
          <input type="file" accept=".json" onChange={handleFileSelect} style={{ display: 'none' }} />
        </label>
      </div>

      {confirmMeta && (
        <div className="a-modal-overlay" onClick={() => !restoring && setConfirmMeta(null)}>
          <div className="a-modal" onClick={e => e.stopPropagation()}>
            <h3>Confirm Restore</h3>
            {confirmMeta.exported && (
              <p style={{ fontSize: '.8rem', color: '#6b7280', marginBottom: '.75rem' }}>
                Backup exported: {new Date(confirmMeta.exported).toLocaleString()}
              </p>
            )}
            <p>
              This will <strong>overwrite all current content</strong> for{' '}
              <strong>{confirmMeta.entries.map(e => e.lang.toUpperCase()).join(' + ')}</strong> with the backup data.
              <br /><br />
              <span style={{ color: '#b91c1c' }}>This cannot be undone.</span> Make a fresh backup first if you want to keep the current state.
            </p>
            <div className="a-modal-actions">
              <button
                className="a-modal-btn-en"
                style={{ background: '#dc2626' }}
                disabled={restoring}
                onClick={executeRestore}
              >
                {restoring ? 'Restoring…' : 'Yes, Restore Now'}
              </button>
              <button className="a-modal-btn-cancel" disabled={restoring} onClick={() => setConfirmMeta(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetConfirm, setResetConfirm] = useState('')
  const [resetStatus, setResetStatus] = useState<'idle' | 'ok' | 'err'>('idle')

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

    const secret = adminSecret
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
    router.push('/admin/login')
  }

  function applyPercentDefaults(d: SiteContent): SiteContent {
    return {
      ...d,
      site: { ...d.site, heroBgOpacity: 0.10, t2PinkIntensity: 30, t3PinkInject: 0 },
      home: { ...d.home, heroImgOpacity: 0.95, heroImgMobileOpacity: 0.28, heroImgFade: 72 },
    }
  }

  async function handleResetPercent(targetLang: Lang) {
    const current = targetLang === 'en' ? enData : zhData
    if (!current) return
    const reset = applyPercentDefaults(current)
    if (targetLang === 'en') setEnData(reset)
    else setZhData(reset)
    const secret = adminSecret
    setResetStatus('idle')
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secret}` },
        body: JSON.stringify({ lang: targetLang, data: reset }),
      })
      setResetStatus(res.ok ? 'ok' : 'err')
    } catch {
      setResetStatus('err')
    }
    setShowResetModal(false)
    setResetConfirm('')
    setTimeout(() => setResetStatus('idle'), 3000)
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

  // Other-language data — used to sync image fields across EN ↔ CN
  const otherData = lang === 'en' ? zhData : enData
  function updateOtherSection<K extends keyof SiteContent>(key: K, val: SiteContent[K]) {
    const currentOther = lang === 'en' ? zhData : enData
    if (!currentOther) return
    const updated: SiteContent = { ...currentOther, [key]: val }
    // Update in-memory state for immediate UI consistency
    if (lang === 'en') setZhData(updated)
    else setEnData(updated)
    // Auto-persist to Supabase so the other language is saved without the user
    // needing to switch language tabs and click Save manually
    const otherLang = lang === 'en' ? 'zh' : 'en'
    const secret = adminSecret
    if (secret) {
      fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
        body: JSON.stringify({ lang: otherLang, data: updated }),
      }).catch(() => {})
    }
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
              {resetStatus === 'ok' && <span className="a-save-status ok">% Reset!</span>}
              {resetStatus === 'err' && <span className="a-save-status err">Reset failed</span>}
              {saveStatus === 'ok' && <span className="a-save-status ok">Saved!</span>}
              {saveStatus === 'err' && <span className="a-save-status err">Save failed</span>}
              <button className="a-reset-btn" onClick={() => { setShowResetModal(true); setResetConfirm('') }}>
                Set % to default
              </button>
              <button className="a-save-btn" onClick={handleSave} disabled={saving || loading}>
                {saving ? 'Saving…' : saveLabel}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="a-content" style={activeSection === 'programs' ? { maxWidth: '1100px' } : {}}>
            <h1 className="a-section-title">
              {SECTIONS.find(s => s.key === activeSection)?.label}
            </h1>

            {loading && <div className="a-skeleton" />}

            {!loading && data && (
              <>
                {activeSection === 'site' && (
                  <SiteEditor data={data.site} onChange={v => updateSection('site', v)} adminSecret={adminSecret} otherLangData={otherData?.site} onOtherLangChange={v => updateOtherSection('site', v)} />
                )}
                {activeSection === 'home' && (
                  <HomeEditor data={data.home} onChange={v => updateSection('home', v)} adminSecret={adminSecret} otherLangData={otherData?.home} onOtherLangChange={v => updateOtherSection('home', v)} />
                )}
                {activeSection === 'programs' && (
                  <ProgramsEditor data={data.programs} onChange={v => updateSection('programs', v)} adminSecret={adminSecret} otherLangData={otherData?.programs} onOtherLangChange={v => updateOtherSection('programs', v)} />
                )}
                {activeSection === 'whyTaiwan' && (
                  <WhyTaiwanEditor data={data.whyTaiwan} onChange={v => updateSection('whyTaiwan', v)} />
                )}
                {activeSection === 'howItWorks' && (
                  <HowItWorksEditor data={data.howItWorks} onChange={v => updateSection('howItWorks', v)} />
                )}
                {activeSection === 'about' && (
                  <AboutEditor data={data.about} onChange={v => updateSection('about', v)} adminSecret={adminSecret} otherLangData={otherData?.about} onOtherLangChange={v => updateOtherSection('about', v)} />
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
                  <BlogEditor data={data.blog} onChange={v => updateSection('blog', v)} adminSecret={adminSecret} otherLangData={otherData?.blog} onOtherLangChange={v => updateOtherSection('blog', v)} />
                )}
              </>
            )}

            {!loading && activeSection === 'backup' && (
              <BackupEditor
                enData={enData}
                zhData={zhData}
                adminSecret={adminSecret}
              />
            )}
          </div>
        </main>
      </div>

      {showResetModal && (
        <div className="a-modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="a-modal" onClick={e => e.stopPropagation()}>
            <h3>Reset all % settings to default</h3>
            <p>
              This will reset <strong>all opacity and fade % sliders</strong> back to their recommended defaults.
              Your text, images, and all other content will <strong>not</strong> be affected.
              <br /><br />
              Type <strong>confirm</strong> below then choose which site to reset.
            </p>
            <input
              className="a-modal-input"
              placeholder="Type confirm to proceed"
              value={resetConfirm}
              onChange={e => setResetConfirm(e.target.value)}
              autoFocus
            />
            <div className="a-modal-actions">
              <button
                className="a-modal-btn-en"
                disabled={resetConfirm !== 'confirm'}
                onClick={() => handleResetPercent('en')}
              >
                Agreed to reset all % settings in EN Page
              </button>
              <button
                className="a-modal-btn-zh"
                disabled={resetConfirm !== 'confirm'}
                onClick={() => handleResetPercent('zh')}
              >
                Agreed to reset all % settings in CN Page
              </button>
              <button className="a-modal-btn-cancel" onClick={() => setShowResetModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
