module.exports = {
	extends: [
		'plugin:@woocommerce/eslint-plugin/recommended',
		'plugin:you-dont-need-lodash-underscore/compatible',
	],
	globals: {
		wcStoreApiNonce: 'readonly',
		wcStoreApiNonceTimestamp: 'readonly',
		fetchMock: true,
		jQuery: 'readonly',
		IntersectionObserver: 'readonly',
		// @todo Move E2E related ESLint configuration into custom config.
		//
		// We should have linting properties only included for files that they
		// are specific to as opposed to globally.
		page: 'readonly',
		browser: 'readonly',
		context: 'readonly',
		jestPuppeteer: 'readonly',
	},
	settings: {
		jsdoc: { mode: 'typescript' },
		// List of modules that are externals in our webpack config.
		// This helps the `import/no-extraneous-dependencies` and
		//`import/no-unresolved` rules account for them.
		'import/core-modules': [
			'@woocommerce/block-data',
			'@woocommerce/blocks-checkout',
			'@woocommerce/price-format',
			'@woocommerce/settings',
			'@woocommerce/shared-context',
			'@woocommerce/shared-hocs',
			'@woocommerce/knobs',
			'@wordpress/a11y',
			'@wordpress/api-fetch',
			'@wordpress/block-editor',
			'@wordpress/compose',
			'@wordpress/data',
			'@wordpress/escape-html',
			'@wordpress/hooks',
			'@wordpress/keycodes',
			'@wordpress/url',
			'babel-jest',
			'dotenv',
			'jest-environment-puppeteer',
			'lodash/kebabCase',
			'lodash',
			'prop-types',
			'react',
			'requireindex',
		],
		'import/resolver': {
			node: {},
			webpack: {},
			typescript: {},
		},
	},
	rules: {
		'woocommerce/feature-flag': 'off',
		'react-hooks/exhaustive-deps': 'error',
		'react/jsx-fragments': [ 'error', 'syntax' ],
		'@wordpress/no-global-active-element': 'warn',
	},
	overrides: [
		{
			files: [ '**/bin/**.js', '**/storybook/**.js', '**/stories/**.js' ],
			rules: {
				'you-dont-need-lodash-underscore/omit': 'off',
			},
		},
		{
			files: [ '*.ts', '*.tsx' ],
			parser: '@typescript-eslint/parser',
			extends: [
				'plugin:@woocommerce/eslint-plugin/recommended',
				'plugin:you-dont-need-lodash-underscore/compatible',
				'plugin:@typescript-eslint/recommended',
			],
			rules: {
				'@typescript-eslint/no-explicit-any': 'error',
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': [ 'error' ],
				'jsdoc/require-param': 'off',
				'no-shadow': 'off',
				'@typescript-eslint/no-shadow': [ 'error' ],
			},
		},
		{
			files: [ './assets/js/mapped-types.ts' ],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'no-shadow': 'off',
			},
		},
	],
};
