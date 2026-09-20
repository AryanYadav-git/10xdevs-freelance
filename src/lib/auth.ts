import { createHmac, timingSafeEqual } from 'node:crypto'

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    'dev-admin-session-secret'
  )
}

export function getAdminCredentials() {
  return {
    id: String(process.env.ADMIN_ID ?? '').trim(),
    password: String(process.env.ADMIN_PASSWORD ?? ''),
  }
}

export function createAdminToken() {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000
  const payload = Buffer.from(JSON.stringify({ role: 'admin', exp }), 'utf8').toString(
    'base64url',
  )
  const signature = createHmac('sha256', getSessionSecret()).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

export function verifyAdminToken(token: string | null | undefined) {
  if (!token) return false

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expected = createHmac('sha256', getSessionSecret()).update(payload).digest('base64url')

  try {
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  } catch {
    return false
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      role?: string
      exp?: number
    }
    if (data.role !== 'admin') return false
    if (typeof data.exp !== 'number' || data.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

export function getBearerToken(authorization: string | null) {
  if (!authorization?.startsWith('Bearer ')) return ''
  return authorization.slice(7).trim()
}
