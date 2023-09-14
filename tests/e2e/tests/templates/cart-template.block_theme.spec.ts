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
		await admin.visitAdminPage( 'site-editor.php' );
		await editorUtils.waitForSiteEditorFinishLoading();
		await admin.page.evaluate( () => {
			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuide', false );

			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuideStyles', false );

			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuidePage', false );

			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuideTemplate', false );
		} );

		await page.getByRole( 'button', { name: /Templates/i } ).click();
		await page.getByRole( 'button', { name: /Page: Cart/i } ).click();
		await editorUtils.enterEditMode();
		await expect(
			page
				.frameLocator( 'iframe[title="Editor canvas"i]' )
				.locator( 'h2:has-text("Cart")' )
				.first()
		).toBeVisible();
	} );

	test( 'Template can be accessed from the page editor', async ( {
		admin,
		editor,
		page,
		editorUtils,
	} ) => {
		await admin.visitAdminPage( 'site-editor.php' );
		await editorUtils.waitForSiteEditorFinishLoading();
		await editor.page.getByRole( 'button', { name: /Pages/i } ).click();
		await editor.page.getByRole( 'button', { name: /Cart/i } ).click();
		await editorUtils.enterEditMode();
		await expect(
			editor.canvas.locator( 'h2:has-text("Cart")' ).first()
		).toBeVisible();
		await editor.openDocumentSettingsSidebar();
		await page.getByRole( 'button', { name: 'Edit template' } ).click();
		await expect(
			editor.canvas.locator( 'h2:has-text("Cart")' ).first()
		).toBeVisible();
	} );

	test( 'Admin bar edit site link opens site editor', async ( { admin } ) => {
		await admin.page.goto( permalink, { waitUntil: 'load' } );
		await admin.page.locator( '#wp-admin-bar-site-editor a' ).click();
		await expect(
			admin.page
				.frameLocator( 'iframe[title="Editor canvas"i]' )
				.locator( 'h2:has-text("Cart")' )
				.first()
		).toBeVisible();
	} );
} );

test.describe( 'Test editing the cart template', async () => {
	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
	} );

	test.only( 'Merchant can transform shortcode block into blocks', async ( {
		admin,
		editorUtils,
		editor,
	} ) => {
		await admin.visitAdminPage( 'site-editor.php' );
		await editorUtils.waitForSiteEditorFinishLoading();
		await admin.page.evaluate( () => {
			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuide', false );

			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuideStyles', false );

			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuidePage', false );

			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'welcomeGuideTemplate', false );
		} );
		await editor.page.getByRole( 'button', { name: /Pages/i } ).click();
		await editor.page.getByRole( 'button', { name: /Cart/i } ).click();

		await expect( editor.canvas.getByText( 'Cart' ) ).toBeVisible();

		await editorUtils.enterEditMode();
		await editor.setContent( '' );
		await editor.page.screenshot( { path: 'artifacts/empty.png' } );
		await editor.canvas.click( 'body' );
		await editor.insertBlock( {
			name: 'woocommerce/classic-shortcode',
			attributes: {
				shortcode: 'cart',
			},
		} );
		await editor.page.screenshot( { path: 'artifacts/cartcode.png' } );

		await expect(
			editor.canvas
				.locator( 'button:has-text("Transform into blocks")' )
				.first()
		).toBeVisible();

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
		editor,
		editorUtils,
		page,
	} ) => {
		await admin.visitSiteEditor( {
			postId: templatePath,
			postType: templateType,
		} );
		await editorUtils.enterEditMode();
		await editor.insertBlock( {
			name: 'core/paragraph',
			attributes: { content: 'Hello World in the template' },
		} );
		await editor.saveSiteEditorEntities();
		await page.goto( permalink, { waitUntil: 'domcontentloaded' } );
		await expect(
			page.getByText( 'Hello World in the template' ).first()
		).toBeVisible();
	} );
} );
