/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';
import { FrontendUtils } from '@woocommerce/e2e-utils';

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
	test.beforeAll( async ( { browser } ) => {
		const page = await browser.newPage();
		const frontendUtils = new FrontendUtils( page );
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( 'Beanie' );
		await page.close();
	} );

	test( 'Shopper can switch between free shipping and flat rate shipping', async ( {
		pageObject,
	} ) => {
		await pageObject.goToCheckout();

		const FREE_SHIPPING_NAME = 'Free shipping';
		const FREE_SHIPPING_PRICE = '$0.00';
		const FLAT_RATE_SHIPPING_NAME = 'Flat rate shipping';
		const FLAT_RATE_SHIPPING_PRICE = '$10.00';

		expect(
			await pageObject.selectAndVerifyShippingOption(
				FREE_SHIPPING_NAME,
				FREE_SHIPPING_PRICE
			)
		).toBe( true );
		expect(
			await pageObject.selectAndVerifyShippingOption(
				FLAT_RATE_SHIPPING_NAME,
				FLAT_RATE_SHIPPING_PRICE
			)
		).toBe( true );
	} );
} );
