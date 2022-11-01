/**
 * External dependencies
 */
import { canvas, setPostContent, insertBlock } from '@wordpress/e2e-test-utils';
import { visitBlockPage, saveOrPublish } from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import { GUTENBERG_EDITOR_CONTEXT, describeOrSkip } from '../../../utils';
import { shopper } from '../../../../utils';

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
		} );
		afterAll( async () => {
			await visitBlockPage( `${ block.name } Block` );
			await setPostContent( '' );
			await insertBlock( 'Product Query' );
			await saveOrPublish();
		} );

		it( 'Can add the Add to Cart Button block and render it on the front end.', async () => {
			const canvasEl = canvas();
			await canvasEl.waitForSelector(
				`${ block.class } .wp-block-woocommerce-product-image a img`
			);
			const postTitleEl = await canvasEl.$(
				`${ block.class } .wp-block-post-title`
			);
			await postTitleEl.click();
			await insertBlock( 'Add to Cart Button' );
			await expect( canvasEl ).toMatchElement( block.class, {
				text: 'Add to cart',
			} );
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
			const canvasEl = canvas();
			await canvasEl.waitForSelector(
				`${ block.class } .wp-block-woocommerce-product-image a img`
			);
			const postTitleEl = await canvasEl.$(
				`${ block.class } .wp-block-post-title`
			);
			await postTitleEl.click();
			await insertBlock( 'Product Image' );
			expect(
				await canvasEl.$$eval(
					`${ block.class } ul.wp-block-post-template > li.block-editor-block-list__layout .wp-block-woocommerce-product-image`,
					( images ) => images.length
				)
			).toEqual( 2 );
		} );

		it( 'Can add the Product Price block and render it on the front end', async () => {
			const canvasEl = canvas();
			await canvasEl.waitForSelector(
				`${ block.class } .wp-block-woocommerce-product-image a img`
			);
			const postTitleEl = await canvasEl.$(
				`${ block.class } .wp-block-post-title`
			);
			await postTitleEl.click();
			await insertBlock( 'Product Price' );
			await saveOrPublish();

			await shopper.block.goToBlockPage( block.name );
			await page.waitForSelector(
				'.wp-block-query .woocommerce-Price-amount'
			);
			await expect( page ).toMatchElement(
				'.wp-block-query .woocommerce-Price-amount',
				{
					text: '2.99',
				}
			);
		} );

		it( 'Can add the Product Ratings block and render it on the front end', async () => {
			const canvasEl = canvas();
			await canvasEl.waitForSelector(
				`${ block.class } .wp-block-woocommerce-product-image a img`
			);
			const postTitleEl = await canvasEl.$(
				`${ block.class } .wp-block-post-title`
			);
			await postTitleEl.click();
			await insertBlock( 'Product Rating' );
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
