/**
 * External dependencies
 */
import { test as setup, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { customer, admin } from './test-data/data/data';

const adminFile = 'playwright/.auth/admin.json';

setup( 'authenticate as admin', async ( { page } ) => {
	await page.goto( '/my-account' );
	const isLoggedOut = await page
		.getByLabel( 'Username or email address' )
		.isVisible();

	if ( isLoggedOut ) {
		await page
			.getByLabel( 'Username or email address' )
			.fill( admin.username );
		await page.getByLabel( 'Password' ).fill( admin.password );
		await page.getByRole( 'button', { name: 'Log in' } ).click();
		// Sometimes login flow sets cookies in the process of several redirects.
		// Wait for the final URL to ensure that the cookies are actually set.
		await page.waitForURL( '/my-account/' );
	}

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

const customerFile = 'playwright/.auth/customer.json';

setup( 'authenticate as customer', async ( { page } ) => {
	await page.goto( '/my-account' );
	const isLoggedOut = await page
		.getByLabel( 'Username or email address' )
		.isVisible();

	if ( isLoggedOut ) {
		await page
			.getByLabel( 'Username or email address' )
			.fill( customer.username );
		await page.getByLabel( 'Password' ).fill( customer.password );
		await page.getByRole( 'button', { name: 'Log in' } ).click();
		// Sometimes login flow sets cookies in the process of several redirects.
		// Wait for the final URL to ensure that the cookies are actually set.
		await page.waitForURL( '/my-account/' );
	}

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

const guestFile = 'playwright/.auth/guest.json';

setup( 'authenticate as guest', async ( { page } ) => {
	await page.goto( '/my-account' );
	const isLoggedOut = await page
		.getByLabel( 'Username or email address' )
		.isVisible();

	if ( ! isLoggedOut ) {
		await page
			.getByRole( 'list' )
			.filter( {
				hasText:
					'Dashboard Orders Downloads Addresses Account details Log out',
			} )
			.getByRole( 'link', { name: 'Log out' } )
			.click();

		// Sometimes login flow sets cookies in the process of several redirects.
		// Wait for the final URL to ensure that the cookies are actually set.
		await page.waitForURL( '/my-account/' );
	}

	await expect(
		page.getByLabel( 'Username or email address' )
	).toBeVisible();

	// End of authentication steps.

	await page.context().storageState( { path: guestFile } );
} );
