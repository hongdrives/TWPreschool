import { supabaseAdmin } from '@/lib/supabaseAdmin'
import type { SiteContent } from '@/types/content'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json() as {
      name: string; email: string; subject: string; message: string
    }

    // Read admin email from Supabase content
    const { data: row } = await supabaseAdmin
      .from('site_content')
      .select('data')
      .eq('lang', 'en')
      .single()
    const content = row?.data as SiteContent | null
    const adminEmail = content?.site?.email ?? 'contact@preschoolexchange.org'

    // Send via Resend if RESEND_API_KEY is set in Vercel env vars
    // Setup: resend.com → Add Domain (preschoolexchange.org) → copy API key
    // → Vercel project → Settings → Environment Variables → RESEND_API_KEY
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Taiwan Preschool Exchange <noreply@preschoolexchange.org>',
        to: adminEmail,
        replyTo: email,
        subject: `[Contact] ${subject}`,
        text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return Response.json({ ok: false }, { status: 500 })
  }
}
