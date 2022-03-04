/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';

const simpleProductName = 'Woo Single #1';

describe( 'Shopper → Checkout → Can see warnings when form is incomplete', () => {
	beforeAll( async () => {
		await shopper.emptyCart();
	} );

	afterAll( async () => {
		await shopper.emptyCart();
	} );

	it( 'allows customer to proceed to checkout', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( simpleProductName );
		await shopper.goToCheckout();

		// Verify that you see the Checkout Block page
		await expect( page ).toMatchElement( 'h1', { text: 'Checkout' } );
	} );
} );
