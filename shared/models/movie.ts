export type Movie = Pick<MovieDetail, 'id' | 'title' | 'poster'>

export interface MovieDetail {
	id: number
	title: string
	description: string
	rating: number
	poster: string
	genres: Array<string>
	release: string
	duration: number
}
