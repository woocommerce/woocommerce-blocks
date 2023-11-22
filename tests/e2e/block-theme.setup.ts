/**
 * External dependencies
 */
import {
	BLOCK_THEME_NAME,
	BLOCK_THEME_SLUG,
	cli,
} from '@woocommerce/e2e-utils';
import { test as setup, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { admin as adminData } from './test-data/data/data';

setup( 'Sets up the block theme', async ( { admin } ) => {
	await admin.page.goto( `/wp-admin`, { waitUntil: 'commit' } );

	const isLoggedOut = await admin.page
		.locator( 'input[name="log"]' )
		.isVisible();

	if ( isLoggedOut ) {
		await admin.page.fill( 'input[name="log"]', adminData.username );
		await admin.page.fill( 'input[name="pwd"]', adminData.password );
		await admin.page.click( 'text=Log In' );
	}

	await cli(
		`npm run wp-env run tests-cli -- wp theme install ${ BLOCK_THEME_SLUG } --activate`
	);
	await admin.page.goto( '/wp-admin/themes.php' );
	await expect(
		admin.page.getByText( `Active: ${ BLOCK_THEME_NAME }` )
	).toBeVisible();
	// Enable permalinks.
	await cli(
		`npm run wp-env run tests-cli -- wp rewrite structure /%postname%/ --hard`
	);
	await cli( `npm run wp-env run tests-cli -- wp rewrite flush --hard` );
} );
