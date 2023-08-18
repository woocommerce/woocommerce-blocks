/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';
import { customerFile, guestFile } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { CheckoutPage } from './checkout.page';
import {
	SIMPLE_PHYSICAL_PRODUCT_NAME,
	FREE_SHIPPING_NAME,
	FREE_SHIPPING_PRICE,
} from './constants';

const test = base.extend< { pageObject: CheckoutPage } >( {
	pageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Shopper → Checkout block → Place Order → Guest', () => {
	test.use( { storageState: guestFile } );

	test( 'Guest user can place order', async ( {
		pageObject,
		frontendUtils,
		page,
	} ) => {
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_PHYSICAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await expect(
			await pageObject.selectAndVerifyShippingOption(
				FREE_SHIPPING_NAME,
				FREE_SHIPPING_PRICE
			)
		).toBe( true );
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect(
			page.getByText( 'Your order has been received.' )
		).toBeVisible();
	} );
} );

test.describe( 'Shopper → Checkout block → Place Order → Customer', () => {
	test.use( { storageState: customerFile } );

	test( 'Logged in user can place an order', async ( {
		pageObject,
		frontendUtils,
		page,
	} ) => {
		// await frontendUtils.login();
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_PHYSICAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await expect(
			await pageObject.selectAndVerifyShippingOption(
				FREE_SHIPPING_NAME,
				FREE_SHIPPING_PRICE
			)
		).toBe( true );
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect(
			page.getByText( 'Your order has been received.' )
		).toBeVisible();
	} );
} );
