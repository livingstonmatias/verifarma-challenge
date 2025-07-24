import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import type { H3Event } from 'h3'

export const signInSchema = z.object({
	email: z.email({ message: 'Email inválido' }),
	password: z.string().min(1, 'La contraseña es obligatoria'),
})

export default defineEventHandler(async (event: H3Event) => {
	const { email, password } = await readValidatedBody(event, signInSchema.parse)
	const { auth: authRepository } = event.context.repositories
	const user = await authRepository.signIn(email)

	if (!(user && await verifyPassword(user.password, password))) {
		throw createError({ statusCode: StatusCodes.UNAUTHORIZED, message: 'Credenciales inválidas' })
	}

	await setUserSession(event, { user: { id: user.id, email: user.email } })
	setResponseStatus(event, StatusCodes.NO_CONTENT)
})
