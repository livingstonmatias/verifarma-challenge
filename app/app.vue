<script setup lang="ts">
const loading = useLoadingRoute()
</script>

<template>
	<v-app>
		<nuxt-layout>
			<nuxt-page />
			<nuxt-route-announcer />
		</nuxt-layout>
		<v-overlay
			:model-value="loading"
			class="d-flex align-center justify-center z-50"
			persistent
		>
			<v-progress-circular
				color="primary"
				indeterminate
				size="64"
			/>
		</v-overlay>
	</v-app>
</template>
