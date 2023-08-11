/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { CheckoutPage } from './checkout.page';

const test = base.extend< { pageObject: CheckoutPage } >( {
	pageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Shopper → Checkout block → Shipping', () => {
	test.beforeEach( async ( { frontendUtils } ) => {
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( 'Beanie' );
	} );

	const FREE_SHIPPING_NAME = 'Free shipping';
	const FREE_SHIPPING_PRICE = '$0.00';
	const FLAT_RATE_SHIPPING_NAME = 'Flat rate shipping';
	const FLAT_RATE_SHIPPING_PRICE = '$10.00';

	test( 'Shopper can choose free shipping', async ( {
		pageObject,
		page,
	} ) => {
		await pageObject.goToCheckout();
		expect(
			await pageObject.selectAndVerifyShippingOption(
				FREE_SHIPPING_NAME,
				FREE_SHIPPING_PRICE
			)
		).toBe( true );
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect( page.getByText( FREE_SHIPPING_NAME ) ).toBeVisible();
	} );

	test( 'Shopper can choose flat rate shipping', async ( {
		pageObject,
		page,
	} ) => {
		await pageObject.goToCheckout();
		expect(
			await pageObject.selectAndVerifyShippingOption(
				FLAT_RATE_SHIPPING_NAME,
				FLAT_RATE_SHIPPING_PRICE
			)
		).toBe( true );
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect( page.getByText( FLAT_RATE_SHIPPING_NAME ) ).toBeVisible();
	} );
} );
