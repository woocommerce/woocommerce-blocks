/**
 * External dependencies
 */
import { switchUserToAdmin, clickButton } from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	findElementWithText,
} from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Reviews by Product',
	slug: 'woocommerce/reviews-by-product',
	class: '.wc-block-reviews-by-product',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'shows product selector', async () => {
		await expect( page ).toMatchElement(
			`${ block.class } .woocommerce-search-list`
		);
	} );

	it( 'can select a product and show reviews', async () => {
		// we focus on the block
		await page.click( block.class );
		await page.waitForSelector(
			`${ block.class } .woocommerce-search-list__item-count`
		);
		const productWithReviews = await findElementWithText(
			`.woocommerce-search-list__item-count`,
			'[1-9]+ Reviews'
		);
		await productWithReviews.click();
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
		).toBeGreaterThanOrEqual( 3 ); // Fixture data has three reviews per product.
	} );
} );
