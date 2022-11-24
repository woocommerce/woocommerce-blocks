/**
 * External dependencies
 */
import { canvas } from '@wordpress/e2e-test-utils';
import {
	selectBlockByName,
	findToolsPanelWithTitle,
	getFixtureProductsData,
	shopper,
} from '@woocommerce/blocks-test-utils';

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
} from './common';

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	'Product Query > Product Query Variations',
	() => {
		/**
		 * Reset the content of Product Query Block page after this test suite
		 * to avoid breaking other tests.
		 */
		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		describe( 'Products on Sale', () => {
			beforeEach( async () => {
				await resetProductQueryBlockPage( 'Products on Sale' );
			} );

			it( 'Sale status is not available in product fitlers menu.', async () => {
				await openBlockEditorSettings();
				await selectBlockByName( block.slug );
				const $advancedFiltersPanel = await findToolsPanelWithTitle(
					'Product filters'
				);
				await expect( $advancedFiltersPanel ).toClick(
					SELECTORS.advancedFiltersDropdownButton()
				);
				await canvas().waitForSelector(
					SELECTORS.advancedFiltersDropdown
				);
				await expect( canvas() ).not.toMatchElement(
					SELECTORS.advancedFiltersDropdownItem,
					{
						text: 'Sale status',
					}
				);
				/**
				 * Other product filters are available.
				 */
				await expect( canvas() ).toMatchElement(
					SELECTORS.advancedFiltersDropdownItem,
					{
						text: 'Stock status',
					}
				);
			} );

			it( 'Editor preview shows only on-sale products', async () => {
				const saleCount = getFixtureProductsData( 'sale_price' ).length;
				expect( await getPreviewProducts() ).toHaveLength( saleCount );
			} );

			it( 'Front end shows only on-sale products', async () => {
				await shopper.block.goToBlockPage( block.name );
				const saleCount = getFixtureProductsData( 'sale_price' ).length;
				expect( await getFrontEndProducts() ).toHaveLength( saleCount );
			} );
		} );
	}
);
