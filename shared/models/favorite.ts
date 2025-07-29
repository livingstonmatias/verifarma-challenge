import type { InferSelectModel } from 'drizzle-orm'
import type { favorites } from '@@/server/database/schemas'

export type IFavoriteModel = InferSelectModel<typeof favorites>

export interface Favorite {
	id: number
	userId: string
	movieId: number
	createdAt: string
}

export interface FavoriteRepository {
	find: (userId: number) => Promise<Array<IFavoriteModel> | null>
	create: (data: IFavoriteModel) => Promise<void>
	delete: (userId: number, movieId: number) => Promise<void>
}
