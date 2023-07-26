/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { addBlock } from './utils';

const blockData = {
	name: 'woocommerce/product-gallery-thumbnails',
	mainClass: '.wp-block-woocommerce-product-gallery-thumbnails',
	selectors: {
		frontend: {},
		editor: {
			thumbnails: '.wp-block-woocommerce-product-gallery-thumbnails',
			noThumbnailsOption: 'button[data-value=off]',
			leftPositionThumbnailsOption: 'button[data-value=left]',
			bottomPositionThumbnailsOption: 'button[data-value=bottom]',
			rightPositionThumbnailsOption: 'button[data-value=right]',
		},
	},
	slug: 'single-product',
	productPage: '/product/v-neck-t-shirt/',
};

test.describe( `${ blockData.name }`, () => {
	test.beforeEach( async ( { requestUtils, admin, editorUtils } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
		await admin.visitSiteEditor( {
			postId: `woocommerce/woocommerce//${ blockData.slug }`,
			postType: 'wp_template',
		} );
		await editorUtils.enterEditMode();
	} );

	test.afterEach( async ( { requestUtils } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
	} );

	test( 'Renders Product Gallery Thumbnails block on the editor side', async ( {
		editorUtils,
		editor,
	} ) => {
		await editor.insertBlock( {
			name: 'woocommerce/product-gallery',
		} );

		const block = await editorUtils.getBlockByName( blockData.name );

		await expect( block ).toBeVisible();
	} );

	test( 'Renders Product Gallery Thumbnails block on the frontend side', async ( {
		editorUtils,
		editor,
	} ) => {
		await editor.insertBlock( {
			name: 'woocommerce/product-gallery',
		} );

		const block = await editorUtils.getBlockByName( blockData.name );

		await expect( block ).toBeVisible();
	} );

	test.describe( `${ blockData.name } Settings`, () => {
		test( 'Hide correctly the thumbnails', async ( {
			page,
			editor,
			editorUtils,
			admin,
		} ) => {
			await addBlock( admin, editor, editorUtils );
			await (
				await editorUtils.getBlockByName( blockData.name )
			 ).click();
			await editor.openDocumentSettingsSidebar();
			await page
				.locator( blockData.selectors.editor.noThumbnailsOption )
				.click();

			const isVisible = await page
				.locator( blockData.selectors.editor.thumbnails )
				.isVisible();

			expect( isVisible ).toBe( false );

			await editor.saveSiteEditorEntities();

			await page.goto( blockData.productPage, {
				waitUntil: 'networkidle',
			} );
		} );

		test( 'Position thumbnails on the left of the large image', async ( {
			page,
			editor,
			editorUtils,
			frontendUtils,
		} ) => {
			// Currently we are adding the block under the legacy Product Image Gallery block, but in the future we have to add replace the product gallery block with this block.
			const parentBlock = await editorUtils.getBlockByName(
				'woocommerce/product-image-gallery'
			);
			const clientId =
				( await parentBlock.getAttribute( 'data-block' ) ) ?? '';
			const parentClientId =
				( await editorUtils.getBlockRootClientId( clientId ) ) ?? '';

			await editor.selectBlocks( parentBlock );
			await editorUtils.insertBlock(
				{ name: 'woocommerce/product-gallery' },
				undefined,
				parentClientId
			);
			await (
				await editorUtils.getBlockByName( blockData.name )
			 ).click();

			await editor.openDocumentSettingsSidebar();
			await page
				.locator(
					blockData.selectors.editor.leftPositionThumbnailsOption
				)
				.click();

			const block = await editorUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( block ).toHaveScreenshot();

			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPage, {
				waitUntil: 'networkidle',
			} );

			const blockFrontend = await frontendUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( blockFrontend ).toHaveScreenshot();
		} );

		test( 'Position thumbnails on the bottom of the large image', async ( {
			page,
			editor,
			editorUtils,
			frontendUtils,
		} ) => {
			// Currently we are adding the block under the legacy Product Image Gallery block, but in the future we have to add replace the product gallery block with this block.
			const parentBlock = await editorUtils.getBlockByName(
				'woocommerce/product-image-gallery'
			);
			const clientId =
				( await parentBlock.getAttribute( 'data-block' ) ) ?? '';
			const parentClientId =
				( await editorUtils.getBlockRootClientId( clientId ) ) ?? '';

			await editor.selectBlocks( parentBlock );
			await editorUtils.insertBlock(
				{ name: 'woocommerce/product-gallery' },
				undefined,
				parentClientId
			);
			await (
				await editorUtils.getBlockByName( blockData.name )
			 ).click();

			await editor.openDocumentSettingsSidebar();
			await page
				.locator(
					blockData.selectors.editor.bottomPositionThumbnailsOption
				)
				.click();

			const block = await editorUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( block ).toHaveScreenshot();

			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPage, {
				waitUntil: 'networkidle',
			} );

			const blockFrontend = await frontendUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( blockFrontend ).toHaveScreenshot();
		} );

		test( 'Position thumbnails on the right of the large image', async ( {
			page,
			editor,
			editorUtils,
			frontendUtils,
		} ) => {
			// Currently we are adding the block under the legacy Product Image Gallery block, but in the future we have to add replace the product gallery block with this block.
			const parentBlock = await editorUtils.getBlockByName(
				'woocommerce/product-image-gallery'
			);
			const clientId =
				( await parentBlock.getAttribute( 'data-block' ) ) ?? '';
			const parentClientId =
				( await editorUtils.getBlockRootClientId( clientId ) ) ?? '';

			await editor.selectBlocks( parentBlock );
			await editorUtils.insertBlock(
				{ name: 'woocommerce/product-gallery' },
				undefined,
				parentClientId
			);
			await (
				await editorUtils.getBlockByName( blockData.name )
			 ).click();

			await editor.openDocumentSettingsSidebar();
			await page
				.locator(
					blockData.selectors.editor.rightPositionThumbnailsOption
				)
				.click();

			const block = await editorUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( block ).toHaveScreenshot();

			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPage, {
				waitUntil: 'networkidle',
			} );

			const blockFrontend = await frontendUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( blockFrontend ).toHaveScreenshot();
		} );
	} );
} );
