module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended'
	],
	env: {
		'jest/globals': true,
	},
	globals: {
		wcSharedSettings: true,
	},
	plugins: [
		'jest',
	],
	rules: {
		'@wordpress/dependency-group': 'off',
		'valid-jsdoc': 'off',
	}
};
