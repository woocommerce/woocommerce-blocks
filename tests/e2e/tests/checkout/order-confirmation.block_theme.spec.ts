/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import {
	FREE_SHIPPING_NAME,
	FREE_SHIPPING_PRICE,
	SIMPLE_PHYSICAL_PRODUCT_NAME,
} from './constants';
import { CheckoutPage } from './checkout.page';

const test = base.extend< { pageObject: CheckoutPage } >( {
	pageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Shopper → Order Confirmation', () => {
	test.use( {
		storageState: process.env.CUSTOMERSTATE,
	} );

	test.beforeAll( async ( { pageObject, frontendUtils } ) => {
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
	} );
} );
