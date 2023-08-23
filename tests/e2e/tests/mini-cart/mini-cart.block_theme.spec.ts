/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const getFreshSession = () => {
	return {
		cookies: [],
		origins: [],
	};
};

test.describe( `Mini Cart Block`, () => {
	test.use( {
		storageState: getFreshSession(),
	} );

	test.beforeEach( async ( { page } ) => {
		await page.goto( `/mini-cart-block`, { waitUntil: 'commit' } );
	} );

	test( 'should open the empty cart drawer', async ( { page } ) => {
		await page.getByLabel( 'items in cart,' ).hover();
		await page.getByLabel( 'items in cart,' ).click();

		await expect( page.getByRole( 'dialog' ) ).toContainText(
			'Your cart is currently empty!'
		);
	} );

	test( 'should close the drawer when clicking on the close button', async ( {
		page,
	} ) => {
		await page.getByLabel( 'items in cart,' ).hover();
		await page.getByLabel( 'items in cart,' ).click();

		await expect( page.getByRole( 'dialog' ) ).toContainText(
			'Your cart is currently empty!'
		);

		await page.getByRole( 'button', { name: 'Close' } ).click();

		await expect( page.getByRole( 'dialog' ) ).toHaveCount( 0 );
	} );

	test( 'should close the drawer when clicking outside the drawer', async ( {
		page,
	} ) => {
		await page.getByLabel( 'items in cart,' ).hover();
		await page.getByLabel( 'items in cart,' ).click();

		await expect( page.getByRole( 'dialog' ) ).toContainText(
			'Your cart is currently empty!'
		);

		await expect(
			page.getByRole( 'button', { name: 'Close' } )
		).toBeInViewport();

		await page.mouse.click( 50, 200 );

		await expect( page.getByRole( 'dialog' ) ).toHaveCount( 0 );
	} );

	test( 'should open the filled cart drawer', async ( { page } ) => {
		await page.click( 'text=Add to cart' );

		await page.getByLabel( 'items in cart,' ).hover();
		await page.getByLabel( 'items in cart,' ).click();

		await expect(
			page.locator( '.wc-block-mini-cart__title' ).first()
		).toContainText( 'Your cart (1 item)' );
	} );
} );
