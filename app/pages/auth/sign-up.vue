<script setup lang="ts">
import type { ZodType } from 'zod'
import { z } from 'zod'

definePageMeta({
	layout: 'public',
	middleware: 'not-allow-authenticated',
})
const { fetch: fetchUserSession } = useUserSession()

const form = ref({
	name: '',
	email: '',
	password: '',
})
const isValid = ref<boolean>(false)
const signUpSchema = {
	name: z.string(),
	email: z.email('Debe ser un correo válido.'),
	password: z.string().min(8, 'La contraseña debe tener un minimo de 8 caracteres.'),
}
const required = (value: string) => !!value || 'El campo es requerido.'
const validateSchema = (schema: ZodType) => {
	return (value: string) => {
		const { success, error } = schema.safeParse(value)
		return success || JSON.parse(error.message)[0].message
	}
}
const validateRepeatPassword = (value: string) => {
	return value == form.value.password || 'Las contraseñas no coinciden.'
}

const repeatPassword = ref<string>('')
const router = useRouter()
const route = useRoute()
const visible = ref<[boolean, boolean]>([false, false])
onMounted(() => {
	if (route.query.email) {
		form.value.email = route.query.email as string
	}
})
const { execute, pending, error } = useFetch('/api/auth/sign-up', {
	method: 'POST',
	body: form.value,
	immediate: false,
	onResponse: async () => {
		await fetchUserSession()
		router.push('/auth/sign-in')
	},
})
const signUp = async () => {
	if (!isValid.value) return
	await execute()
}
</script>

<template>
	<v-container class="d-flex align-center justify-center">
		<v-responsive max-width="600">
			<v-form
				v-model="isValid"
				@submit.prevent="signUp"
			>
				<v-card
					class="mx-auto pa-4 pa-sm-10 pb-8"
					elevation="8"
					max-width="448"
					rounded="lg"
				>
					<v-card-title>
						Crear Cuenta
					</v-card-title>
					<v-card-item>
						<v-text-field
							v-model="form.name"
							density="compact"
							placeholder="Nombre"
							variant="outlined"
						/>
						<v-text-field
							v-model="form.email"
							:rules="[required, validateSchema(signUpSchema.email)]"
							density="compact"
							placeholder="Direccion de email"
							prepend-inner-icon="mdi-email-outline"
							variant="outlined"
						/>
						<v-text-field
							v-model="form.password"
							:rules="[required, validateSchema(signUpSchema.password)]"
							:append-inner-icon="visible.at(0) ? 'mdi-eye-off' : 'mdi-eye'"
							:type="visible.at(0) ? 'text' : 'password'"
							density="compact"
							placeholder="Ingresa tu contraseña"
							prepend-inner-icon="mdi-lock-outline"
							variant="outlined"
							@click:append-inner="visible[0] = !visible.at(0)"
						/>
						<v-text-field
							v-model="repeatPassword"
							:rules="[required, validateSchema(signUpSchema.password), validateRepeatPassword]"
							:append-inner-icon="visible.at(1) ? 'mdi-eye-off' : 'mdi-eye'"
							:type="visible.at(1) ? 'text' : 'password'"
							density="compact"
							placeholder="Repita la contraseña"
							prepend-inner-icon="mdi-lock-outline"
							variant="outlined"
							@click:append-inner="visible[1] = !visible.at(1)"
						/>
						<v-alert
							v-if="error"
							type="error"
							variant="tonal"
							class="mb-4"
						>
							Tuvimos problemas para procesar la solicitud. Por favor intentelo mas tarde.
						</v-alert>
						<v-btn
							class="mb-8"
							color="red-darken-4"
							size="large"
							variant="elevated"
							block
							type="submit"
							:loading="pending"
						>
							Crear Cuenta
						</v-btn>
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
