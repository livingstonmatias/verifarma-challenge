<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
	layout: 'public',
	middleware: 'not-allow-authenticated',
})
const { fetch: fetchUserSession } = useUserSession()
const router = useRouter()
const visible = ref<boolean>(false)
const form = ref({
	email: '',
	password: '',
})
const emailSchema = z.email('Debe ser un correo válido.')
const required = (value: string) => !!value || 'El campo es requerido.'

const rules = {
	email: [
		required,
		(value: string) => {
			const { success, error } = emailSchema.safeParse(value)
			return success || JSON.parse(error.message)[0].message
		},
	],
	password: [
		required,
	],
}

const { execute, pending, error } = useFetch('/api/auth/sign-in', {
	method: 'POST',
	body: form.value,
	immediate: false,
	onResponse: async ({ response }) => {
		if (!response.ok) return
		await fetchUserSession()
		router.push('/home')
	},
})
const isValid = ref<boolean>(false)

const signIn = async () => {
	if (!isValid.value) return
	await execute()
}
</script>

<template>
	<v-container class="d-flex align-center justify-center">
		<v-responsive max-width="600">
			<v-form
				v-model="isValid"
				@submit.prevent="signIn"
			>
				<v-card
					class="mx-auto pa-12 pb-8"
					elevation="8"
					max-width="448"
					rounded="lg"
				>
					<v-card-title>
						Iniciar Sesiion
					</v-card-title>
					<v-card-item>
						<v-text-field
							v-model="form.email"
							:rules="rules.email"
							density="compact"
							placeholder="Direccion de email"
							prepend-inner-icon="mdi-email-outline"
							variant="outlined"
						/>
						<v-text-field
							v-model="form.password"
							:rules="rules.password"
							:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
							:type="visible ? 'text' : 'password'"
							density="compact"
							placeholder="Ingresa tu contraseña"
							prepend-inner-icon="mdi-lock-outline"
							variant="outlined"
							@click:append-inner="visible = !visible"
						/>
						<v-alert
							v-if="error"
							type="error"
							variant="tonal"
							class="mb-4"
						>
							Tuvimos problemas para validar sus credenciales. Vuelva a intentar.
						</v-alert>
						<v-btn
							type="submit"
							color="red-darken-4"
							size="large"
							variant="elevated"
							block
							:loading="pending"
						>
							Iniciar
						</v-btn>
						<v-card-text class="text-center">
							<a
								class="text-blue text-decoration-none cursor-pointer"
								rel="noopener noreferrer"
								@click="router.push('sign-up')"
							>
								Crear una cuenta ahora <v-icon icon="mdi-chevron-right" />
							</a>
						</v-card-text>
					</v-card-item>
					<v-card-actions class="pt-0 justify-end">
						<v-btn
							variant="outlined"
							prepend-icon="mdi-arrow-left"
							@click="router.push('/')"
						>
							Volver
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-responsive>
	</v-container>
</template>
