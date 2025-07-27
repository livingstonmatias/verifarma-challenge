<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
	layout: 'public',
	middleware: 'not-allow-authenticated',
})

const router = useRouter()
const { mobile } = useDisplay()

const email = ref<string>('')
const isValid = ref<boolean>(false)
const emailSchema = z.email('Debe ser un correo válido.')
const rules = [
	(value: string) => !!value || 'El correo es requerido.',
	(value: string) => {
		const { success, error } = emailSchema.safeParse(value)
		return success || JSON.parse(error.message)[0].message
	},
]

const goSingUp = () => {
	if (isValid.value) {
		router.push({ path: 'auth/sign-up', query: { email: email.value } })
	}
}
</script>

<template>
	<v-container class="d-flex align-center justify-center hero-background">
		<v-responsive max-width="600">
			<v-form
				v-model="isValid"
				@submit.prevent="goSingUp"
			>
				<v-card
					class="pa-12 pb-8 w-auto"
					elevation="8"
					rounded="lg"
				>
					<v-row>
						<v-col cols="12">
							<v-card-title class="text-h3">
								Películas y series
							</v-card-title>
						</v-col>
						<v-col
							cols="12"
							sm="8"
						>
							<v-text-field
								v-model="email"
								:rules="rules"
								density="compact"
								placeholder="Direccion de email"
								prepend-inner-icon="mdi-email-outline"
								variant="outlined"
							/>
						</v-col>
						<v-col
							cols="12"
							sm="4"
						>
							<v-btn
								type="submit"
								color="red-darken-4"
								size="large"
								variant="elevated"
								:block="mobile"
							>
								Subscribite
							</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-form>
		</v-responsive>
	</v-container>
</template>
