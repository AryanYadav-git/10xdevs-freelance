import { NextResponse } from 'next/server'
import { createAdminToken, getAdminCredentials } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: string
    password?: string
  } | null

  const email = String(body?.email ?? '').trim().toLowerCase()
  const password = String(body?.password ?? '')
  const { id, password: adminPassword } = getAdminCredentials()

  if (!id || !adminPassword || email !== id.toLowerCase() || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid login id or password.' }, { status: 401 })
  }

  return NextResponse.json({ token: createAdminToken() })
}
