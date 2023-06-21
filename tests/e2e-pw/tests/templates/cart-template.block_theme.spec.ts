/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

test.describe( 'Test the cart template', async () => {
	test.describe( 'Template is available', () => {
		test( 'Open template in the site editor', async ( { page } ) => {
			await page.goto( '/wp-admin/site-editor.php' );
			await page.click( 'text=Templates' );
			await page.click( 'text=Cart' );
			await page.getByRole( 'button', { name: /Edit/i } ).click();

			const iframeButton = await page
				.frameLocator( 'iFrame' )
				.locator( 'button:has-text("Proceed to checkout")' )
				.first();
			await expect( iframeButton ).toBeVisible();
		} );
	} );
} );
