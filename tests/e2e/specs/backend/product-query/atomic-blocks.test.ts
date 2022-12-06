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
	name: 'Products (Beta)',
	slug: 'woocommerce/product-query',
	class: '.wp-block-query',
};

const SELECTORS = {
	productButton: '.wc-block-components-product-button',
	productPrice: '.wc-block-components-product-price',
	productRating: '.wc-block-components-product-rating',
	productImage: '.wc-block-components-product-image',
	cartItemRow: '.wc-block-cart-items__row',
};

const resetProductQueryBlockPage = async () => {
	await visitBlockPage( `${ block.name } Block` );
	await waitForCanvas();
	await setPostContent( '' );
	await saveOrPublish();
	await insertBlock( block.name );
	await saveOrPublish();
};

const getNodesCount = async ( selector: string ) => {
	return await page.$$eval( selector, ( elements ) => elements.length );
};

const getEditorSelector = ( selector: string ) =>
	`li.block-editor-block-list__layout ${ selector }`;

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	`${ block.name } > Atomic blocks`,
	() => {
		beforeEach( async () => {
			await resetProductQueryBlockPage();
		} );

		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		it( 'Can add the Add to Cart Button block and render it on the front end', async () => {
			await page.waitForSelector( SELECTORS.productButton );
			await expect( canvas() ).toMatchElement( SELECTORS.productButton, {
				text: 'Add to cart',
			} );
			await insertInnerBlock(
				'Add to Cart Button',
				'core/post-template'
			);
			expect(
				await getNodesCount(
					getEditorSelector( SELECTORS.productButton )
				)
			).toEqual( 2 );

			await shopper.block.goToBlockPage( block.name );
			await page.waitForSelector( SELECTORS.productButton );
			await expect( page ).toClick( 'button', {
				text: 'Add to cart',
			} );
			await shopper.block.goToCart();
			await page.waitForSelector( '.wc-block-cart-items__row' );
			expect( await getNodesCount( SELECTORS.cartItemRow ) ).toEqual( 1 );
		} );

		it( 'Can add the Product Image block', async () => {
			await page.waitForSelector( SELECTORS.productImage );
			await insertInnerBlock( 'Product Image', 'core/post-template' );
			expect(
				await getNodesCount(
					getEditorSelector( SELECTORS.productImage )
				)
			).toEqual( 2 );
		} );

		it( 'Can add the Product Price block and render it on the front end', async () => {
			const fixturePrices = getFixtureProductsData( 'regular_price' );
			const testPrice =
				fixturePrices[
					Math.floor( Math.random() * fixturePrices.length )
				];
			await page.waitForSelector( SELECTORS.productPrice );
			await expect( canvas() ).toMatchElement( SELECTORS.productPrice, {
				text: testPrice,
			} );
			await insertInnerBlock( 'Product Price', 'core/post-template' );
			expect(
				await getNodesCount(
					getEditorSelector( SELECTORS.productPrice )
				)
			).toEqual( 2 );

			await shopper.block.goToBlockPage( block.name );
			await page.waitForSelector( SELECTORS.productPrice );
			await expect( page ).toMatchElement( SELECTORS.productPrice, {
				text: testPrice,
			} );
		} );

		it( 'Can add the Product Ratings block and render it on the front end', async () => {
			await page.waitForSelector( SELECTORS.productRating );
			await insertInnerBlock( 'Product Rating', 'core/post-template' );
			expect(
				await getNodesCount(
					getEditorSelector( SELECTORS.productRating )
				)
			).toEqual( 2 );

			await shopper.block.goToBlockPage( block.name );
			expect( await getNodesCount( SELECTORS.productRating ) ).toEqual(
				5
			);
		} );
	}
);
