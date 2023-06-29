/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';
import { cli } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import PriceFilterPage, { blockData } from './price-filter.page';

const test = base.extend< { pageObject: PriceFilterPage } >( {
	pageObject: async ( { page, admin, editor, templateApiUtils }, use ) => {
		const pageObject = new PriceFilterPage( {
			page,
			editor,
			admin,
			templateApiUtils,
		} );
		await use( pageObject );
	},
} );

test.describe( `${ blockData.name } Block - with All products Block`, () => {
	test( 'should show all products', async ( { pageObject } ) => {
		await pageObject.addPriceFilterBlockToNewPostAndGoToFrontend();
		const img = await pageObject.locateFirstImage();

		await expect( img ).not.toHaveAttribute(
			'src',
			blockData.placeholderUrl
		);

		const allProductsBlock = await pageObject.locateAllProductsBlock();
		const products = await allProductsBlock.getByRole( 'listitem' ).all();

		expect( products ).toHaveLength( 9 );
	} );

	test( 'should show only products that match the filter', async ( {
		page,
		pageObject,
	} ) => {
		await pageObject.addPriceFilterBlockToNewPostAndGoToFrontend();
		await pageObject.setPrice( 2, 3 );

		const img = await pageObject.locateFirstImage();
		await expect( img ).not.toHaveAttribute(
			'src',
			blockData.placeholderUrl
		);

		const allProductsBlock = await pageObject.locateAllProductsBlock();
		const products = await allProductsBlock.getByRole( 'listitem' ).all();

		expect( products ).toHaveLength( 1 );
		expect( page.url() ).toContain(
			blockData.urlSearchParamWhenFilterIsApplied( 2, 3 )
		);
	} );
} );

test.describe( `${ blockData.name } Block - with PHP classic template`, () => {
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

		const products = await pageObject.getAllProducts();
		expect( products ).toHaveCount( 16 );
	} );

	test( 'should show only products that match the filter', async ( {
		pageObject,
	} ) => {
		await pageObject.addPriceFilterBlockToProductCatalogAndGoToShop();
		await pageObject.setPrice( 2, 3 );

		const products = await pageObject.getAllProducts();
		expect( products ).toHaveCount( 1 );
	} );

	test.afterAll( async () => {
		await cli(
			'npm run wp-env run tests-cli "wp option delete wc_blocks_use_blockified_product_grid_block_as_template"'
		);
	} );
} );
