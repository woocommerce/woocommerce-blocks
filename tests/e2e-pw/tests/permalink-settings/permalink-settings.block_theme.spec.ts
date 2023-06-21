/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */

test.describe(
	'Tests permalink settings for the cart and checkout templates',
	async () => {
		test.describe( 'Go to the advanced settings page', () => {
			test( 'Load advanced settings', async ( { page } ) => {
				await page.goto(
					'/wp-admin/admin.php?page=wc-settings&tab=advanced'
				);
				const title = page
					.locator( 'div.wrap.woocommerce > form > h2' )
					.first();
				await expect( title ).toHaveText( 'Page setup' );
			} );
			test( 'Permlink settings exist', async ( { page } ) => {
				await page.goto(
					'/wp-admin/admin.php?page=wc-settings&tab=advanced'
				);
				const cartInput = page.locator(
					'tr:has-text("Cart page "):has-text("cart template") input'
				);
				const checkoutInput = page.locator(
					'tr:has-text("Checkout page "):has-text("checkout template") input'
				);

				await expect( cartInput ).toBeVisible();
				await expect( checkoutInput ).toBeVisible();
			} );
			test( 'Changing cart permalink works', async ( { page } ) => {
				await page.goto(
					'/wp-admin/admin.php?page=wc-settings&tab=advanced'
				);
				const cartInput = page.locator(
					'tr:has-text("Cart page "):has-text("cart template") input'
				);
				cartInput.fill( 'updated-cart-permalink' );
				await page.click( 'button[name="save"]' );

				// Visit the updated page.
				await page.goto( '/updated-cart-permalink' );
				const cartText = await page.getByText(
					'Your cart is currently empty!'
				);
				expect( cartText ).not.toBeNull();
			} );
			test( 'Changing checkout permalink works', async ( { page } ) => {
				await page.goto(
					'/wp-admin/admin.php?page=wc-settings&tab=advanced'
				);
				const checkoutInput = page.locator(
					'tr:has-text("Checkout page "):has-text("checkout template") input'
				);
				checkoutInput.fill( 'updated-checkout-permalink' );
				await page.click( 'button[name="save"]' );

				// Go to shop and add to cart.
				await page.goto( '/shop/' );
				await page.click( 'text=Add to cart' );

				// Visit the updated page.
				await page.goto( '/updated-checkout-permalink' );
				const cartText = await page.getByText(
					'Your cart is currently empty!'
				);
				expect( cartText ).not.toBeNull();
			} );
		} );
	}
);
