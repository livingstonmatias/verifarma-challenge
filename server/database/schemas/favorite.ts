import { integer, pgTable, unique, varchar, timestamp } from 'drizzle-orm/pg-core'

export const favorites = pgTable('favorites', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer('user_id').notNull(),
	movieId: integer('movie_id').notNull(),
	poster: varchar(),
	createdAt: timestamp('created_at').defaultNow(),
}, table => [
	unique().on(table.userId, table.movieId),
])
