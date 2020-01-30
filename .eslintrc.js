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
		'wpcalypso/i18n-mismatched-placeholders': 'error',
		'wpcalypso/i18n-named-placeholders': 'error',
		'wpcalypso/i18n-no-collapsible-whitespace': 'error',
		'wpcalypso/i18n-no-placeholders-only': 'error',
		'wpcalypso/i18n-no-variables': 'error',
		'valid-jsdoc': 'off',
		radix: 'error',
		yoda: [ 'error', 'never' ],
	},
};
