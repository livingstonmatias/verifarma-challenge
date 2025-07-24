import postgres from 'postgres'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { drizzle } from 'drizzle-orm/postgres-js'

let database: PostgresJsDatabase

export function useDatabase() {
	if (!database) {
		const client = postgres(process.env.DATABASE_URL!)
		database = drizzle({ client })
	}
	return database
}
