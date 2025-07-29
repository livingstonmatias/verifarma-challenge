import type { H3Event } from 'h3'
import { z } from 'zod'

const favoriteSchema = z.object({
	userId: z.number().min(1),
	movieId: z.number().min(1),
})

export default defineEventHandler(async (event: H3Event) => {
	const params = getRouterParams(event)
	const userId = Number(params.userId)
	const movieId = Number(params.movieId)
	favoriteSchema.parse({ userId, movieId })

	const { favorite: favoriteRepository } = event.context.repositories
	return favoriteRepository.delete(userId, movieId)
})
