/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';
import { cli } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import PriceFilterPage, { blockData } from './price-filter.page';

base.describe( `${ blockData.name } Block - with PHP classic template`, () => {
	const test = base.extend< { pageObject: PriceFilterPage } >( {
		pageObject: async (
			{ page, admin, editor, templateApiUtils },
			use
		) => {
			const pageObject = new PriceFilterPage( {
				page,
				editor,
				admin,
				templateApiUtils,
			} );
			await use( pageObject );
		},
	} );

	test.beforeAll( async () => {
		await cli(
			'npm run wp-env run tests-cli "wp option update wc_blocks_use_blockified_product_grid_block_as_template false"'
		);
	} );

	test.beforeEach( async ( { pageObject } ) => {
		await pageObject.revertArchiveProductTemplate();
	} );

	test( 'should show all products', async ( { pageObject } ) => {
		await pageObject.addPriceFilterBlockToProductCatalogAndGoToShop();

		const products = await pageObject.locateAllProducts();
		expect( products ).toHaveCount( 16 );
	} );

	test( 'should show only products that match the filter', async ( {
		pageObject,
	} ) => {
		await pageObject.addPriceFilterBlockToProductCatalogAndGoToShop();
		await pageObject.setPriceFilterRange( 2, 3 );

		const products = await pageObject.locateAllProducts();
		expect( products ).toHaveCount( 1 );
	} );

	test.afterAll( async () => {
		await cli(
			'npm run wp-env run tests-cli "wp option delete wc_blocks_use_blockified_product_grid_block_as_template"'
		);
	} );
} );
