/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { SIMPLE_PRODUCT_NAME } from '../../../utils/constants';

const block = {
	name: 'Cart',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Cart → Can update product quantity', () => {
	beforeEach( async () => {
		await shopper.block.emptyCart();
	} );

	afterAll( async () => {
		await shopper.block.emptyCart();
	} );

	it( 'allows customer to update product quantity', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCart();

		await shopper.block.setCartQuantity( SIMPLE_PRODUCT_NAME, 4 );
		await expect( page ).toMatchElement(
			'button.wc-block-cart__submit-button[disabled]'
		);
		await page.waitForNetworkIdle();
		await expect( page ).toMatchElement( 'a.wc-block-cart__submit-button' );
		// await expect( page ).toClick( 'button', { text: 'Update cart' } );
		// await uiUnblocked();

		await shopper.block.productIsInCart( SIMPLE_PRODUCT_NAME, 4 );
	} );
} );
