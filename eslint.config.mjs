// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		'vue/no-multiple-template-root': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/valid-v-for': 'off',
		'vue/component-name-in-template-casing': ['error', 'kebab-case', {
			registeredComponentsOnly: false,
			ignores: [],
		}],
	},
})
