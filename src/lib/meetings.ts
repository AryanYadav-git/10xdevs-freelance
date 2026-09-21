import { getDb } from '@/lib/mongodb'

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

type MeetingDocument = MeetingRequest & { _id?: unknown }

const COLLECTION = 'meetings'

function toMeeting(doc: MeetingDocument): MeetingRequest {
  return {
    id: String(doc.id ?? ''),
    createdAt: String(doc.createdAt ?? ''),
    name: String(doc.name ?? ''),
    phone: String(doc.phone ?? ''),
    company: String(doc.company ?? ''),
    need: String(doc.need ?? ''),
    vision: String(doc.vision ?? ''),
    responded: Boolean(doc.responded),
    respondedAt: doc.respondedAt ? String(doc.respondedAt) : undefined,
  }
}

async function meetingsCollection() {
  const db = await getDb()
  return db.collection<MeetingDocument>(COLLECTION)
}

export async function listMeetings(): Promise<MeetingRequest[]> {
  const collection = await meetingsCollection()
  const docs = await collection.find({}).sort({ createdAt: -1 }).toArray()
  return docs.map(toMeeting)
}

export async function createMeeting(
  input: Omit<MeetingRequest, 'responded' | 'respondedAt'> & {
    responded?: boolean
    respondedAt?: string
  },
): Promise<MeetingRequest> {
  const entry: MeetingRequest = {
    ...input,
    responded: input.responded ?? false,
    respondedAt: input.respondedAt,
  }

  const collection = await meetingsCollection()
  await collection.insertOne({ ...entry })
  return entry
}

export async function updateMeetingResponded(
  id: string,
  responded: boolean,
): Promise<MeetingRequest | null> {
  const collection = await meetingsCollection()
  const respondedAt = responded ? new Date().toISOString() : undefined

  const result = await collection.findOneAndUpdate(
    { id },
    responded
      ? { $set: { responded: true, respondedAt } }
      : { $set: { responded: false }, $unset: { respondedAt: '' } },
    { returnDocument: 'after' },
  )

  if (!result) return null
  return toMeeting(result)
}

export async function deleteMeeting(id: string): Promise<boolean> {
  const collection = await meetingsCollection()
  const result = await collection.deleteOne({ id })
  return result.deletedCount > 0
}
