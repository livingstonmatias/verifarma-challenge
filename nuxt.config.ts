// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxt/test-utils/module',
		'vuetify-nuxt-module',
		'nuxt-auth-utils',
		'nuxt-swiper',
	],
	ssr: true,
	devtools: { enabled: true },
	css: ['@@/assets/scss/main.scss'],
	compatibilityDate: '2025-07-15',
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				quotes: 'single',
				semi: false,
			},
		},
	},
	vuetify: {
		moduleOptions: {
			/* module specific options */
		},
		vuetifyOptions: {
			theme: {
				defaultTheme: 'dark',
			},
		},
	},
})
