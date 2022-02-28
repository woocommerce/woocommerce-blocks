/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';

const block = {
	name: 'Mini Cart Block',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 3 ) {
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );
}

const expectToMatchStartShopping = async ( shouldMatch = true ) => {
	// We need longer timeout to ensure there is enough time
	// in the test env to dynamically load mini cart code.
	const config = {
		text: 'Start shopping',
		timeout: 5000,
	};

	if ( ! shouldMatch ) {
		return await expect( page ).not.toMatchElement(
			'.wc-block-mini-cart__drawer',
			config
		);
	}

	return await expect( page ).toMatchElement(
		'.wc-block-mini-cart__drawer',
		config
	);
};

const expectNotToMatchStartShopping = async () => {
	return await expectToMatchStartShopping( false );
};

describe( 'Shopper → Mini Cart', () => {
	beforeEach( async () => {
		await shopper.goToBlockPage( block.name );
	} );

	describe( 'Icon', () => {
		it( 'Shopper can see the Mini Cart icon and it badge on the front end', async () => {
			await expect( page ).toMatchElement( '.wc-block-mini-cart' );
			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__button'
			);
			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__quantity-badge'
			);

			// Make sure the initial quantity is 0.
			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__amount',
				{
					text: '$0',
				}
			);
			await expect( page ).toMatchElement( '.wc-block-mini-cart__badge', {
				text: '0',
			} );
		} );
	} );

	describe( 'Drawer', () => {
		it( 'The drawer opens when shopper clicks on the mini cart icon', async () => {
			await page.click( '.wc-block-mini-cart__button' );

			await expectToMatchStartShopping();
		} );

		it( 'The drawer closes when shopper clicks on the drawer close button', async () => {
			await page.click( '.wc-block-mini-cart__button' );

			await expectToMatchStartShopping();

			await page.click(
				'.wc-block-mini-cart__drawer .components-modal__header button'
			);

			await expectNotToMatchStartShopping();
		} );

		it( 'The drawer closes when shopper clicks outside the drawer', async () => {
			await page.click( '.wc-block-mini-cart__button' );

			await expectToMatchStartShopping();

			await page.mouse.click( 50, 200 );

			await expectNotToMatchStartShopping();
		} );
	} );
} );
