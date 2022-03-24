/**
 * External dependencies
 */
import { MY_ACCOUNT_ACCOUNT_DETAILS } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { SIMPLE_PRODUCT_NAME } from '../../../utils/constants';

const block = {
	name: 'Checkout',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Checkout → Can see warnings when form is incomplete', () => {
	beforeAll( async () => {
		const isShopperLoggedIn = await shopper.block.isLoggedIn();

		// @todo Find a better way to reset the checkout form instead of login then logout
		if ( isShopperLoggedIn ) await shopper.logout();
		else {
			await shopper.login();
			await shopper.logout();
		}
	} );

	beforeEach( async () => {
		await shopper.block.emptyCart();
	} );

	afterAll( async () => {
		await shopper.block.emptyCart();
	} );

	it( 'Shows warnings when form is incomplete', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCheckout();

		// Click on "Place Order" button
		await expect( page ).toClick(
			'.wc-block-components-checkout-place-order-button',
			{
				text: 'Place Order',
			}
		);

		// Verify that all required fields show the correct warning.
		await expect( page ).toMatchElement(
			'#email ~ .wc-block-components-validation-error p',
			{
				text: 'Please fill out this field.',
			}
		);
		await expect( page ).toMatchElement(
			'#billing-first_name ~ .wc-block-components-validation-error p',
			{
				text: 'Please fill out this field.',
			}
		);
		await expect( page ).toMatchElement(
			'#billing-last_name ~ .wc-block-components-validation-error p',
			{
				text: 'Please fill out this field.',
			}
		);
		await expect( page ).toMatchElement(
			'#billing-address_1 ~ .wc-block-components-validation-error p',
			{
				text: 'Please fill out this field.',
			}
		);
		await expect( page ).toMatchElement(
			'#billing-city ~ .wc-block-components-validation-error p',
			{
				text: 'Please fill out this field.',
			}
		);
		await expect( page ).toMatchElement(
			'#billing-postcode ~ .wc-block-components-validation-error p',
			{
				text: 'Please fill out this field.',
			}
		);
	} );
} );
