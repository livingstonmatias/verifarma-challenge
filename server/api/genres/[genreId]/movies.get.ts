import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
	const genreId = getRouterParam(event, 'genreId')
	const { movie: movieRepository } = event.context.repositories
	return movieRepository.findByGenre(genreId)
})
