/**
 * External dependencies
 */
import { test as setup, expect } from '@woocommerce/e2e-playwright-utils';
import { adminFile, customerFile, guestFile } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { customer, admin } from './test-data/data/data';

setup.describe( 'Authentication setup', () => {
	// Check if logged in, then log out of the account before each test.
	setup.beforeEach( async ( { page } ) => {
		await page.goto( '/my-account' );
		const logoutLinkVisible = await page
			.getByRole( 'paragraph' )
			.filter( { hasText: /Hello .* \(not .*? Log out\)/ } )
			.isVisible();

		if ( logoutLinkVisible ) {
			await page
				.getByRole( 'paragraph' )
				.filter( { hasText: /Hello .* \(not .*? Log out\)/ } )
				.getByRole( 'link', { name: 'Log out' } )
				.click();
		}
		await page.goto( '/my-account' );
	} );

	setup( 'authenticate as admin', async ( { page } ) => {
		await page
			.getByLabel( 'Username or email address' )
			.fill( admin.username );
		await page.getByLabel( 'Password' ).fill( admin.password );
		await page.getByRole( 'button', { name: 'Log in' } ).click();
		// Sometimes login flow sets cookies in the process of several redirects.
		// Wait for the final URL to ensure that the cookies are actually set.
		await page.waitForURL( '/my-account/' );

		await expect(
			page
				.getByRole( 'list' )
				.filter( {
					hasText:
						'Dashboard Orders Downloads Addresses Account details Log out',
				} )
				.getByRole( 'link', { name: 'Log out' } )
		).toBeVisible();

		await page.context().storageState( { path: adminFile } );
	} );

	setup( 'authenticate as customer', async ( { page } ) => {
		await page
			.getByLabel( 'Username or email address' )
			.fill( customer.username );
		await page.getByLabel( 'Password' ).fill( customer.password );
		await page.getByRole( 'button', { name: 'Log in' } ).click();
		// Sometimes login flow sets cookies in the process of several redirects.
		// Wait for the final URL to ensure that the cookies are actually set.
		await page.waitForURL( '/my-account/' );

		await expect(
			page
				.getByRole( 'list' )
				.filter( {
					hasText:
						'Dashboard Orders Downloads Addresses Account details Log out',
				} )
				.getByRole( 'link', { name: 'Log out' } )
		).toBeVisible();

		await page.context().storageState( { path: customerFile } );
	} );

	setup( 'authenticate as guest', async ( { page } ) => {
		await expect(
			page.getByLabel( 'Username or email address' )
		).toBeVisible();

		// End of authentication steps.

		await page.context().storageState( { path: guestFile } );
	} );
} );
