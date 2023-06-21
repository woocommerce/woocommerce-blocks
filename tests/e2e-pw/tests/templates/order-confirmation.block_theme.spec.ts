/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

test.describe( 'Test the order confirmation template', async () => {
	test.describe( 'Template is available', () => {
		test( 'Open template in the site editor', async ( { page } ) => {
			await page.goto( '/wp-admin/site-editor.php' );
			await page.click( 'text=Templates' );
			await page.click( 'text=Order confirmation' );
			await page.getByRole( 'button', { name: /Edit/i } ).click();

			const iframeButton = await page
				.frameLocator( 'iFrame' )
				.locator(
					'p:has-text("Thank you. Your order has been received.")'
				)
				.first();
			await expect( iframeButton ).toBeVisible();
		} );
	} );
} );
