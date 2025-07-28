import { Auth } from '@@/server/repositories/auth.repository'
import { GenreRepository } from '@@/server/repositories/genre.repository'
import { MovieRepository } from '@@/server/repositories/movie.repository'

export default defineNitroPlugin((nitro) => {
	nitro.hooks.hook('request', (event) => {
		event.context.repositories = {
			auth: Auth,
			genre: GenreRepository,
			movie: MovieRepository,
		}
	})
})
