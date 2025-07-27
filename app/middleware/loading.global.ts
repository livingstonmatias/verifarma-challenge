export default defineNuxtRouteMiddleware(() => {
	const router = useRouter()
	const loading = useLoadingRoute()
	loading.value = true

	router.afterEach(() => {
		loading.value = false
	})
})
