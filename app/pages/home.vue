<script setup lang="ts">
import type { Genre } from '#shared/models/genre'

definePageMeta({
	layout: 'authenticated',
	middleware: 'authenticated',
})

const { data: genres } = await useAsyncData('movies', async () => {
	const genres = await $fetch<Array<Genre>>('/api/genres')
	return genres.map(genre => ({ ...genre, movies: [] }))
})

const generator: Generator<Genre> = createGenerator<Genre>(genres.value ?? [])

const loadMovies = async () => {
	const { done, value } = generator.next()
	if (!done) {
		const { data: movies } = await useFetch(`/api/genres/${value.id}/movies`)
		if (movies.value) {
			const g = genres.value?.map((genre) => {
				if (genre.id == value.id) {
					return {
						...genre,
						movies: movies.value,
					}
				}
				return genre
			})
			genres.value = g
		}
	}
	return { done }
}

const load = async (options: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
	const { done } = await loadMovies()
	if (!done) {
		options.done('ok')
	}
	else {
		options.done('empty')
	}
}
await useAsyncData('firstMovies', async () => {
	await loadMovies()
	await loadMovies()
	await loadMovies()
})

const genreMovies = computed(() => {
	return genres.value?.filter(genre => genre.movies.length)
})
</script>

<template>
	<v-container
		fluid
	>
		<v-infinite-scroll
			:items="genreMovies"
			style="overflow: visible;"
			@load="load"
		>
			<div
				v-for="genre in genreMovies"
				:key="genre.id"
				class="mt-10"
			>
				<h2 class="mb-4">
					{{ genre.name }}
				</h2>
				<vo-movies-slides
					:movies="genre.movies"
				/>
			</div>
		</v-infinite-scroll>
	</v-container>
</template>
