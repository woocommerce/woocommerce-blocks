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
	selectors: {
		productButton: '.wc-block-components-product-button',
		productPrice: '.wc-block-components-product-image',
		productRating: '.wc-block-components-product-rating',
		productImage: {
			editor: 'li.block-editor-block-list__layout .wc-block-components-product-image',
		},
	},
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
				block.selectors.productButton,
				{
					text: 'Add to cart',
				}
			);
			await saveOrPublish();

			await shopper.block.goToBlockPage( block.name );
			await page.waitForSelector( block.selectors.productButton );
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
					block.selectors.productImage.editor,
					( images ) => images.length
				)
			).toEqual( 2 );
		} );

		it( 'Can add the Product Price block and render it on the front end', async () => {
			const fixturePrices = getFixtureProductsData( 'regular_price' );
			await insertInnerBlock( 'Product Price', 'core/post-template' );
			await expect( canvas() ).toMatchElement(
				block.selectors.productPrice,
				{
					text: fixturePrices.some( Boolean ),
				}
			);
			await saveOrPublish();

			await shopper.block.goToBlockPage( block.name );
			await page.waitForSelector( block.selectors.productPrice );
			await expect( page ).toMatchElement( block.selectors.productPrice, {
				text: fixturePrices.some( Boolean ),
			} );
		} );

		it( 'Can add the Product Ratings block and render it on the front end', async () => {
			await insertInnerBlock( 'Product Rating', 'core/post-template' );
			await expect( canvas() ).toMatchElement(
				block.selectors.productRating
			);
			await saveOrPublish();

			await shopper.block.goToBlockPage( block.name );
			expect(
				await page.$$eval(
					block.selectors.productRating,
					( rows ) => rows.length
				)
			).toEqual( 5 );
		} );
	}
);
