/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Cart → Can remove product', () => {
	beforeAll( async () => {
		await shopper.block.emptyCart();
	} );

	it( 'Can remove product from cart', async () => {
		await shopper.block.goToCart();

		// Verify cart is empty'
		await expect( page ).toMatchElement( 'h2', {
			text: 'Your cart is currently empty!',
		} );
	} );
} );
