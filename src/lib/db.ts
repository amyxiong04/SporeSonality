import postgres, { Sql } from 'postgres'

const DB_URL = process.env.NEXT_PUBLIC_DB_URL

if (!DB_URL) {
  throw new Error('Database connection string is missing in NEXT_PUBLIC_DB_URL')
}

export const sql: Sql<any> = postgres(DB_URL)
export default sql


