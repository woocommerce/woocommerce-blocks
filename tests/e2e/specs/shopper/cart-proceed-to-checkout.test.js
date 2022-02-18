/**
 * External dependencies
 */
import { merchant } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import {
	getNormalPagePermalink,
	shopper,
	visitPostOfType,
} from '../../../utils';

const block = {
	name: 'Cart',
};

const simpleProductName = 'Woo Single #1';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Cart → Can proceed to checkout', () => {
	let productPermalink;

	beforeAll( async () => {
		// prevent CartCheckoutCompatibilityNotice from appearing
		await page.evaluate( () => {
			localStorage.setItem(
				'wc-blocks_dismissed_compatibility_notices',
				'["checkout"]'
			);
		} );
		await merchant.login();

		// Get product page permalink.
		await visitPostOfType( simpleProductName, 'product' );
		productPermalink = await getNormalPagePermalink();

		await merchant.logout();
	} );

	afterAll( async () => {
		// empty cart from shortcode page
		await shopper.goToCart();
		await shopper.removeFromCart( simpleProductName );
		await page.evaluate( () => {
			localStorage.removeItem(
				'wc-blocks_dismissed_compatibility_notices'
			);
		} );
	} );

	it( 'allows customer to proceed to checkout', async () => {
		await page.goto( productPermalink );
		await shopper.addToCart();
		await shopper.goToCartBlock();

		// Click on "Proceed to Checkout" button
		await Promise.all( [
			expect( page ).toClick( 'a.wc-block-cart__submit-button', {
				text: 'Proceed to Checkout',
			} ),
			page.waitForNavigation( { waitUntil: 'networkidle0' } ),
		] );

		// Verify that you see the Checkout Block page
		await expect( page ).toMatchElement( 'h1', { text: 'Checkout' } );
	} );
} );
