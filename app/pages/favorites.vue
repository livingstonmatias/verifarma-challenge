<script setup lang="ts">
import type { Favorite } from '#shared/models/favorite'

definePageMeta({
	layout: 'authenticated',
	middleware: 'authenticated',
})
const { user } = useUserSession()
// @ts-ignore
const userId = user.value?.id
const { data: favorites } = await useFetch(`/api/users/${userId}/favorites`)

const movies = computed(() => {
	return favorites.value.map((favorite: Favorite) => ({
		id: favorite.movieId,
		poster: favorite.poster,
	}))
})
</script>

<template>
	<v-container
		fluid
	>
		<h2>
			Favoritos
		</h2>
		<vo-movies-slides :movies="movies" />
	</v-container>
</template>
