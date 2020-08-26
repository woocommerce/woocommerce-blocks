/**
 * External dependencies
 */
import { switchUserToAdmin, clickButton } from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	findElementWithText,
} from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import { Products as fixtureProducts } from '../../fixtures/fixture-data';

const block = {
	name: 'Reviews by Category',
	slug: 'woocommerce/reviews-by-category',
	class: '.wc-block-reviews-by-category',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'shows category selector', async () => {
		await expect( page ).toMatchElement(
			`${ block.class } .woocommerce-search-list`
		);
	} );

	it( 'can select a category and show reviews', async () => {
		// we focus on the block
		await page.click( block.class );
		await page.waitForSelector(
			`${ block.class } .woocommerce-search-list__item`
		);
		const categoryWithReviews = await findElementWithText(
			`.woocommerce-search-list__item`,
			fixtureProducts()[ 0 ].categories[ 0 ]
		);
		await categoryWithReviews.click();
		await clickButton( 'Done' );
		// Selected.
		await page.waitForSelector(
			'.wc-block-review-list .wc-block-review-list-item__item:not(.is-loading)'
		);
		expect(
			await page.$$eval(
				'.wc-block-review-list .wc-block-review-list-item__item',
				( reviews ) => reviews.length
			)
		).toBeGreaterThanOrEqual( 6 ); // Fixture data has three reviews per product, and there are multiple products.
	} );
} );
