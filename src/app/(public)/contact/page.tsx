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
                <span className="contact-label">Email</span>
                <a className="contact-value" href={`mailto:${ct.email}`}>{ct.email}</a>
              </div>

              <div className="contact-item">
                <span className="contact-label">WhatsApp</span>
                <span className="contact-value">{ct.whatsapp}</span>
              </div>

              <div className="contact-item">
                <span className="contact-label">LINE</span>
                <span className="contact-value">{ct.line}</span>
              </div>

              <div className="contact-response">
                <p>{ct.response}</p>
              </div>
            </div>

            {/* Right contact form */}
            <div className="contact-form-wrap">
              <h2>{ct.formTitle}</h2>

              {submitted ? (
                <div className="form-thanks">
                  <p>Thank you for your message! We will be in touch soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="fg">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="fg">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="fg">
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="fg">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-full">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
