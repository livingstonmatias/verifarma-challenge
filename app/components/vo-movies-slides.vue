<script setup lang="ts">
import type { Movie } from '#shared/models/movie'

const {
	movies = [],
} = defineProps<{
	movies?: Array<Movie>
}>()

const containerRef = ref(null)
const swiper = useSwiper(containerRef, {
	effect: 'creative',
	loop: true,
	breakpoints: {
		1: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		640: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		960: {
			slidesPerView: 5,
			spaceBetween: 16,
		},
		1360: {
			slidesPerView: 7,
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
		<div class="vo-slides">
			<swiper-container ref="containerRef">
				<swiper-slide
					v-for="movie in movies"
					:key="movie.id"
				>
					<nuxt-link :to="`/details/${movie.id}`">
						<v-img
							:src="movie.poster"
							:alt="movie.title"
							height="350"
							cover
							loading="lazy"
							class="movie-poster"
						/>
					</nuxt-link>
				</swiper-slide>
			</swiper-container>
			<div class="btn-nav">
				<v-btn
					density="default"
					icon="mdi-chevron-left"
					class="btn-nav-left"
					@click="swiper.prev()"
				/>
				<v-btn
					density="default"
					icon="mdi-chevron-right"
					class="btn-nav-right"
					@click="swiper.next()"
				/>
			</div>
		</div>
	</client-only>
</template>

<style scoped lang="scss">
.vo-slides {
  position: relative;

  .btn-nav {
    opacity: 0;
    transition: opacity 0.3s ease;

    & .btn-nav-left,
    & .btn-nav-right {
      position: absolute;
      z-index: 100;
      top: 50%;
      transform: translateY(-50%);
    }

    & .btn-nav-left {
      left: 0;
    }

    & .btn-nav-right {
      right: 0;
    }
  }

  &:hover {
    .btn-nav {
      opacity: 1;
    }
  }
}
</style>
