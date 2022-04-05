/**
 * Internal dependencies
 */
import { shopper } from '../../../../utils';
import {
	SIMPLE_VIRTUAL_PRODUCT_NAME,
	PAYMENT_BACS,
	PAYMENT_CHEQUE,
	PAYMENT_COD,
} from '../../../../utils/constants';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping Cart & Checkout tests`, () => {} );
}

describe( 'Shopper → Cart & Checkout → Payments', () => {
	beforeEach( async () => {
		await shopper.block.emptyCart();
	} );

	afterAll( async () => {
		await shopper.block.emptyCart();
	} );
	it( 'Express Payment button is available on both Cart & Checkout pages', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await shopper.block.goToCart();
		await shopper.block.mockExpressPaymentMethod();
		// We need to re-render the cart for the express payments block to be updated,
		// so we update the qty, which update one of it's attributes and in turn causes a re-render
		await page.click(
			'.wc-block-components-quantity-selector__button--plus'
		);
		await page.waitForNetworkIdle( { idleTime: 1000 } );
		await await expect( page ).toMatchElement(
			'#express-payment-method-mock_express_payment'
		);
		await shopper.block.goToCheckout();
		await shopper.block.mockExpressPaymentMethod();
		// We need to re-render the checkout for the express payments block to be updated,
		// so we just type a space in the email field.
		await expect( page ).toFill( '#email', ' ' );
		await expect( page ).toMatchElement(
			'#express-payment-method-mock_express_payment'
		);
	} );

	it( 'Customer can pay using Direct bank transfer', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await shopper.block.goToCheckout();
		await shopper.block.selectPayment( PAYMENT_BACS );
		await shopper.block.fillInCheckoutWithTestData();
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Order received' );
		await expect( page ).toMatch( PAYMENT_BACS );
	} );

	it( 'Customer can pay using Cash on delivery', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await shopper.block.goToCheckout();
		await shopper.block.selectPayment( PAYMENT_COD );
		await shopper.block.fillInCheckoutWithTestData();
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Order received' );
		await expect( page ).toMatch( PAYMENT_COD );
	} );

	it( 'Customer can pay using Check payments', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await shopper.block.goToCheckout();
		await shopper.block.selectPayment( PAYMENT_CHEQUE );
		await shopper.block.fillInCheckoutWithTestData();
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Order received' );
		await expect( page ).toMatch( PAYMENT_CHEQUE );
	} );
} );
