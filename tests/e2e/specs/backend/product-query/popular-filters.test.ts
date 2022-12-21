/**
 * External dependencies
 */
import {
	canvas,
	findSidebarPanelWithTitle,
	insertBlock,
} from '@wordpress/e2e-test-utils';
import {
	selectBlockByName,
	getFormElementIdByLabel,
	shopper,
	saveOrPublish,
} from '@woocommerce/blocks-test-utils';
import { ElementHandle } from 'puppeteer';

/**
 * Internal dependencies
 */
import {
	GUTENBERG_EDITOR_CONTEXT,
	describeOrSkip,
	openBlockEditorSettings,
} from '../../../utils';
import {
	block,
	SELECTORS,
	resetProductQueryBlockPage,
	getPreviewProducts,
	getFrontEndProducts,
	getProductTitle,
	getShortcodeProducts,
} from './common';

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	'Product Query > Popular Filters',
	() => {
		let $popularFiltersPanel: ElementHandle< Node >;
		beforeEach( async () => {
			/**
			 * Reset the block page before each test to ensure the block is
			 * inserted in a known state. This is also needed to ensure each
			 * test can be run individually.
			 */
			await resetProductQueryBlockPage();
			await openBlockEditorSettings();
			await selectBlockByName( block.slug );
			$popularFiltersPanel = await findSidebarPanelWithTitle(
				'Popular Filters'
			);
		} );

		/**
		 * Reset the content of Product Query Block page after this test suite
		 * to avoid breaking other tests.
		 */
		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		it( 'Popular Filters is expanded by default', async () => {
			await expect( $popularFiltersPanel ).toMatch(
				'Arrange products by popular pre-sets.'
			);
		} );

		describe( 'Sorted by title', () => {
			it( 'Is the default preset', async () => {
				await expect( $popularFiltersPanel ).toMatchElement(
					await getFormElementIdByLabel(
						'Choose among these pre-sets',
						'components-visually-hidden'
					),
					{ text: 'Sorted by title' }
				);
			} );

			it( 'Editor preview and block frontend display the same products', async () => {
				const previewProductsTitle = await Promise.all(
					(
						await getPreviewProducts()
					 ).map(
						async ( product ) => await getProductTitle( product )
					)
				);
				await shopper.block.goToBlockPage( block.name );
				await canvas().waitForSelector( SELECTORS.productsGrid );
				const frontEndProductsTitle = await Promise.all(
					(
						await getFrontEndProducts()
					 ).map(
						async ( product ) => await getProductTitle( product )
					)
				);
				expect( frontEndProductsTitle ).toEqual( previewProductsTitle );
			} );

			it( 'Products are displayed in the correct order', async () => {
				await insertBlock( 'Shortcode' );
				await page.keyboard.type(
					'[products orderby="title" order="ASC" limit="9"]'
				);
				await saveOrPublish();
				await shopper.block.goToBlockPage( block.name );
				const frontEndProductsTitle = await Promise.all(
					(
						await getFrontEndProducts()
					 ).map(
						async ( product ) => await getProductTitle( product )
					)
				);
				const shortcodeProductsTitle = await Promise.all(
					(
						await getShortcodeProducts()
					 ).map(
						async ( product ) => await getProductTitle( product )
					)
				);
				expect( frontEndProductsTitle ).toEqual(
					shortcodeProductsTitle
				);
			} );
		} );
	}
);
