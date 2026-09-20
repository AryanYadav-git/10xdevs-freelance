import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dataDir = join(root, 'data')
const meetingsPath = join(dataDir, 'meetings.json')
const distPath = join(root, 'dist')
const PORT = Number(process.env.PORT) || 3001

function ensureMeetingsFile() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }
  if (!existsSync(meetingsPath)) {
    writeFileSync(meetingsPath, '[]\n', 'utf8')
  }
}

function readMeetings() {
  ensureMeetingsFile()
  try {
    const raw = readFileSync(meetingsPath, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeMeetings(meetings) {
  ensureMeetingsFile()
  writeFileSync(meetingsPath, `${JSON.stringify(meetings, null, 2)}\n`, 'utf8')
}

const app = express()
app.use(express.json({ limit: '64kb' }))

app.get('/api/meetings', (_req, res) => {
  res.json(readMeetings())
})

app.post('/api/meetings', (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const phone = String(req.body?.phone ?? '').trim()
  const company = String(req.body?.company ?? '').trim()
  const need = String(req.body?.need ?? '').trim()
  const vision = String(req.body?.vision ?? '').trim()

  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone number are required.' })
    return
  }

  const meetings = readMeetings()
  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    company,
    need,
    vision,
  }

  meetings.unshift(entry)
  writeMeetings(meetings)

  res.status(201).json(entry)
})

if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`API listening on http://127.0.0.1:${PORT}`)
})
