import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGODB_URI

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise() {
  if (!uri) {
    throw new Error('MONGODB_URI is not set in the environment.')
  }

  if (!global.__mongoClientPromise) {
    const client = new MongoClient(uri)
    global.__mongoClientPromise = client.connect()
  }

  return global.__mongoClientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  return client.db()
}
