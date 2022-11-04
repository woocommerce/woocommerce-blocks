/**
 * External dependencies
 */
import { canvas, setPostContent, insertBlock } from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	saveOrPublish,
	shopper,
	insertInnerBlock,
	getFixtureProductsData,
} from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import {
	GUTENBERG_EDITOR_CONTEXT,
	describeOrSkip,
	waitForCanvas,
} from '../../../utils';

const block = {
	name: 'Product Query',
	slug: 'woocommerce/product-query',
	class: '.wp-block-query',
};

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	'Product Query > Atomic blocks',
	() => {
		beforeEach( async () => {
			await visitBlockPage( `${ block.name } Block` );
			await waitForCanvas();
		} );

		afterAll( async () => {
			await visitBlockPage( `${ block.name } Block` );
			await setPostContent( '' );
			await insertBlock( 'Product Query' );
			await saveOrPublish();
		} );

		it( 'Can add the Add to Cart Button block and render it on the front end', async () => {
			await insertInnerBlock(
				'Add to Cart Button',
				'core/post-template'
			);
			await expect( canvas() ).toMatchElement(
				'.wp-block-query .wp-block-woocommerce-product-button',
				{
					text: 'Add to cart',
				}
			);
			await saveOrPublish();

			await shopper.block.goToBlockPage( block.name );
			await page.waitForSelector(
				'.wp-block-query button.add_to_cart_button'
			);
			await expect( page ).toClick( 'button', {
				text: 'Add to cart',
			} );
			await shopper.block.goToCart();
			await page.waitForSelector( '.wc-block-cart-items__row' );
			expect(
				await page.$$eval(
					'.wc-block-cart-items__row',
					( rows ) => rows.length
				)
			).toEqual( 1 );
		} );

		it( 'Can add the Product Image block', async () => {
			await insertInnerBlock( 'Product Image', 'core/post-template' );
			expect(
				await canvas().$$eval(
					`ul.wp-block-post-template > li.block-editor-block-list__layout .wp-block-woocommerce-product-image`,
					( images ) => images.length
				)
			).toEqual( 2 );
		} );

		it( 'Can add the Product Price block and render it on the front end', async () => {
			const fixturePrices = getFixtureProductsData( 'regular_price' );
			await insertInnerBlock( 'Product Price', 'core/post-template' );
			await expect( canvas() ).toMatchElement(
				'.wp-block-query .wc-block-components-product-price__value',
				{
					text: fixturePrices.some( Boolean ),
				}
			);
			await saveOrPublish();

			await shopper.block.goToBlockPage( block.name );
			await page.waitForSelector(
				'.wp-block-query .woocommerce-Price-amount'
			);
			await expect( page ).toMatchElement(
				'.wp-block-query .woocommerce-Price-amount',
				{
					text: fixturePrices.some( Boolean ),
				}
			);
		} );

		it( 'Can add the Product Ratings block and render it on the front end', async () => {
			await insertInnerBlock( 'Product Rating', 'core/post-template' );
			await expect( canvas() ).toMatchElement(
				'.wp-block-query .wc-block-components-product-rating'
			);
			await saveOrPublish();

			await shopper.block.goToBlockPage( block.name );
			expect(
				await page.$$eval(
					'.wc-block-components-product-rating',
					( rows ) => rows.length
				)
			).toEqual( 5 );
		} );
	}
);
