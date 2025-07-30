import { describe, it, expect, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'

import { VoMoviesSlides } from '#components'
import type { Movie } from '#shared/models/movie'

const movies: Array<Movie> = [
	{ id: 1, title: 'Movie 1', poster: 'poster1.jpg' },
	{ id: 2, title: 'Movie 2', poster: 'poster2.jpg' },
	{ id: 3, title: 'Movie 3', poster: 'poster3.jpg' },
]

const { useSwiperMock } = vi.hoisted(() => {
	return {
		useSwiperMock: vi.fn(() => {
			return {
				prev: vi.fn(),
				next: vi.fn(),
			}
		}),
	}
})

mockNuxtImport('useSwiper', () => useSwiperMock)

describe('VoMoviesSlides', () => {
	it('Debería renderizar todas las películas en el slide', async () => {
		const wrapper = await mountSuspended(VoMoviesSlides, {
			props: {
				movies,
			},
		})

		const slides = wrapper.findAll('swiper-slide')
		expect(slides.length).toBe(movies.length)
	})

	it('Debería llamar a swiper.prev cuando se hace clic en el botón izquierdo', async () => {
		const prevSpy = vi.fn()
		useSwiperMock.mockImplementation(() => ({
			next: vi.fn(),
			prev: prevSpy,
		}))

		const wrapper = await mountSuspended(VoMoviesSlides, {
			props: {
				movies,
			},
		})

		await wrapper.find('.btn-nav-left').trigger('click')
		expect(prevSpy).toHaveBeenCalled()
	})

	it('Debería llamar a swiper.next cuando se hace clic en el botón derecho', async () => {
		const nextSpy = vi.fn()
		useSwiperMock.mockImplementation(() => ({
			next: nextSpy,
			prev: vi.fn(),
		}))

		const wrapper = await mountSuspended(VoMoviesSlides, {
			props: {
				movies,
			},
		})

		await wrapper.find('.btn-nav-right').trigger('click')
		expect(nextSpy).toHaveBeenCalled()
	})

	it('No debería renderizar nada cuando no se proporcionan películas', async () => {
		const wrapper = await mountSuspended(VoMoviesSlides)

		const slides = wrapper.findAll('swiper-slide')
		expect(slides.length).toBe(0)
	})
})
