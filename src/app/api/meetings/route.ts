import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getBearerToken, verifyAdminToken } from '@/lib/auth'
import { readMeetings, writeMeetings, type MeetingRequest } from '@/lib/meetings'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const token = getBearerToken(request.headers.get('authorization'))
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  return NextResponse.json(readMeetings())
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<MeetingRequest> | null

  const name = String(body?.name ?? '').trim()
  const phone = String(body?.phone ?? '').trim()
  const company = String(body?.company ?? '').trim()
  const need = String(body?.need ?? '').trim()
  const vision = String(body?.vision ?? '').trim()

  if (!name || !phone) {
    return NextResponse.json(
      { error: 'Name and phone number are required.' },
      { status: 400 },
    )
  }

  const meetings = readMeetings()
  const entry: MeetingRequest = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    company,
    need,
    vision,
    responded: false,
  }

  meetings.unshift(entry)
  writeMeetings(meetings)

  return NextResponse.json(entry, { status: 201 })
}
