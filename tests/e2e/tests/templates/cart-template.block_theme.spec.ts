/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const permalink = '/cart';
const templatePath = 'woocommerce/woocommerce//cart';
const templateType = 'wp_template';

test.describe( 'Test the cart template', async () => {
	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
	} );

	test( 'Template can be opened in the site editor', async ( {
		admin,
		page,
		editorUtils,
	} ) => {
		await admin.visitAdminPage( 'site-editor.php' );
		await page.getByRole( 'button', { name: /Templates/i } ).click();
		await page.getByRole( 'button', { name: /Cart/i } ).click();
		await editorUtils.enterEditMode();

		await expect(
			page
				.frameLocator( 'iframe' )
				.locator( 'button:has-text("Proceed to checkout")' )
				.first()
		).toBeVisible();
	} );

	test( 'Template can be modified', async ( {
		page,
		admin,
		editor,
		editorUtils,
	} ) => {
		await admin.visitSiteEditor( {
			postId: templatePath,
			postType: templateType,
		} );
		await editorUtils.enterEditMode();
		await editor.insertBlock( {
			name: 'core/paragraph',
			attributes: { content: 'Hello World' },
		} );

		await Promise.all( [
			editor.saveSiteEditorEntities(),
			// Wait for the response after saving the post because sometimes there's a race condition, and loading the post
			// shows a version without the newly saved content.
			editor.page.waitForResponse( ( response ) =>
				response.url().includes( permalink )
			),
		] );

		await page.goto( permalink, { waitUntil: 'commit' } );

		await expect( page.getByText( 'Hello World' ).first() ).toBeVisible();
	} );
} );
