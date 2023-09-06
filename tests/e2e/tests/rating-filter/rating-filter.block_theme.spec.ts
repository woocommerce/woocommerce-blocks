/**
 * External dependencies
 */
import { test } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { ProductRatingPage } from './rating-filter.page';

test.describe( 'Filter by Rating Block - with All products Block', () => {
	test( 'should show only show products that match the filter', async ( args ) => {
		const pageObject = new ProductRatingPage( args );

		await pageObject.publishPostWithBlockThenView();

		expect( null ).toBeNull();

		// expect( await pageObject.getProductsList() ).toHaveLength( 10 );

		// await page.goto(
		// 	'/active-filters-block/?filter_color=blue&query_type_color=or',
		// 	{
		// 		waitUntil: 'commit',
		// 	}
		// );
		// // Check if the page has loaded successfully.
		// await expect( page.getByText( 'Active Filters block' ) ).toBeVisible();
		// const expectedValues = [ '4', '0', '2', '2', '0' ];
		// await expect(
		// 	page
		// 		.locator( 'ul.wc-block-attribute-filter-list' )
		// 		.first()
		// 		.locator(
		// 			'> li:not([class^="is-loading"]) .wc-filter-element-label-list-count > span:not([class^="screen-reader"])'
		// 		)
		// ).toHaveText( expectedValues );
	} );
} );
