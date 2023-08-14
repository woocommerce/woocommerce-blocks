/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { CheckoutPage } from './checkout.page';
import { SIMPLE_VIRTUAL_PRODUCT_NAME } from './constants';

const test = base.extend< { pageObject: CheckoutPage } >( {
	pageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Shopper → Checkout block → Place Order', () => {
	test.beforeEach( async ( { frontendUtils } ) => {
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
	} );

	test( 'Guest user can place order', async ( { pageObject, page } ) => {
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect(
			page.getByText( 'Your order has been received.' )
		).toBeVisible();
	} );

	test( 'Logged in user can place an order', async ( {
		pageObject,
		page,
	} ) => {
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect(
			page.getByText( 'Your order has been received.' )
		).toBeVisible();
	} );
} );
