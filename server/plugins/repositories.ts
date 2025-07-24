import { Auth } from '@@/server/repositories/auth.repository'

export default defineNitroPlugin((nitro) => {
	nitro.hooks.hook('request', (event) => {
		event.context.repositories = {
			auth: Auth,
		}
	})
})
