<script setup lang="ts">
definePageMeta({
	layout: 'authenticated',
	middleware: 'authenticated',
})
</script>

<template>
	<v-container
		fluid
	>
		<h2>
			Favoritos
		</h2>
		<vo-movies-slides />
	</v-container>
</template>
