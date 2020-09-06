module.exports = {
	...require( '@wordpress/scripts/config/jest-e2e.config' ),
	rootDir: '../../../',
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// An array of file extensions your modules use
	moduleFileExtensions: [ 'js' ],

	moduleNameMapper: {
		'@woocommerce/e2e-tests/(.*)':
			'<rootDir>/node_modules/woocommerce/tests/e2e-tests/$1',
		'@woocommerce/blocks-test-utils': '<rootDir>/tests/utils',
	},

	// Where to look for test files
	roots: [ '<rootDir>/tests/e2e-tests/specs' ],
	globalSetup: '<rootDir>/tests/e2e-tests/config/setup.js',
	globalTeardown: '<rootDir>/tests/e2e-tests/config/teardown.js',
	setupFiles: [],
	// A list of paths to modules that run some code to configure or set up the testing framework
	// before each test
	setupFilesAfterEnv: [
		'<rootDir>/tests/e2e-tests/config/custom-matchers/index.js',
		'<rootDir>/tests/e2e-tests/config/jest.setup.js',
		'expect-puppeteer',
	],

	transformIgnorePatterns: [ 'node_modules/(?!(woocommerce)/)' ],
};
