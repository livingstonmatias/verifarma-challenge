import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
})
