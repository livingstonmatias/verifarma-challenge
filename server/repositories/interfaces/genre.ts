import type { Genre } from '#shared/models/genre'

export interface IGenreRepository {
	findAll: () => Promise<Array<Genre>>
}
