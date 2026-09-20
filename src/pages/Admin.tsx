import { useEffect, useState, type SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

export type MeetingRequest = {
  id: string
  createdAt: string
  name: string
  phone: string
  company: string
  need: string
  vision: string
}

const TOKEN_KEY = 'adminToken'

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function readStoredToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? ''
  } catch {
    return ''
  }
}

export function Admin() {
  const [token, setToken] = useState(readStoredToken)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginStatus, setLoginStatus] = useState<'idle' | 'submitting'>('idle')

  const [meetings, setMeetings] = useState<MeetingRequest[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [error, setError] = useState('')

  async function loadMeetings(authToken: string) {
    setStatus('loading')
    setError('')

    try {
      const response = await fetch('/api/meetings', {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      if (response.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY)
        setToken('')
        setStatus('idle')
        setLoginError('Session expired. Please sign in again.')
        return
      }

      if (!response.ok) {
        throw new Error('Could not load meeting requests.')
      }

      const payload = (await response.json()) as MeetingRequest[]
      setMeetings(Array.isArray(payload) ? payload : [])
      setStatus('ready')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Could not load meeting requests.')
    }
  }

  useEffect(() => {
    if (!token) return
    void loadMeetings(token)
  }, [token])

  async function handleLogin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError('')
    setLoginStatus('submitting')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | { token?: string; error?: string }
        | null

      if (!response.ok || !payload?.token) {
        throw new Error(payload?.error || 'Invalid login id or password.')
      }

      sessionStorage.setItem(TOKEN_KEY, payload.token)
      setToken(payload.token)
      setPassword('')
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Invalid login id or password.')
    } finally {
      setLoginStatus('idle')
    }
  }

  async function handleLogout() {
    const authToken = token
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setMeetings([])
    setStatus('idle')

    if (authToken) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
      }).catch(() => undefined)
    }
  }

  if (!token) {
    return (
      <section className="admin section">
        <div className="container admin__login-wrap">
          <Link className="admin__back" to="/">
            Back home
          </Link>
          <span className="section-label">Admin</span>
          <h1 className="section-title admin__title">Sign in</h1>
          <p className="section-lede">Enter your admin login id and password to view meeting requests.</p>

          <form className="admin__login" onSubmit={handleLogin} noValidate>
            <label className="admin__field">
              <span>Login id</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@gmail.com"
                autoComplete="username"
                required
              />
            </label>

            <label className="admin__field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </label>

            {loginError ? (
              <p className="admin__error" role="alert">
                {loginError}
              </p>
            ) : null}

            <button className="btn btn-primary" type="submit" disabled={loginStatus === 'submitting'}>
              {loginStatus === 'submitting' ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="admin section">
      <div className="container">
        <div className="admin__header">
          <div>
            <Link className="admin__back" to="/">
              Back home
            </Link>
            <span className="section-label">Admin</span>
            <h1 className="section-title admin__title">Meeting requests</h1>
            <p className="section-lede">Submissions from the schedule form, newest first.</p>
          </div>

          <div className="admin__actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => void loadMeetings(token)}
            >
              Refresh
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => void handleLogout()}>
              Log out
            </button>
          </div>
        </div>

        {status === 'loading' ? <p className="admin__status">Loading requests…</p> : null}
        {status === 'error' ? (
          <p className="admin__error" role="alert">
            {error}
          </p>
        ) : null}

        {status === 'ready' && meetings.length === 0 ? (
          <p className="admin__status">No meeting requests yet.</p>
        ) : null}

        {status === 'ready' && meetings.length > 0 ? (
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th scope="col">Received</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Company</th>
                  <th scope="col">Need</th>
                  <th scope="col">Vision</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => (
                  <tr key={meeting.id}>
                    <td>{formatDate(meeting.createdAt)}</td>
                    <td>{meeting.name}</td>
                    <td>
                      <a href={`tel:${meeting.phone}`}>{meeting.phone}</a>
                    </td>
                    <td>{meeting.company || '—'}</td>
                    <td>{meeting.need || '—'}</td>
                    <td>{meeting.vision || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  )
}
