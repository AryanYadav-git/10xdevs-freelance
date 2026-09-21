import { NextResponse } from 'next/server'
import { getBearerToken, verifyAdminToken } from '@/lib/auth'
import { deleteMeeting, updateMeetingResponded } from '@/lib/meetings'

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

  try {
    const updated = await updateMeetingResponded(id, body.responded)
    if (!updated) {
      return NextResponse.json({ error: 'Meeting request not found.' }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Failed to update meeting', error)
    return NextResponse.json({ error: 'Could not update meeting request.' }, { status: 500 })
  }
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

  try {
    const deleted = await deleteMeeting(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Meeting request not found.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to delete meeting', error)
    return NextResponse.json({ error: 'Could not delete meeting request.' }, { status: 500 })
  }
}
