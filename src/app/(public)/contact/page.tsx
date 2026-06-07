'use client'

import { useState } from 'react'
import { useLang } from '@/context/LangContext'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const { C } = useLang()
  const ct = C.contact

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState<boolean>(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="ph">
        <div className="ph-bg" style={{ backgroundImage: "url('/assets/schools/taoyuan-kindergarten.png')", opacity: C.site.heroBgOpacity ?? 0.10 }} />
        <div className="wrap">
          <h1>{ct.title}</h1>
          <p>{ct.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            {/* Left info panel */}
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-info-lbl">Email</span>
                <a className="contact-info-val" href={`mailto:${ct.email}`}>{ct.email}</a>
              </div>

              <div className="contact-item">
                <span className="contact-info-lbl">WhatsApp</span>
                <a
                  className="contact-info-val"
                  href={`https://wa.me/${ct.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}
                >
                  Message us on WhatsApp →
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-info-lbl">LINE</span>
                <span className="contact-info-val">{ct.line}</span>
              </div>

              <div className="contact-response">
                <p>{ct.response}</p>
              </div>
            </div>

            {/* Right contact form */}
            <div className="contact-form-wrap">
              <h2 style={{ marginBottom: '1.25rem' }}>{ct.formTitle}</h2>

              {submitted ? (
                <div style={{ padding: '20px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, color: '#166534', fontSize: 14 }}>
                  Thank you for your message! We will be in touch soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <input id="contact-subject" type="text" name="subject" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" name="message" rows={6} value={form.message} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
