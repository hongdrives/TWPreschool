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

    // T2: dynamic pink intensity via CSS variable
    const intensity = C.site.t2PinkIntensity ?? 30
    document.documentElement.style.setProperty('--t2-pink-stop', `rgba(139,61,107,${(intensity / 100).toFixed(2)})`)

    // T3: pink injection — interpolate from teal-dk (74,116,117) to pink (139,61,107) fully opaque
    const inject = C.site.t3PinkInject ?? 0
    const t = inject / 100
    const r = Math.round(74  + (139 - 74)  * t)
    const g = Math.round(116 + (61  - 116) * t)
    const b = Math.round(117 + (107 - 117) * t)
    document.documentElement.style.setProperty('--t3-pink-inject', `rgb(${r},${g},${b})`)

    // T3: space-separated list of active elements as data attribute
    const elems = C.site.t3Elements ?? {}
    const active = (Object.keys(elems) as (keyof typeof elems)[]).filter(k => elems[k]).join(' ')
    if (active) document.documentElement.setAttribute('data-t3', active)
    else document.documentElement.removeAttribute('data-t3')
  }, [C.site.theme, C.site.t2PinkIntensity, C.site.t3PinkInject, C.site.t3Elements])

  return <Ctx.Provider value={{ lang, C, setLang, refreshContent }}>{children}</Ctx.Provider>
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
