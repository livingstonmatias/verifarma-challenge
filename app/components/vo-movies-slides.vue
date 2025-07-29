<script setup lang="ts">
import type { Movie } from '#shared/models/movie'

const {
	movies = [],
} = defineProps<{
	movies?: Array<Movie>
}>()

const containerRef = ref(null)
useSwiper(containerRef, {
	effect: 'creative',
	loop: true,
	breakpoints: {
		640: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		960: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		1360: {
			slidesPerView: 5,
			spaceBetween: 16,
		},
	},
	creativeEffect: {
		prev: {
			shadow: true,
			translate: [0, 0, -400],
		},
		next: {
			shadow: true,
			translate: [0, 0, -400],
		},
	},
})
</script>

<template>
	<client-only>
		<swiper-container ref="containerRef">
			<swiper-slide
				v-for="movie in movies"
				:key="movie.id"
			>
				<nuxt-link :to="`/details/${movie.id}`">
					<v-img
						:src="movie.poster"
						height="350"
						cover
						loading="lazy"
						class="movie-poster"
					/>
				</nuxt-link>
			</swiper-slide>
		</swiper-container>
	</client-only>
</template>
