module.exports = {
	parser: 'babel-eslint',
	extends: [
		'wordpress',
		'plugin:wordpress/esnext',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
	],
	env: {
		browser: false,
		es6: true,
		node: true,
		'jest/globals': true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	globals: {
		window: true,
		document: true,
		wc_product_block_data: true,
	},
	plugins: [
		'wordpress',
		'react',
		'jsx-a11y',
		'jest',
	],
	rules: {
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-parens': [ 'error', 'always' ],
		'arrow-spacing': 'error',
		'brace-style': [ 'error', '1tbs' ],
		camelcase: [ 'warn', { properties: 'never' } ],
		'comma-dangle': [ 'error', 'always-multiline' ],
		'comma-spacing': 'error',
		'comma-style': 'error',
		'computed-property-spacing': [ 'error', 'always' ],
		'dot-notation': 'error',
		'eol-last': 'error',
		eqeqeq: 'error',
		'func-call-spacing': 'error',
		indent: [ 'error', 'tab', { SwitchCase: 1 } ],
		'jsx-quotes': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'lines-around-comment': 'off',
		'no-alert': 'error',
		'no-bitwise': 'error',
		'no-caller': 'error',
		'no-console': 'error',
		'no-debugger': 'error',
		'no-dupe-args': 'error',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-else-return': 'error',
		'no-eval': 'error',
		'no-extra-semi': 'error',
		'no-fallthrough': 'error',
		'no-lonely-if': 'error',
		'no-mixed-operators': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-multiple-empty-lines': [ 'error', { max: 1 } ],
		'no-multi-spaces': 'error',
		'no-multi-str': 'off',
		'no-negated-in-lhs': 'error',
		'no-nested-ternary': 'error',
		'no-redeclare': 'error',
		'no-shadow': 'error',
		'no-undef': 'error',
		'no-undef-init': 'error',
		'no-unreachable': 'error',
		'no-unsafe-negation': 'error',
		'no-unused-expressions': 'error',
		'no-unused-vars': 'error',
		'no-useless-return': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-spacing': [ 'error', 'always' ],
		'padded-blocks': [ 'error', 'never' ],
		quotes: [ 'error', 'single', { allowTemplateLiterals: true, avoidEscape: true } ],
		'quote-props': [ 'error', 'as-needed' ],
		'react/display-name': 'off',
		'react/jsx-curly-spacing': [ 'error', {
			when: 'always',
			children: true,
		} ],
		'react/jsx-equals-spacing': 'error',
		'react/jsx-indent': [ 'error', 'tab' ],
		'react/jsx-indent-props': [ 'error', 'tab' ],
		'react/jsx-key': 'error',
		'react/jsx-tag-spacing': 'error',
		'react/no-children-prop': 'off',
		'react/prop-types': 'warn',
		'react/react-in-jsx-scope': 'off',
		semi: 'error',
		'semi-spacing': 'error',
		'space-before-blocks': [ 'error', 'always' ],
		'space-before-function-paren': [ 'error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always',
		} ],
		'space-in-parens': [ 'error', 'always' ],
		'space-infix-ops': [ 'error', { int32Hint: false } ],
		'space-unary-ops': [ 'error', {
			overrides: {
				'!': true,
				yield: true,
			},
		} ],
		yoda: 'off',
	}
};
