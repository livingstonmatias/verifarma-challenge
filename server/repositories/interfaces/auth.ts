import type { IUserModel } from './user'

export interface ISingUp {
	name?: string
	email: string
	password: string
}

export interface IAuthRepository {
	signUp(data: ISingUp): Promise<void>
	signIn(email: string): Promise<IUserModel | null>
}
