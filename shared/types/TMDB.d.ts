declare interface ITMDBGenre {
	id: number
	name: string
}

declare interface ITMDBMovie {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: Date
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

declare interface ITMDBMovieApiResponse {
	page: number
	results: Array<ITMDBMovie>
	total_pages: number
	total_results: number
}

declare interface ITMDBMovieDetail {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: BelongsToCollection
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	origin_country: string[]
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

declare interface ITMDBBelongsToCollection {
	id: number
	name: string
	poster_path: null
	backdrop_path: string
}

declare interface ITMDBGenreApiResponse {
	genres: Array<ITMDBGenre>
}

declare interface ITMDBGenre {
	id: number
	name: string
}

declare interface ITMDBProductionCompany {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

declare interface ITMDBProductionCountry {
	iso_3166_1: string
	name: string
}

declare interface ITMDBSpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}
