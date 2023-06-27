/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const permalink = '/checkout/order-received';
const templatePath = 'woocommerce/woocommerce//order-confirmation';
const templateType = 'wp_template';

test.describe( 'Test the order confirmation template', async () => {
	test( 'Template can be opened in the site editor', async ( { page } ) => {
		await page.goto( '/wp-admin/site-editor.php', {
			waitUntil: 'networkidle',
		} );
		await page.click( 'text=Templates' );
		await page.click( 'text=Order confirmation' );
		await page.getByRole( 'button', { name: /Edit/i } ).click();

		await expect(
			page
				.frameLocator( 'iFrame' )
				.locator(
					'p:has-text("Thank you. Your order has been received.")'
				)
				.first()
		).toBeVisible();
	} );

	test( 'Template can be modified', async ( { page, admin, editor } ) => {
		await admin.visitSiteEditor( {
			postId: templatePath,
			postType: templateType,
		} );
		await editor.canvas.click( 'body' );
		await editor.canvas.waitForLoadState( 'networkidle' );
		await editor.insertBlock( {
			name: 'core/paragraph',
			attributes: { content: 'Hello World' },
		} );
		await editor.saveSiteEditorEntities();
		await page.goto( permalink, { waitUntil: 'networkidle' } );

		await expect( page.getByText( 'Hello World' ).first() ).toBeVisible();
	} );
} );
