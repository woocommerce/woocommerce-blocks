/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { SIMPLE_PRODUCT_NAME, BILLING_DETAILS } from '../../../utils/constants';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `Skipping checkout tests`, () => {} );

beforeAll( async () => {
	// await shopper.block.emptyCart();
} );

afterAll( async () => {
	// await shopper.block.emptyCart();
} );

describe( 'Shopper → Checkout → Can apply single-use coupon once', () => {
	it( 'allows customer to apply single-use coupon once', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCheckout();
		// => Apply the single-use coupon.
		// => Verify that the discount had been applied correctly on the checkout page.
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Your order has been received.' );
		// => Verify that the discount had been applied correctly on the order confirmation page.
	} );

	it.skip( 'Prevents customer from applying single-use coupon twice', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCheckout();
		// => Apply the same single-use coupon as in the first test case.
		// => Verify that an error appears, showing that the coupon can no longer be used.
	} );
} );
