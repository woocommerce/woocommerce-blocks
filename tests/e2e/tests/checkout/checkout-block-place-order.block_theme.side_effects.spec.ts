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
	test( 'Guest user can place order', async ( {
		pageObject,
		frontendUtils,
		page,
	} ) => {
		// We want to logout if we are logged in.
		// eslint-disable-next-line playwright/no-conditional-in-test
		if ( await frontendUtils.isLoggedIn() ) {
			await frontendUtils.logout();
		}

		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect(
			page.getByText( 'Your order has been received.' )
		).toBeVisible();
	} );

	test( 'Logged in user can place an order', async ( {
		pageObject,
		frontendUtils,
		page,
	} ) => {
		await frontendUtils.login();
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect(
			page.getByText( 'Your order has been received.' )
		).toBeVisible();
	} );
} );
