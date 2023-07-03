/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import PriceFilterPage, { blockData } from './price-filter.page';

base.describe( `${ blockData.name } Block - with All products Block`, () => {
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

	test( 'should show all products', async ( { pageObject } ) => {
		await pageObject.addPriceFilterBlockToNewPostAndGoToFrontend();

		const firstProductImage = await pageObject.locateFirstImage();
		await expect( firstProductImage ).not.toHaveAttribute(
			'src',
			blockData.placeholderUrl
		);

		const allProductsBlock = await pageObject.locateAllProductsBlock();
		const products = await allProductsBlock.getByRole( 'listitem' ).all();
		expect( products ).toHaveLength( 9 );
	} );

	test( 'should show only products that match the filter', async ( {
		pageObject,
	} ) => {
		await pageObject.addPriceFilterBlockToNewPostAndGoToFrontend();
		await pageObject.setPriceFilterRange( 2, 3 );

		const firstProductImage = await pageObject.locateFirstImage();
		await expect( firstProductImage ).not.toHaveAttribute(
			'src',
			blockData.placeholderUrl
		);

		const allProductsBlock = await pageObject.locateAllProductsBlock();
		const products = await allProductsBlock.getByRole( 'listitem' ).all();
		expect( products ).toHaveLength( 1 );
	} );
} );
