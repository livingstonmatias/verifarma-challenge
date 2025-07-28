<script setup lang="ts">
definePageMeta({
	layout: 'authenticated',
	middleware: 'authenticated',
})
const router = useRouter()
const route = useRoute()
const { mobile } = useDisplay()
const { data: movie } = await useFetch(`/api/movies/${route.params.id}}`)

const goBack = () => {
	router.go(-1)
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
							prepend-icon="mdi-chevron-left"
							@click="goBack"
						>
							volver
						</v-btn>
					</span>
					<v-card
						class="pa-10 w-100"
					>
						<v-row>
							<v-col
								cols="12"
								md="4"
							>
								<v-parallax
									:src="movie.poster"
									max-height="450"
								/>
							</v-col>
							<v-col
								cols="12"
								md="8"
								class="d-flex flex-column"
							>
								<v-card-title>
									<h2 style="text-wrap: wrap;">
										{{ movie.title }}
									</h2>
								</v-card-title>
								<v-card-item>
									<v-row class="h-auto">
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
								<v-card-item>
									<v-row>
										<v-col
											cols="12"
											class="d-flex align-center"
										>
											<v-chip-group>
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
								<v-card-item class="flex-grow-1">
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
								<v-card-actions class="justify-end">
									<v-btn
										icon="mdi-heart"
										size="x-large"
										color="blue-darken-4"
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
