/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

test.describe( 'Test the checkout header template part', async () => {
	test.describe( 'Template part is available', () => {
		test( 'Open template in the site editor', async ( { page } ) => {
			await page.goto( '/wp-admin/site-editor.php' );
			await page.click( 'text=Template Parts' );
			await page.click( 'text=Checkout Header' );

			const editButton = page.getByRole( 'button', { name: /Edit/i } );
			await expect( editButton ).toBeVisible();
		} );
	} );
} );
