// ESlint 检查配置
module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 12,
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
	plugins: ['vue'],
	rules: {
		'no-useless-escape': 0,
		'vue/no-mutating-props': 0,
		'no-unused-vars': 0,
		'vue/require-default-prop': 0,
		'vue/require-prop-types': 0,
		'vue/require-valid-default-prop': 0,
		'vue/no-unused-vars': 0,
		'vue/attributes-order': 0,
		'vue/prop-name-casing': 0,
		'vue/order-in-components': 0,
	},
}
