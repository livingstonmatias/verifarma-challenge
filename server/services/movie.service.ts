import type { H3Event } from 'h3'

export const MovieService = {
	getMovieWithFavorites: async (event: H3Event, movieId: number, userId?: number) => {
		const { movie: movieRepository, favorite: favoriteRepository } = event.context.repositories
		const movieDetail = await movieRepository.findById(movieId)

		if (!userId) {
			return movieDetail
		}
		const favorites = await favoriteRepository.find(userId)

		const detail = favorites.find((favorite: { movieId: number }) => favorite.movieId == movieDetail.id)

		if (detail) {
			movieDetail.isFavorite = true
		}
		else {
			movieDetail.isFavorite = false
		}
		return movieDetail
	},
}
