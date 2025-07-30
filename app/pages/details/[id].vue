<script setup lang="ts">
definePageMeta({
	layout: 'authenticated',
	middleware: 'authenticated',
})
const router = useRouter()
const route = useRoute()
const { mobile } = useDisplay()
const { user } = useUserSession()

// @ts-ignore
const userId = user.value?.id

const { data: movie } = await useFetch(`/api/movies/${route.params.id}?userId=${userId}`)

const goBack = () => {
	router.go(-1)
}

const addFavorites = async () => {
	const { status } = await useFetch(`/api/users/${userId}/favorites`, {
		method: 'POST',
		body: {
			movieId: movie.value.id,
			poster: movie.value.poster,
		},
	})
	if (status.value == 'success') return true
	return false
}

const deleteFavorites = async () => {
	const { status } = await useFetch(`/api/users/${userId}/favorites/${movie.value.id}`, { method: 'DELETE' })
	if (status.value == 'success') return true
	return false
}

const toogleFavorites = async () => {
	if (movie.value && movie.value.isFavorite) {
		const ok = await deleteFavorites()
		if (!ok) return
	}
	else {
		const ok = await addFavorites()
		if (!ok) return
	}
	movie.value = {
		...movie.value,
		isFavorite: !movie.value.isFavorite,
	}
}
</script>

<template>
	<v-container
		fluid
		class="d-flex  align-center justify-center h-100"
		:class="[mobile? 'w-100' : 'w-75']"
	>
		<v-responsive>
			<v-row>
				<v-col
					cols="12"
					class="d-flex flex-column justify-end"
				>
					<span class="d-flex align-center justify-end py-4">
						<v-btn
							icon="mdi-chevron-left"
							@click="goBack"
						/>
					</span>
					<v-card
						class="pa-4 pa-sm-10 w-100"
					>
						<v-row>
							<v-col
								cols="12"
								md="4"
							>
								<v-parallax
									:src="movie?.poster"
									max-height="450"
								/>
							</v-col>
							<v-col
								cols="12"
								md="8"
								class="d-flex flex-column p-0"
							>
								<v-card-title class="text-wrap text-h4 text-md-h2">
									{{ movie.title }}
								</v-card-title>
								<v-card-item class="px-0">
									<v-row class="h-auto ">
										<v-col
											class="d-flex align-center ga-6"
										>
											<span class="d-flex align-center ga-1">
												<v-rating
													hover
													:length="1"
													:size="32"
													:model-value="1"
													readonly
													color="yellow-accent-2"
												/>
												<pre>{{ movie.rating.toFixed(1) }}</pre>
											</span>
											<span class="d-flex align-center ga-1">
												<v-icon icon="mdi-clock" />
												<pre>{{ movie.duration }} min.</pre>
											</span>
											<span class="d-flex align-center ga-1">
												<v-icon icon="mdi-calendar-blank" />
												<pre>{{ movie.release.slice(0, 4) }} </pre>
											</span>
										</v-col>
									</v-row>
								</v-card-item>
								<v-card-item class="px-0">
									<v-row>
										<v-col
											cols="12"
											class="d-flex align-center"
										>
											<v-chip-group column>
												<v-chip
													v-for="genre in movie.genres"
													:key="genre"
												>
													{{ genre }}
												</v-chip>
											</v-chip-group>
										</v-col>
									</v-row>
								</v-card-item>
								<v-card-item class="flex-grow-1 px-0">
									<v-row>
										<v-col
											cols="12"
											class="align-start"
										>
											<p class="text-body-1 text-justify">
												{{ movie.description }}
											</p>
										</v-col>
									</v-row>
								</v-card-item>
								<v-divider class="my-4" />
								<v-card-actions class="justify-center justify-md-end px-0">
									<v-btn
										icon="mdi-heart"
										size="x-large"
										:color="movie.isFavorite? 'pink':''"
										@click="toogleFavorites"
									/>
								</v-card-actions>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</v-responsive>
	</v-container>
</template>
