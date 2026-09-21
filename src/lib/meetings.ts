import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

export type MeetingRequest = {
  id: string
  createdAt: string
  name: string
  phone: string
  company: string
  need: string
  vision: string
  responded: boolean
  respondedAt?: string
}

function getMeetingsPath() {
  if (process.env.VERCEL) {
    return join('/tmp', 'meetings.json')
  }
  return join(process.cwd(), 'data', 'meetings.json')
}

function ensureMeetingsFile() {
  const file = getMeetingsPath()
  const dir = dirname(file)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  if (!existsSync(file)) {
    writeFileSync(file, '[]\n', 'utf8')
  }
}

export function readMeetings(): MeetingRequest[] {
  ensureMeetingsFile()
  try {
    const raw = readFileSync(getMeetingsPath(), 'utf8')
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => {
      const meeting = item as Partial<MeetingRequest>
      return {
        id: String(meeting.id ?? ''),
        createdAt: String(meeting.createdAt ?? ''),
        name: String(meeting.name ?? ''),
        phone: String(meeting.phone ?? ''),
        company: String(meeting.company ?? ''),
        need: String(meeting.need ?? ''),
        vision: String(meeting.vision ?? ''),
        responded: Boolean(meeting.responded),
        respondedAt: meeting.respondedAt ? String(meeting.respondedAt) : undefined,
      }
    })
  } catch {
    return []
  }
}

export function writeMeetings(meetings: MeetingRequest[]) {
  ensureMeetingsFile()
  writeFileSync(getMeetingsPath(), `${JSON.stringify(meetings, null, 2)}\n`, 'utf8')
}
