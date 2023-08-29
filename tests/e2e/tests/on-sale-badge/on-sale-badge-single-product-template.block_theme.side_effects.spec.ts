/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';
import { EditorUtils, FrontendUtils } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */

const blockData = {
	name: 'woocommerce/product-sale-badge',
	mainClass: '.wp-block-woocommerce-product-sale-badge',
	selectors: {
		frontend: {
			productSaleBadge: '.wc-block-components-product-sale-badge',
			productSaleBadgeContainer:
				'.wp-block-woocommerce-product-sale-badge',
		},
		editor: {
			productSaleBadge: '.wc-block-components-product-sale-badge',
			productSaleBadgeContainer:
				'.wp-block-woocommerce-product-sale-badge',
		},
	},
	slug: 'single-product',
	productPage: '/product/logo-collection/',
	productPageNotOnSale: '/product/album/',
};

const getBoundingClientRect = async ( {
	frontendUtils,
	editorUtils,
	isFrontend,
}: {
	frontendUtils: FrontendUtils;
	editorUtils: EditorUtils;
	isFrontend: boolean;
} ) => {
	const page = isFrontend ? frontendUtils.page : editorUtils.editor.canvas;
	return {
		productSaleBadge: await page
			.locator(
				blockData.selectors[ isFrontend ? 'frontend' : 'editor' ]
					.productSaleBadge
			)
			.evaluate( ( el ) => el.getBoundingClientRect() ),
		productSaleBadgeContainer: await page
			.locator(
				blockData.selectors[ isFrontend ? 'frontend' : 'editor' ]
					.productSaleBadge
			)
			.evaluate( ( el ) => el.getBoundingClientRect() ),
	};
};
test.describe( `${ blockData.name }`, () => {
	test.describe( `On the Single Product Template`, () => {
		test.beforeEach(
			async ( { requestUtils, admin, editorUtils, editor } ) => {
				await requestUtils.deleteAllTemplates( 'wp_template' );
				await requestUtils.deleteAllTemplates( 'wp_template_part' );
				await admin.visitSiteEditor( {
					postId: `woocommerce/woocommerce//${ blockData.slug }`,
					postType: 'wp_template',
				} );
				await editorUtils.enterEditMode();
				await editor.setContent( '' );
			}
		);

		test.afterEach( async ( { requestUtils } ) => {
			await requestUtils.deleteAllTemplates( 'wp_template' );
			await requestUtils.deleteAllTemplates( 'wp_template_part' );
		} );

		test( 'should be rendered on the editor side', async ( {
			editorUtils,
			editor,
		} ) => {
			await editor.insertBlock( {
				name: 'woocommerce/product-gallery',
			} );

			const block = await editorUtils.getBlockByName( blockData.name );

			await expect( block ).toBeVisible();
		} );

		test( 'should be rendered on the frontend side', async ( {
			frontendUtils,
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: 'woocommerce/product-gallery',
			} );
			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPage, {
				waitUntil: 'commit',
			} );

			const block = await frontendUtils.getBlockByName( blockData.name );

			await expect( block ).toBeVisible();
		} );

		test( `should be not rendered when the product isn't on sale the frontend side`, async ( {
			frontendUtils,
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: 'woocommerce/product-gallery',
			} );
			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPageNotOnSale, {
				waitUntil: 'commit',
			} );

			const block = await frontendUtils.getBlockByName( blockData.name );

			await expect( block ).toBeHidden();
		} );

		test( 'should be aligned on the left by default', async ( {
			frontendUtils,
			editorUtils,
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: 'woocommerce/product-gallery',
			} );

			const editorBoundingClientRect = await getBoundingClientRect( {
				frontendUtils,
				editorUtils,
				isFrontend: false,
			} );

			await expect( editorBoundingClientRect.productSaleBadge.x ).toEqual(
				editorBoundingClientRect.productSaleBadgeContainer.x
			);

			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPage, {
				waitUntil: 'commit',
			} );

			const clientBoundingClientRect = await getBoundingClientRect( {
				frontendUtils,
				editorUtils,
				isFrontend: false,
			} );

			await expect( clientBoundingClientRect.productSaleBadge.x ).toEqual(
				clientBoundingClientRect.productSaleBadgeContainer.x
			);
		} );

		test( 'should be aligned on the center', async ( {
			frontendUtils,
			editorUtils,
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: 'woocommerce/product-gallery',
			} );

			const block = await editorUtils.getBlockByName( blockData.name );

			await block.click();

			await editorUtils.setAlignOption( 'Align Center' );

			const editorBoundingClientRect = await getBoundingClientRect( {
				frontendUtils,
				editorUtils,
				isFrontend: false,
			} );

			await expect(
				editorBoundingClientRect.productSaleBadge.x
			).toBeLessThan(
				editorBoundingClientRect.productSaleBadgeContainer.x
			);

			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPage, {
				waitUntil: 'commit',
			} );

			const clientBoundingClientRect = await getBoundingClientRect( {
				frontendUtils,
				editorUtils,
				isFrontend: false,
			} );

			await expect(
				clientBoundingClientRect.productSaleBadge.x
			).toBeLessThan(
				clientBoundingClientRect.productSaleBadgeContainer.x
			);
		} );

		test( 'should be aligned on the right', async ( {
			frontendUtils,
			editorUtils,
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: 'woocommerce/product-gallery',
			} );

			const block = await editorUtils.getBlockByName( blockData.name );

			await block.click();

			await editorUtils.setAlignOption( 'Align Right' );

			const editorBoundingClientRect = await getBoundingClientRect( {
				frontendUtils,
				editorUtils,
				isFrontend: false,
			} );

			await expect( editorBoundingClientRect.productSaleBadge.x ).toEqual(
				editorBoundingClientRect.productSaleBadgeContainer.x
			);

			await Promise.all( [
				editor.saveSiteEditorEntities(),
				page.waitForResponse( ( response ) =>
					response.url().includes( 'wp-json/wp/v2/templates/' )
				),
			] );

			await page.goto( blockData.productPage, {
				waitUntil: 'commit',
			} );

			const clientBoundingClientRect = await getBoundingClientRect( {
				frontendUtils,
				editorUtils,
				isFrontend: false,
			} );

			await expect( clientBoundingClientRect.productSaleBadge.x ).toEqual(
				clientBoundingClientRect.productSaleBadgeContainer.x
			);
		} );
	} );
} );
