import { NextResponse } from 'next/server'
import { getBearerToken, verifyAdminToken } from '@/lib/auth'
import { readMeetings, writeMeetings } from '@/lib/meetings'

export const runtime = 'nodejs'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: RouteContext) {
  const token = getBearerToken(request.headers.get('authorization'))
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const { id } = await context.params
  if (!id) {
    return NextResponse.json({ error: 'Meeting id is required.' }, { status: 400 })
  }

  const body = (await request.json().catch(() => null)) as { responded?: boolean } | null
  if (typeof body?.responded !== 'boolean') {
    return NextResponse.json({ error: 'responded must be a boolean.' }, { status: 400 })
  }

  const meetings = readMeetings()
  const index = meetings.findIndex((meeting) => meeting.id === id)
  if (index < 0) {
    return NextResponse.json({ error: 'Meeting request not found.' }, { status: 404 })
  }

  const updated = {
    ...meetings[index],
    responded: body.responded,
    respondedAt: body.responded ? new Date().toISOString() : undefined,
  }

  meetings[index] = updated
  writeMeetings(meetings)
  return NextResponse.json(updated)
}

export async function DELETE(request: Request, context: RouteContext) {
  const token = getBearerToken(request.headers.get('authorization'))
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const { id } = await context.params
  if (!id) {
    return NextResponse.json({ error: 'Meeting id is required.' }, { status: 400 })
  }

  const meetings = readMeetings()
  const next = meetings.filter((meeting) => meeting.id !== id)

  if (next.length === meetings.length) {
    return NextResponse.json({ error: 'Meeting request not found.' }, { status: 404 })
  }

  writeMeetings(next)
  return NextResponse.json({ ok: true })
}
