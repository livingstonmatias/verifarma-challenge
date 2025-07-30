import type { IMovieRepository } from './interfaces/movie'

const apiKey = process.env.TMDB_API_KEY
const urlBase = process.env.TMDB_API_BASE_URL
const urlMedia = process.env.TMDB_MEDIA_URL

export const MovieRepository: IMovieRepository = {
	findById: async (id: number) => {
		const url = urlBase + '/movie/' + id
		const urlPoster = urlMedia + '/w300_and_h450_bestv2'
		const movieResponse = await $fetch<ITMDBMovieDetail>(url, {
			params: {
				language: 'es',
				api_key: apiKey,
			},
		})
		return {
			id: movieResponse.id,
			title: movieResponse.title,
			description: movieResponse.overview,
			rating: movieResponse.vote_average,
			poster: urlPoster + movieResponse.poster_path,
			genres: movieResponse.genres.map(genre => genre.name),
			release: movieResponse.release_date,
			duration: movieResponse.runtime,
		}
	},
	findByGenre: async (genreId: number) => {
		const url = urlBase + '/discover/movie'
		const urlPoster = urlMedia + '/w220_and_h330_face'
		const moviesResponse = await $fetch<ITMDBMovieApiResponse>(url, {
			params: {
				include_adult: false,
				include_video: false,
				language: 'es',
				page: 1,
				sort_by: 'popularity.desc',
				api_key: apiKey,
				with_genres: genreId,
			},
		})

		return moviesResponse.results.map(({ id, title, poster_path }) => ({ id, title, poster: urlPoster + poster_path }))
	},
}
