/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const permalink = '/cart';
const templatePath = 'woocommerce/woocommerce//page-cart';
const templateType = 'wp_template';

test.describe( 'Test the cart template', async () => {
	test( 'Template can be opened in the site editor', async ( {
		admin,
		page,
		editorUtils,
	} ) => {
		await admin.visitSiteEditor();
		await page.getByRole( 'button', { name: /Templates/i } ).click();
		await page.getByRole( 'button', { name: /Page: Cart/i } ).click();
		await editorUtils.enterEditMode();
		await expect(
			page
				.frameLocator( 'iframe[title="Editor canvas"i]' )
				.locator( 'h1:has-text("Cart")' )
				.first()
		).toBeVisible();
	} );

	test( 'Template can be accessed from the page editor', async ( {
		admin,
		editor,
		page,
		editorUtils,
	} ) => {
		await admin.visitSiteEditor();
		await editor.page.getByRole( 'button', { name: /Pages/i } ).click();
		await editor.page.getByRole( 'button', { name: /Cart/i } ).click();
		await editorUtils.enterEditMode();
		await expect(
			editor.canvas.locator( 'h1:has-text("Cart")' ).first()
		).toBeVisible();
		await editor.openDocumentSettingsSidebar();
		await page.getByRole( 'button', { name: 'Edit template' } ).click();
		await expect(
			editor.canvas.locator( 'h1:has-text("Cart")' ).first()
		).toBeVisible();
	} );

	test( 'Admin bar edit site link opens site editor', async ( { admin } ) => {
		await admin.page.goto( permalink, { waitUntil: 'load' } );
		await admin.page.locator( '#wp-admin-bar-site-editor a' ).click();
		await expect(
			admin.page
				.frameLocator( 'iframe[title="Editor canvas"i]' )
				.locator( 'h1:has-text("Cart")' )
				.first()
		).toBeVisible();
	} );
} );

test.describe( 'Test editing the cart template', async () => {
	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
	} );

	test( 'Merchant can transform shortcode block into blocks', async ( {
		admin,
		editorUtils,
		editor,
		page,
	} ) => {
		await admin.visitSiteEditor();
		await page.getByRole( 'button', { name: /Templates/i } ).click();
		await page.getByRole( 'button', { name: /Page: Checkout/i } ).click();
		await editorUtils.enterEditMode();
		await editor.setContent(
			'<!-- wp:woocommerce/classic-shortcode {"shortcode":"cart"} /-->'
		);
		await editor.canvas.waitForSelector(
			'.wp-block-woocommerce-classic-shortcode'
		);
		await editor.canvas
			.getByRole( 'button', { name: 'Transform into blocks' } )
			.click();
		await expect(
			editor.canvas
				.locator( 'button:has-text("Proceed to checkout")' )
				.first()
		).toBeVisible();
	} );

	test( 'Template can be modified', async ( {
		admin,
		editorUtils,
		page,
	} ) => {
		await admin.visitSiteEditor( {
			postId: templatePath,
			postType: templateType,
		} );
		await editorUtils.enterEditMode();
		await editorUtils.editor.insertBlock( {
			name: 'core/paragraph',
			attributes: { content: 'Hello World in the template' },
		} );
		await editorUtils.saveTemplate();
		await page.goto( permalink, { waitUntil: 'domcontentloaded' } );
		await expect(
			page.getByText( 'Hello World in the template' ).first()
		).toBeVisible();
	} );
} );
