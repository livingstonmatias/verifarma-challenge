import type { H3Event } from 'h3'
import { MovieService } from '@@/server/services/movie.service'

export default defineEventHandler((event: H3Event) => {
	const movieId = getRouterParam(event, 'id')
	const { userId } = getQuery(event)

	return MovieService.getMovieWithFavorites(event, Number(movieId), Number(userId))
})
