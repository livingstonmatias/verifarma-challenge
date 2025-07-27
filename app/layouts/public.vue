<script setup lang="ts">
const router = useRouter()
const actions: Array<IActionItems> = [
	{
		label: 'Ingresar',
		props: {
			color: 'red-darken-4',
			variant: 'elevated',
			size: 'large',
		},
		callback() {
			router.push('/auth/sign-in')
		},
	},
]
</script>

<template>
	<vo-navbar :actions="actions" />
	<v-main class="d-flex align-center justify-center">
		<nuxt-page />
	</v-main>
</template>
