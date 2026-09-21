import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getBearerToken, verifyAdminToken } from '@/lib/auth'
import { createMeeting, listMeetings, type MeetingRequest } from '@/lib/meetings'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const token = getBearerToken(request.headers.get('authorization'))
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const meetings = await listMeetings()
    return NextResponse.json(meetings)
  } catch (error) {
    console.error('Failed to list meetings', error)
    return NextResponse.json({ error: 'Could not load meeting requests.' }, { status: 500 })
  }
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

  try {
    const entry = await createMeeting({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      company,
      need,
      vision,
      responded: false,
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Failed to create meeting', error)
    return NextResponse.json({ error: 'Could not save meeting request.' }, { status: 500 })
  }
}
