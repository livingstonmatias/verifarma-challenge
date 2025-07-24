import type { IUserModel } from './interfaces/user'
import type { ISingUp, IAuthRepository } from './interfaces/auth'
import { users } from '@@/server/database/schemas'
import { useDatabase } from '@@/server/utils/database'
import { eq } from 'drizzle-orm'

const database = useDatabase()

export const Auth: IAuthRepository = {
	signUp: async (data: ISingUp) => {
		await database.insert(users).values(data as IUserModel)
	},
	signIn: async (email: string) => {
		const [user] = await database
			.select()
			.from(users)
			.where(eq(users.email, email))
		return user
	},
}
