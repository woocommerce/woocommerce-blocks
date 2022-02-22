/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';

const block = {
	name: 'Mini Cart Block',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Mini Cart → Can view empty cart message and start shopping button', () => {
	it( 'When the cart is empty, the Mini Cart Drawer show empty cart message and start shopping button', async () => {
		await shopper.emptyCart();

		await shopper.goToBlockPage( block.name );

		await page.click( '.wc-block-mini-cart__button' );

		await expect( page ).toMatchElement( '.wc-block-mini-cart__drawer', {
			text: 'Start shopping',
		} );

		await expect( page ).toMatchElement( '.wc-block-mini-cart__drawer', {
			text: 'Your cart is currently empty!',
		} );
	} );
} );
