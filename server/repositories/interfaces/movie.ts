import type { Movie, MovieDetail } from '#shared/models/movie'

export interface IMovieRepository {
	findById: (id: number) => Promise<MovieDetail>
	findByGenre: (genreId: number) => Promise<Array<Movie>>
}
