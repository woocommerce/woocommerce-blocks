import { image } from '@wordpress/icons';
/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */

import { ProductGalleryPage } from '../../product-gallery.page';
import { InteractivityApiUtils } from '@woocommerce/e2e-utils';
const blockData = {
	name: 'woocommerce/product-gallery-large-image',
	selectors: {
		frontend: {},
		editor: {},
	},
	slug: 'single-product',
	productPage: '/product/hoodie/',
};

const test = base.extend< { pageObject: ProductGalleryPage } >( {
	pageObject: async ( { page, editor, frontendUtils, editorUtils }, use ) => {
		const pageObject = new ProductGalleryPage( {
			page,
			editor,
			frontendUtils,
			editorUtils,
		} );
		await use( pageObject );
	},
} );

const interactivityApiUtils = new InteractivityApiUtils();

test.describe( `${ blockData.name }`, () => {
	test.beforeEach( async ( { requestUtils, admin, editorUtils, editor } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
		await admin.visitSiteEditor( {
			postId: `woocommerce/woocommerce//${ blockData.slug }`,
			postType: 'wp_template',
		} );
		await editorUtils.enterEditMode();
		await editor.openDocumentSettingsSidebar();
	} );

	test.afterEach( async ( { requestUtils } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
	} );

	test( 'Renders Product Gallery Large Image block on the editor and frontend side', async ( {
		page,
		editorUtils,
		pageObject,
	} ) => {
		await pageObject.addProductGalleryBlock( { cleanContent: true } );

		const block = await pageObject.getMainImageBlock( {
			page: 'editor',
		} );

		await expect( block ).toBeVisible();

		await editorUtils.saveTemplate();

		await page.goto( blockData.productPage, {
			waitUntil: 'commit',
		} );

		const blockFrontend = await pageObject.getMainImageBlock( {
			page: 'frontend',
		} );

		await expect( blockFrontend ).toBeVisible();
	} );

	test.describe( 'Zoom while hovering setting', () => {
		test( 'should be enabled by default', async ( { pageObject } ) => {
			await pageObject.addProductGalleryBlock( { cleanContent: true } );
			const zoomWhileHoveringSetting =
				await pageObject.getZoomWhileHoveringSetting();

			await expect( zoomWhileHoveringSetting ).toBeChecked();
		} );
		test( 'should work on frontend when is enabled', async ( {
			pageObject,
			editorUtils,
			page,
		} ) => {
			await pageObject.addProductGalleryBlock( { cleanContent: true } );
			await pageObject.toggleZoomWhileHoveringSetting( true );
			await editorUtils.saveTemplate();

			await page.goto( blockData.productPage, {
				waitUntil: 'commit',
			} );

			const blockFrontend = await pageObject.getMainImageBlock( {
				page: 'frontend',
			} );

			// img[style] is the selector because the style attribute is Interactivity API.
			const imgElement = blockFrontend.locator( 'img' ).first();
			const style = await imgElement.evaluate( ( el ) => el.style );

			await expect( style.transform ).toBe( 'scale(1)' );

			await imgElement.hover();

			const styleOnHover = await imgElement.evaluate(
				( el ) => el.style
			);

			await expect( styleOnHover.transform ).toBe( 'scale(1.3)' );
		} );

		test( 'should not work on frontend when is disabled', async ( {
			pageObject,
			editorUtils,
			page,
		} ) => {
			await pageObject.addProductGalleryBlock( { cleanContent: true } );
			await pageObject.toggleZoomWhileHoveringSetting( false );
			const buttonElement =
				await pageObject.getZoomWhileHoveringSetting();

			await expect( buttonElement ).not.toBeChecked();

			await editorUtils.saveTemplate();

			await page.goto( blockData.productPage, {
				waitUntil: 'commit',
			} );

			const blockFrontend = await pageObject.getMainImageBlock( {
				page: 'frontend',
			} );

			const imgElement = blockFrontend.locator( 'img' ).first();
			const style = await imgElement.evaluate( ( el ) => el.style );

			await expect( style.transform ).toBe( '' );

			await imgElement.hover();

			const styleOnHover = await imgElement.evaluate(
				( el ) => el.style
			);

			await expect( styleOnHover.transform ).toBe( '' );
		} );
	} );

	test( 'Renders correct image when selecting a product variation in the Add to Cart With Options block', async ( {
		page,
		editorUtils,
		pageObject,
	} ) => {
		await pageObject.addProductGalleryBlock( { cleanContent: false } );
		await pageObject.addAddToCartWithOptionsBlock();

		const block = await pageObject.getMainImageBlock( {
			page: 'editor',
		} );

		await expect( block ).toBeVisible();

		await editorUtils.saveTemplate();

		await page.goto( blockData.productPage, {
			waitUntil: 'commit',
		} );

		const largeImageBlockOnFrontend = await pageObject.getMainImageBlock( {
			page: 'frontend',
		} );

		const largeImageElement = largeImageBlockOnFrontend.locator(
			'.wc-block-woocommerce-product-gallery-large-image__image--active-image-slide'
		);

		const imageSourceForLargeImageElement =
			await largeImageElement.getAttribute( 'src' );

		const addToCartWithOptionsBlock =
			await pageObject.getAddToCartWithOptionsBlock( {
				page: 'frontend',
			} );
		const addToCartWithOptionsColorSelector =
			addToCartWithOptionsBlock.getByLabel( 'Color' );
		const addToCartWithOptionsSizeSelector =
			addToCartWithOptionsBlock.getByLabel( 'Logo' );

		await addToCartWithOptionsColorSelector.selectOption( 'Green' );
		await addToCartWithOptionsSizeSelector.selectOption( 'No' );

		const largeImageElementAfterSelectingVariation =
			largeImageBlockOnFrontend.locator(
				'.wc-block-woocommerce-product-gallery-large-image__image--active-image-slide'
			);

		const imageSourceForLargeImageElementAfterSelectingVariation =
			await largeImageElementAfterSelectingVariation.getAttribute(
				'src'
			);

		expect( imageSourceForLargeImageElement ).not.toEqual(
			imageSourceForLargeImageElementAfterSelectingVariation
		);
	} );
} );
