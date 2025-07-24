import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import type { H3Event } from 'h3'

export const signInSchema = z.object({
	name: z.string(),
	email: z.email({ message: 'Email inválido' }),
	password: z.string().min(8, 'La contraseña debe tener un minimo de 8 caracteres.'),
})

export default defineEventHandler(async (event: H3Event) => {
	const body = await readValidatedBody(event, signInSchema.parse)
	const password = await hashPassword(body.password)
	const { auth: authRepository } = event.context.repositories

	authRepository.signUp({ ...body, password })
	setResponseStatus(event, StatusCodes.CREATED)
})
