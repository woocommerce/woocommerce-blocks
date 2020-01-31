module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended', 'prettier' ],
	env: {
		'jest/globals': true,
	},
	globals: {
		wcSettings: true,
	},
	plugins: [ 'jest', 'woocommerce', 'wpcalypso' ],
	rules: {
		'@wordpress/dependency-group': 'off',
		'woocommerce/dependency-group': 'error',
		'wpcalypso/i18n-ellipsis': 'error',
		'valid-jsdoc': 'off',
		radix: 'error',
		yoda: [ 'error', 'never' ],
	},
};
