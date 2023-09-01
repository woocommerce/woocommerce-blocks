/**
 * External dependencies
 */
import {
	BLOCK_THEME_NAME,
	BLOCK_THEME_SLUG,
	cli,
} from '@woocommerce/e2e-utils';
import { test as setup, expect } from '@woocommerce/e2e-playwright-utils';

setup( 'Sets up the block theme', async ( { admin } ) => {
	await cli(
		`npm run wp-env run tests-cli -- wp theme activate ${ BLOCK_THEME_SLUG }`
	);
	await admin.page.goto( '/wp-admin/themes.php' );
	await expect(
		admin.page.getByText( `Active: ${ BLOCK_THEME_NAME }` )
	).toBeVisible();
} );
