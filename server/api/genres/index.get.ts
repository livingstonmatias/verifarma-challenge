import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
	const { genre: genreRepository } = event.context.repositories
	return genreRepository.findAll()
})
