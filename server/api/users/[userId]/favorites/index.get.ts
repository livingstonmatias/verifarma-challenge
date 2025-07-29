import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
	const userId = getRouterParam(event, 'userId')
	const { favorite: favoriteRepository } = event.context.repositories
	return favoriteRepository.find(userId)
})
