/**
 * External dependencies
 */
import { defineConfig } from '@playwright/test';

/**
 * Internal dependencies
 */
import _config from './playwright.config';

const { grepInvert, projects, ...config } = _config;

export default defineConfig( {
	...config,
	grep: /.*.block_theme.side_effects.spec.ts/,
} );
