'use client'

import { useState, type SubmitEvent } from 'react'
import Link from 'next/link'
import { services } from '@/data/content'
import './schedule.css'

type FormState = {
  type: string
  need: string
  vision: string
  company: string
  name: string
  phone: string
}

const projectTypes = [...services.map((service) => service.title), 'Not sure yet']

const emptyForm: FormState = {
  type: '',
  need: '',
  vision: '',
  company: '',
  name: '',
  phone: '',
}

export default function ScheduleMeetingPage() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const name = form.name.trim()
    const phone = form.phone.trim()

    if (!name || !phone) {
      setStatus('error')
      setError('Name and phone number are required.')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          company: form.company.trim(),
          need: [form.type, form.need.trim()].filter(Boolean).join(': '),
          vision: form.vision.trim(),
        }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || 'Something went wrong. Please try again.')
      }

      setForm(emptyForm)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className="schedule section">
      <div className="container schedule__layout">
        <div className="schedule__intro">
          <Link className="schedule__back" href="/">
            Back home
          </Link>
          <span className="section-label">Start a project</span>
          <h1 className="section-title schedule__title">Tell us about your brand.</h1>
          <p className="section-lede">
            Share a little about your business and what you have in mind. Your name and phone
            number are all we need to get started. Everything else is optional.
          </p>

          <ol className="schedule__steps" aria-label="What happens next">
            <li>
              <strong>You send a request.</strong> It takes a minute.
            </li>
            <li>
              <strong>We get in touch.</strong> A short conversation about your brand and goals.
            </li>
            <li>
              <strong>You get a clear proposal.</strong> Scope, timeline and cost, before any work begins.
            </li>
          </ol>
        </div>

        {status === 'success' ? (
          <div className="schedule__success" role="status">
            <h2>Thank you. We have your request.</h2>
            <p>We will reach out shortly to talk about your project.</p>
            <button type="button" className="btn btn-primary" onClick={() => setStatus('idle')}>
              Send another request
            </button>
          </div>
        ) : (
          <form className="schedule__form" onSubmit={handleSubmit} noValidate>
            <div className="schedule__row">
              <label className="schedule__field">
                <span>
                  Name <em>*</em>
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="schedule__field">
                <span>
                  Phone number <em>*</em>
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  placeholder="+91 00000 00000"
                  autoComplete="tel"
                  required
                />
              </label>
            </div>

            <label className="schedule__field">
              <span>Business or brand name</span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(event) => updateField('company', event.target.value)}
                placeholder="Optional"
                autoComplete="organization"
              />
            </label>

            <label className="schedule__field">
              <span>What do you need?</span>
              <select
                name="type"
                value={form.type}
                onChange={(event) => updateField('type', event.target.value)}
              >
                <option value="">Choose one (optional)</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="schedule__field">
              <span>Tell us more about the project</span>
              <textarea
                name="need"
                rows={3}
                value={form.need}
                onChange={(event) => updateField('need', event.target.value)}
                placeholder="What you do, who your customers are, what you want the website to achieve…"
              />
            </label>

            <label className="schedule__field">
              <span>What does success look like?</span>
              <textarea
                name="vision"
                rows={3}
                value={form.vision}
                onChange={(event) => updateField('vision', event.target.value)}
                placeholder="Optional. Timeline, inspiration, anything that helps us understand your vision."
              />
            </label>

            {error ? (
              <p className="schedule__error" role="alert">
                {error}
              </p>
            ) : null}

            <button
              className="btn btn-primary btn-lg btn-arrow"
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Send my request'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
