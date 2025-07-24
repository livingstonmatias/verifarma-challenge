import type { InferSelectModel } from 'drizzle-orm'
import type { users } from '@@/server/database/schemas'

export type IUserModel = InferSelectModel<typeof users>
