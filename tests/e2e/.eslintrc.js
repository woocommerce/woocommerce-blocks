const config = {
	extends: [ '../../.eslintrc.js', 'plugin:playwright/recommended' ],
	rules: {
		'playwright/expect-expect': 'error',
		'playwright/max-nested-describe': 'error',
		'playwright/missing-playwright-await': 'error',
		'playwright/no-conditional-in-test': 'error',
		'playwright/no-element-handle': 'error',
		'playwright/no-eval': 'error',
		'playwright/no-focused-test': 'error',
		'playwright/no-force-option': 'error',
		'playwright/no-nested-step': 'error',
		'playwright/no-networkidle': 'error',
		'playwright/no-page-pause': 'error',
		'playwright/no-skipped-test': 'error',
		'playwright/no-useless-await': 'error',
		'playwright/no-useless-not': 'error',
		'playwright/no-wait-for-timeout': 'error',
		'playwright/prefer-web-first-assertions': 'error',
		'playwright/valid-expect': 'error',
	},
};

module.exports = config;
