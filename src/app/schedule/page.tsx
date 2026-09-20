'use client'

import { useState, type SubmitEvent } from 'react'
import Link from 'next/link'
import './schedule.css'

type FormState = {
  need: string
  vision: string
  company: string
  name: string
  phone: string
}

const emptyForm: FormState = {
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
          need: form.need.trim(),
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
          <span className="section-label">Schedule a meeting</span>
          <h1 className="section-title schedule__title">Tell me what you’re building</h1>
          <p className="section-lede">
            Share a bit of context so our first conversation starts focused. Name and phone
            number are enough to book time — everything else is optional.
          </p>
        </div>

        {status === 'success' ? (
          <div className="schedule__success" role="status">
            <h2>Request received</h2>
            <p>Thanks — I’ll reach out shortly to confirm a time.</p>
            <button type="button" className="btn btn-primary" onClick={() => setStatus('idle')}>
              Submit another
            </button>
          </div>
        ) : (
          <form className="schedule__form" onSubmit={handleSubmit} noValidate>
            <label className="schedule__field">
              <span>What do you need?</span>
              <textarea
                name="need"
                rows={4}
                value={form.need}
                onChange={(event) => updateField('need', event.target.value)}
                placeholder="Site rebuild, ecommerce, custom app, WordPress headless…"
              />
            </label>

            <label className="schedule__field">
              <span>What’s your vision?</span>
              <textarea
                name="vision"
                rows={4}
                value={form.vision}
                onChange={(event) => updateField('vision', event.target.value)}
                placeholder="Where this should go, who it’s for, what success looks like…"
              />
            </label>

            <label className="schedule__field">
              <span>Company name</span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(event) => updateField('company', event.target.value)}
                placeholder="Optional"
                autoComplete="organization"
              />
            </label>

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
                  placeholder="+1 555 000 0000"
                  autoComplete="tel"
                  required
                />
              </label>
            </div>

            {error ? (
              <p className="schedule__error" role="alert">
                {error}
              </p>
            ) : null}

            <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send meeting request'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
