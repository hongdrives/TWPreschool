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

  return <Ctx.Provider value={{ lang, C, setLang, refreshContent }}>{children}</Ctx.Provider>
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
