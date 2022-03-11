/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { BASE_URL } from '../../utils';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Checkout → Can see redirect to empty Cart when Checkout is empty', () => {
	beforeAll( async () => {
		await shopper.block.emptyCart();
	} );

	it( 'Can see redirect to empty Cart', async () => {
		const slug = 'checkout';
		const url = BASE_URL + slug;
		await page.goto( url, {
			waitUntil: 'networkidle0',
		} );

		// Verify cart is empty'
		await expect( page ).toMatchElement( 'div.woocommerce-info', {
			text: 'Checkout is not available whilst your cart is empty.',
		} );
	} );
} );
