<script setup lang="ts">
const router = useRouter()
const { clear } = useUserSession()

const actions: Array<IActionItems> = [
	{
		label: 'Home',
		icon: 'mdi-home',
		callback: () => {
			router.push('/home')
		},
	},
	{
		label: 'Favoritos',
		icon: 'mdi-heart',
		callback: () => {
			router.push('/favorites')
		},

	},
	{
		label: 'Salir',
		icon: 'mdi-exit-to-app',
		callback: async () => {
			await clear()
			router.push('/auth/sign-in')
		},
	},
]
</script>

<template>
	<v-app>
		<vo-navbar :actions="actions" />
		<v-main>
			<nuxt-page :transition="{ name: 'fade', mode: 'out-in' }" />
		</v-main>
	</v-app>
</template>
