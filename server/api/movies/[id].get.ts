import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
	const id = getRouterParam(event, 'id')
	const { movie: movieRepository } = event.context.repositories
	return movieRepository.findById(id)
})
