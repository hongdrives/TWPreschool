'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Lang, SiteContent } from '@/types/content'
import { getDefault } from '@/lib/content'

interface LangCtx {
  lang: Lang
  C: SiteContent
  setLang: (l: Lang) => void
  refreshContent: () => Promise<void>
}

const Ctx = createContext<LangCtx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [C, setC] = useState<SiteContent>(getDefault('en'))

  const loadContent = useCallback(async (l: Lang) => {
    try {
      const res = await fetch(`/api/content?lang=${l}`)
      if (res.ok) setC(await res.json())
    } catch {
      setC(getDefault(l))
    }
  }, [])

  useEffect(() => {
    const saved = (localStorage.getItem('tpe_lang') ?? 'en') as Lang
    setLangState(saved)
    void loadContent(saved)
  }, [loadContent])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('tpe_lang', l)
    void loadContent(l)
  }, [loadContent])

  const refreshContent = useCallback(() => loadContent(lang), [lang, loadContent])

  useEffect(() => {
    const theme = C.site.theme ?? 't1'
    document.documentElement.setAttribute('data-theme', theme)

    // Resolve custom green — default #619394 = rgb(97,147,148)
    const ghex = C.site.customGreen
    let gr = 97, gg = 147, gb = 148
    if (ghex && /^#[0-9a-fA-F]{6}$/i.test(ghex)) {
      gr = parseInt(ghex.slice(1, 3), 16)
      gg = parseInt(ghex.slice(3, 5), 16)
      gb = parseInt(ghex.slice(5, 7), 16)
    }
    const grDk = Math.max(0, Math.round(gr * 0.78))
    const ggDk = Math.max(0, Math.round(gg * 0.78))
    const gbDk = Math.max(0, Math.round(gb * 0.78))
    document.documentElement.style.setProperty('--teal',    `rgb(${gr},${gg},${gb})`)
    document.documentElement.style.setProperty('--teal-dk', `rgb(${grDk},${ggDk},${gbDk})`)
    document.documentElement.style.setProperty('--teal-lt', `rgb(${Math.round(gr*0.12+255*0.88)},${Math.round(gg*0.12+255*0.88)},${Math.round(gb*0.12+255*0.88)})`)
    document.documentElement.style.setProperty('--teal-xl', `rgb(${Math.round(gr*0.07+255*0.93)},${Math.round(gg*0.07+255*0.93)},${Math.round(gb*0.07+255*0.93)})`)

    // Resolve custom pink — default #E8759A = rgb(232,117,154)
    const phex = C.site.customPink
    let pr = 232, pg = 117, pb = 154
    if (phex && /^#[0-9a-fA-F]{6}$/i.test(phex)) {
      pr = parseInt(phex.slice(1, 3), 16)
      pg = parseInt(phex.slice(3, 5), 16)
      pb = parseInt(phex.slice(5, 7), 16)
    }
    const rDk = Math.max(0, Math.round(pr * 0.85))
    const gDk = Math.max(0, Math.round(pg * 0.85))
    const bDk = Math.max(0, Math.round(pb * 0.85))
    document.documentElement.style.setProperty('--pink',    `rgb(${pr},${pg},${pb})`)
    document.documentElement.style.setProperty('--pink-dk', `rgb(${rDk},${gDk},${bDk})`)
    document.documentElement.style.setProperty('--pink-xl', `rgb(${Math.round(pr*0.06+255*0.94)},${Math.round(pg*0.06+255*0.94)},${Math.round(pb*0.06+255*0.94)})`)
    document.documentElement.style.setProperty('--blush',   `rgb(${Math.round(pr*0.20+255*0.80)},${Math.round(pg*0.20+255*0.80)},${Math.round(pb*0.20+255*0.80)})`)
    document.documentElement.style.setProperty('--pink-a18', `rgba(${pr},${pg},${pb},.18)`)
    document.documentElement.style.setProperty('--pink-a20', `rgba(${pr},${pg},${pb},.20)`)
    document.documentElement.style.setProperty('--pink-a25', `rgba(${pr},${pg},${pb},.25)`)
    document.documentElement.style.setProperty('--pink-a50', `rgba(${pr},${pg},${pb},.50)`)
    document.documentElement.style.setProperty('--pink-a60', `rgba(${pr},${pg},${pb},.60)`)

    // T2: gradient injection uses custom dark pink
    const intensity = C.site.t2PinkIntensity ?? 30
    document.documentElement.style.setProperty('--t2-pink-stop', `rgba(${rDk},${gDk},${bDk},${(intensity / 100).toFixed(2)})`)

    // T3: space-separated list of active elements as data attribute
    const elems = C.site.t3Elements ?? {}
    const active = (Object.keys(elems) as (keyof typeof elems)[]).filter(k => elems[k]).join(' ')
    if (active) document.documentElement.setAttribute('data-t3', active)
    else document.documentElement.removeAttribute('data-t3')

    // T3: pink injection — interpolate from custom teal-dk to custom pink-dk, fully opaque
    const inject = C.site.t3PinkInject ?? 0
    const ti = inject / 100
    document.documentElement.style.setProperty('--t3-pink-inject',
      `rgb(${Math.round(grDk+(rDk-grDk)*ti)},${Math.round(ggDk+(gDk-ggDk)*ti)},${Math.round(gbDk+(bDk-gbDk)*ti)})`)
  }, [C.site.theme, C.site.customPink, C.site.customGreen, C.site.t2PinkIntensity, C.site.t3PinkInject, C.site.t3Elements])

  return <Ctx.Provider value={{ lang, C, setLang, refreshContent }}>{children}</Ctx.Provider>
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
