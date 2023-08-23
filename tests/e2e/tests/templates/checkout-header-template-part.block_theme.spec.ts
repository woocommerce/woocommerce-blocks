/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const permalink = '/checkout';
const templatePath = 'woocommerce/woocommerce//checkout-header';
const templateType = 'wp_template_part';

test.afterAll( async ( { requestUtils } ) => {
	await requestUtils.deleteAllTemplates( 'wp_template' );
	await requestUtils.deleteAllTemplates( 'wp_template_part' );
} );

test.describe( 'Test the checkout header template part', async () => {
	test( 'Template can be opened in the site editor', async ( { page } ) => {
		await page.goto(
			'/wp-admin/site-editor.php?path=/wp_template_part/all'
		);
		await page.getByText( 'Checkout Header', { exact: true } ).click();

		const editButton = page.getByRole( 'button', {
			name: 'Edit',
			exact: true,
		} );
		await expect( editButton ).toBeVisible();
	} );

	test( 'Template can be modified', async ( {
		page,
		admin,
		editor,
		editorUtils,
	} ) => {
		// It's necessary to add a product to the cart to be able to go to the checkout page, otherwise the
		// checkout page will redirect to /cart and the checkout header template part won't be loaded.
		await page.goto( '/shop', { waitUntil: 'commit' } );
		await page.click( 'text=Add to cart' );

		await admin.visitSiteEditor( {
			postId: templatePath,
			postType: templateType,
		} );
		await editorUtils.enterEditMode();
		await editor.insertBlock( {
			name: 'core/paragraph',
			attributes: { content: 'Hello World' },
		} );
		await editor.saveSiteEditorEntities();

		await page.goto( permalink, { waitUntil: 'commit' } );

		await expect( page.getByText( 'Hello World' ) ).toBeVisible();
	} );
} );
