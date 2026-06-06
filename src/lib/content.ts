import type { Lang, SiteContent } from '@/types/content'
import { DEFAULT_EN, DEFAULT_ZH } from './defaultContent'
import { supabase } from './supabase'

export function getDefault(lang: Lang): SiteContent {
  return lang === 'zh' ? DEFAULT_ZH : DEFAULT_EN
}

export async function fetchContent(lang: Lang): Promise<SiteContent> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('lang', lang)
      .single()

    if (error || !data?.data) return getDefault(lang)

    const stored = data.data as Partial<SiteContent>
    const def = getDefault(lang)
    return mergeContent(def, stored)
  } catch {
    return getDefault(lang)
  }
}

export async function saveContent(lang: Lang, content: SiteContent): Promise<void> {
  await supabase
    .from('site_content')
    .upsert({ lang, data: content, updated_at: new Date().toISOString() })
}

function mergeContent(def: SiteContent, stored: Partial<SiteContent>): SiteContent {
  const result = { ...def }
  for (const key of Object.keys(def) as (keyof SiteContent)[]) {
    const ov = stored[key]
    if (ov === undefined) continue
    if (key === 'programs') {
      const defSchools = def.programs.schools
      const storedSchools = (stored.programs?.schools ?? [])
      const merged = storedSchools.map(s => {
        const d = defSchools.find(x => x.id === s.id) ?? {}
        return { ...d, ...s }
      })
      defSchools.forEach(d => { if (!merged.find(x => x.id === d.id)) merged.push(d) })
      result.programs = { ...def.programs, ...(ov as typeof def.programs), schools: merged }
    } else if (key === 'about') {
      const defAbout = def.about
      const storedAbout = (stored.about ?? {}) as Partial<typeof def.about>
      const merged = { ...defAbout, ...storedAbout }
      if ((storedAbout.teamVersion ?? 0) < (defAbout.teamVersion ?? 0)) {
        merged.team = defAbout.team
        merged.teamVersion = defAbout.teamVersion
      }
      result.about = merged
    } else if (typeof def[key] === 'object' && def[key] !== null) {
      // @ts-expect-error dynamic merge
      result[key] = { ...def[key], ...ov }
    } else {
      // @ts-expect-error dynamic merge
      result[key] = ov
    }
  }
  return result
}
