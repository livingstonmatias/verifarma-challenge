export interface Favorite {
	id: number
	userId: number
	movieId: number
}

export interface FavoriteRepository {
	findAll: () => Promise<Array<Favorite>>
	create: () => Promise<void>
}
