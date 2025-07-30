<script setup lang="ts">
const { mobile } = useDisplay()

const {
	actions = [],
} = defineProps<{
	actions?: Array<IActionItems>
}>()
</script>

<template>
	<v-app-bar class="d-flex align-center justify-center px-4">
		<v-app-bar-title>
			<nuxt-link
				to="/"
				style="text-decoration: none;color:white; cursor: pointer;"
			>Verifarma</nuxt-link>
		</v-app-bar-title>
		<template
			#append
		>
			<template v-if="mobile && actions.length > 1">
				<v-menu
					transition="scale-transition"
				>
					<template #activator="{ props }">
						<v-btn
							icon
							v-bind="props"
						>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="action in actions"
						>
							<v-btn
								:prepend-icon="action.icon"
								v-bind="action.props"
								class="justify-start"
								:block="mobile"
								@click="action.callback"
							>
								{{ action.label }}
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>
			<template
				v-for="action in actions"
				v-else
			>
				<v-btn
					:prepend-icon="action.icon"
					v-bind="action.props"
					class="justify-start"
					@click="action.callback"
				>
					{{ action.label }}
				</v-btn>
			</template>
		</template>
	</v-app-bar>
</template>
