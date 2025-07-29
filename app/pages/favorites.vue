<script setup lang="ts">
definePageMeta({
	layout: 'authenticated',
	middleware: 'authenticated',
})
const { user } = useUserSession()
const { data: favorites } = await useFetch(`/api/users/${user.value.id}/favorites`)

const movies = computed(() => {
	return favorites.value.map(favorite => ({
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
