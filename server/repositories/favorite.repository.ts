import type { FavoriteRepository, IFavoriteModel } from '#shared/models/favorite'

import { favorites } from '@@/server/database/schemas'
import { useDatabase } from '@@/server/utils/database'
import { eq, and } from 'drizzle-orm'

const database = useDatabase()

export const Favorite: FavoriteRepository = {
	find: async (userId: number) => {
		const result = await database
			.select()
			.from(favorites)
			.where(eq(favorites.userId, userId))
		return result
	},
	create: async (data: IFavoriteModel) => {
		await database.insert(favorites).values(data as IFavoriteModel)
	},
	delete: async (userId: number, movieId: number) => {
		await database.delete(favorites).where(
			and(
				eq(favorites.userId, userId),
				eq(favorites.movieId, movieId),
			),
		)
	},
}
