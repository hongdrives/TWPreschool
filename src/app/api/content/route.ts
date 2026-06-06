import { NextRequest, NextResponse } from 'next/server'
import { fetchContent } from '@/lib/content'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import type { Lang } from '@/types/content'

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get('lang') ?? 'en') as Lang
  const content = await fetchContent(lang)
  return NextResponse.json(content)
}

export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET
  const auth   = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!secret || auth !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lang, data } = await req.json() as { lang: Lang; data: unknown }
  if (!lang || !data) {
    return NextResponse.json({ error: 'Missing lang or data' }, { status: 400 })
  }

  await supabaseAdmin
    .from('site_content')
    .upsert({ lang, data, updated_at: new Date().toISOString() })
  return NextResponse.json({ ok: true })
}
