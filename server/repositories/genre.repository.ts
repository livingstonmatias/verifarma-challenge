import type { IGenreRepository } from './interfaces/genre'
import type { Genre } from '#shared/models/genre'

const apiKey = process.env.TMDB_API_KEY
export const GenreRepository: IGenreRepository = {
	findAll: async () => {
		const url = process.env.TMDB_API_BASE_URL + '/genre/movie/list'

		const genresResponse = await $fetch<ITMDBGenreApiResponse>(url, {
			params: {
				language: 'es',
				api_key: apiKey,
			},
		})

		return genresResponse.genres as unknown as Array<Genre>
	},
}
