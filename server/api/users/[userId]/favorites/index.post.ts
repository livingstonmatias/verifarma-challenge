import type { H3Event } from 'h3'
import { z } from 'zod'

const favoriteSchema = z.object({
	movieId: z.number().min(1),
	poster: z.string().min(1).max(150),
})

export default defineEventHandler(async (event: H3Event) => {
	const userId = getRouterParam(event, 'userId')
	const body = await readValidatedBody(event, favoriteSchema.parse)

	const data = {
		...body,
		userId,
	}
	const { favorite: favoriteRepository } = event.context.repositories
	return favoriteRepository.create(data)
})
