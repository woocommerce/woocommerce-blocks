/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { addBlock } from './utils';

const blockData = {
	name: 'woocommerce/product-gallery-large-image-next-previous',
	mainClass:
		'.wp-block-woocommerce-product-gallery-large-image-next-previous',
	selectors: {
		frontend: {},
		editor: {
			leftArrow:
				'.wc-block-product-gallery-large-image-next-previous-left--off',
			rightArrow:
				'.wc-block-product-gallery-large-image-next-previous-right--off',
			noArrowsOption: 'button[data-value=off]',
			outsideTheImageOption: 'button[data-value=outsideTheImage]',
			insideTheImageOption: 'button[data-value=insideTheImage]',
		},
	},
	slug: 'single-product',
	productPage: '/product/album/',
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

	test( 'Renders Next/Previous Button block on the editor side', async ( {
		editorUtils,
		editor,
	} ) => {
		await editor.insertBlock( {
			name: 'woocommerce/product-gallery',
		} );

		const block = await editorUtils.getBlockByName( blockData.name );

		await expect( block ).toBeVisible();
	} );

	test( 'Renders Next/Previous Button block on the frontend side', async ( {
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
		test( 'Hide correctly the arrows', async ( {
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
				.locator( blockData.selectors.editor.noArrowsOption )
				.click();

			const isVisible = await page
				.locator(
					'.wc-block-product-gallery-large-image-next-previous-container'
				)
				.isVisible();

			expect( isVisible ).toBe( false );

			await editor.saveSiteEditorEntities();

			await page.goto( blockData.productPage, {
				waitUntil: 'commit',
			} );

			const leftArrow = await page
				.locator( blockData.selectors.editor.leftArrow )
				.isVisible();

			const rightArrow = await page
				.locator( blockData.selectors.editor.rightArrow )
				.isVisible();

			expect( leftArrow ).toBe( false );
			expect( rightArrow ).toBe( false );
		} );

		test( 'Show button outside of the image', async ( {
			page,
			editor,
			editorUtils,
			frontendUtils,
		} ) => {
			// Currently we are adding the block under the related products block, but in the future we have to add replace the product gallery block with this block.
			const parentBlock = await editorUtils.getBlockByName(
				'woocommerce/product-image-gallery'
			);
			const clientId =
				// eslint-disable-next-line playwright/no-conditional-in-test
				( await parentBlock.getAttribute( 'data-block' ) ) ?? '';
			const parentClientId =
				// eslint-disable-next-line playwright/no-conditional-in-test
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
				.locator( blockData.selectors.editor.outsideTheImageOption )
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
				waitUntil: 'commit',
			} );

			const blockFrontend = await frontendUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( blockFrontend ).toHaveScreenshot();
		} );

		test( 'Show button inside of the image', async ( {
			page,
			editor,
			editorUtils,
			frontendUtils,
		} ) => {
			// Currently we are adding the block under the related products block, but in the future we have to add replace the product gallery block with this block.
			const parentBlock = await editorUtils.getBlockByName(
				'woocommerce/product-image-gallery'
			);
			const clientId =
				// eslint-disable-next-line playwright/no-conditional-in-test
				( await parentBlock.getAttribute( 'data-block' ) ) ?? '';
			const parentClientId =
				// eslint-disable-next-line playwright/no-conditional-in-test
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
				.locator( blockData.selectors.editor.insideTheImageOption )
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
				waitUntil: 'commit',
			} );

			const blockFrontend = await frontendUtils.getBlockByName(
				'woocommerce/product-gallery'
			);

			await expect( blockFrontend ).toHaveScreenshot();
		} );
	} );
} );
