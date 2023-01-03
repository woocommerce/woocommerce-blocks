/**
 * External dependencies
 */
import {
	saveOrPublish,
	selectBlockByName,
	findToolsPanelWithTitle,
	getFixtureProductsData,
	shopper,
	getToggleIdByLabel,
} from '@woocommerce/blocks-test-utils';
import { ElementHandle } from 'puppeteer';
import { setCheckbox, unsetCheckbox } from '@woocommerce/e2e-utils';
import { ensureSidebarOpened } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { GUTENBERG_EDITOR_CONTEXT, describeOrSkip } from '../../../utils';
import {
	block,
	SELECTORS,
	resetProductQueryBlockPage,
	toggleAdvancedFilter,
	getPreviewProducts,
	getFrontEndProducts,
	clearSelectedTokens,
	selectToken,
} from './common';

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	`${ block.name } > Advanced Filters`,
	() => {
		let $productFiltersPanel: ElementHandle< Node >;
		const defaultCount = getFixtureProductsData().length;
		const saleCount = getFixtureProductsData( 'sale_price' ).length;
		const outOfStockCount = getFixtureProductsData( 'stock_status' ).filter(
			( status: string ) => status === 'outofstock'
		).length;

		beforeEach( async () => {
			/**
			 * Reset the block page before each test to ensure the block is
			 * inserted in a known state. This is also needed to ensure each
			 * test can be run individually.
			 */
			await resetProductQueryBlockPage();
			await ensureSidebarOpened();
			await selectBlockByName( block.slug );
			$productFiltersPanel = await findToolsPanelWithTitle(
				'Advanced Filters'
			);
		} );

		/**
		 * Reset the content of Product Query Block page after this test suite
		 * to avoid breaking other tests.
		 */
		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		describe( 'Sale Status', () => {
			it( 'Sale status is disabled by default', async () => {
				await expect( $productFiltersPanel ).not.toMatch(
					'Show only products on sale'
				);
			} );

			it( 'Can add and remove Sale Status filter', async () => {
				await toggleAdvancedFilter( 'Sale status' );
				await expect( $productFiltersPanel ).toMatch(
					'Show only products on sale'
				);
				await toggleAdvancedFilter( 'Sale status' );
				await expect( $productFiltersPanel ).not.toMatch(
					'Show only products on sale'
				);
			} );

			it( 'Editor preview shows correct products corresponding to the value `Show only products on sale`', async () => {
				expect( await getPreviewProducts() ).toHaveLength(
					defaultCount
				);
				await toggleAdvancedFilter( 'Sale status' );
				await setCheckbox(
					await getToggleIdByLabel( 'Show only products on sale' )
				);
				expect( await getPreviewProducts() ).toHaveLength( saleCount );
				await unsetCheckbox(
					await getToggleIdByLabel( 'Show only products on sale' )
				);
				expect( await getPreviewProducts() ).toHaveLength(
					defaultCount
				);
			} );

			it( 'Works on the front end', async () => {
				await toggleAdvancedFilter( 'Sale status' );
				await setCheckbox(
					await getToggleIdByLabel( 'Show only products on sale' )
				);
				expect( await getPreviewProducts() ).toHaveLength( saleCount );
				await saveOrPublish();
				await shopper.block.goToBlockPage( block.name );
				expect( await getFrontEndProducts() ).toHaveLength( saleCount );
			} );
		} );

		describe( 'Stock Status', () => {
			it( 'Stock status is enabled by default', async () => {
				await expect( $productFiltersPanel ).toMatchElement(
					SELECTORS.formTokenField.label,
					{ text: 'Stock status' }
				);
			} );

			it( 'Can add and remove Stock Status filter', async () => {
				await toggleAdvancedFilter( 'Stock status' );
				await expect( $productFiltersPanel ).not.toMatchElement(
					SELECTORS.formTokenField.label,
					{ text: 'Stock status' }
				);
				await toggleAdvancedFilter( 'Stock status' );
				await expect( $productFiltersPanel ).toMatchElement(
					SELECTORS.formTokenField.label,
					{ text: 'Stock status' }
				);
			} );

			it( 'All statuses are enabled by default', async () => {
				await expect( $productFiltersPanel ).toMatch( 'In stock' );
				await expect( $productFiltersPanel ).toMatch( 'Out of stock' );
				await expect( $productFiltersPanel ).toMatch( 'On backorder' );
			} );

			it( 'Editor preview shows all products by default', async () => {
				expect( await getPreviewProducts() ).toHaveLength(
					defaultCount
				);
			} );

			it( 'The filter works in both editor and front end', async () => {
				await clearSelectedTokens( $productFiltersPanel );
				await selectToken( 'Stock status', 'Out of stock' );
				expect( await getPreviewProducts() ).toHaveLength(
					outOfStockCount
				);
				await saveOrPublish();
				await shopper.block.goToBlockPage( block.name );
				expect( await getFrontEndProducts() ).toHaveLength(
					outOfStockCount
				);
			} );
		} );
	}
);
