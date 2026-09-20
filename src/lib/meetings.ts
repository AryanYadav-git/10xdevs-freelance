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
    return Array.isArray(parsed) ? (parsed as MeetingRequest[]) : []
  } catch {
    return []
  }
}

export function writeMeetings(meetings: MeetingRequest[]) {
  ensureMeetingsFile()
  writeFileSync(getMeetingsPath(), `${JSON.stringify(meetings, null, 2)}\n`, 'utf8')
}
