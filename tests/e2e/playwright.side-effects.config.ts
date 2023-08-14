/**
 * External dependencies
 */
import { defineConfig } from '@playwright/test';

/**
 * Internal dependencies
 */
import config from './playwright.config';

export default defineConfig( {
	...config,
	fullyParallel: false,
	workers: 1,
	projects: [
		{
			name: 'blockThemeConfiguration',
			testMatch: /block-theme.setup.ts/,
		},
		{
			name: 'blockThemeWithGlobalSideEffects',
			testMatch: /.*.block_theme.side_effects.spec.ts/,
			dependencies: [ 'blockThemeConfiguration' ],
		},
	],
} );
