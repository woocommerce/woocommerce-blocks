/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';
import { BASE_URL, FrontendUtils } from '@woocommerce/e2e-utils';
import { Page } from '@playwright/test';

const selectAndVerifyShippingOption = async (
	shippingName: string,
	shippingPrice: string,
	page: Page
) => {
	const isShippingRateSelected = async () => {
		const shippingLine = page.locator(
			'.wc-block-components-totals-shipping'
		);

		const nameCount = await shippingLine.getByText( shippingName ).count();
		const priceCount = await shippingLine
			.getByText( shippingPrice )
			.count();
		return nameCount > 0 && priceCount > 0;
	};

	await page.waitForLoadState( 'networkidle' );
	await page.waitForSelector( '.wc-block-components-radio-control__label' );

	if ( ! ( await isShippingRateSelected() ) ) {
		const shipping = await page.getByLabel( shippingName );
		await shipping.click();
		await page.waitForResponse( ( request ) => {
			const url = request.url();
			return url.includes( 'wc/store/v1/batch' );
		} );
	}
	await expect( await isShippingRateSelected() ).toBe( true );
};

test.describe( 'Shopper → Checkout block', () => {
	test.beforeAll( async ( { browser } ) => {
		const page = await browser.newPage();
		// Check that Woo Collection is enabled.
		await page.goto(
			`${ BASE_URL }?check_third_party_local_pickup_method`
		);
		await expect( page.getByText( 'Woo Collection' ) ).toBeVisible();
		const frontendUtils = new FrontendUtils( page );
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( 'Beanie' );
		await page.close();
	} );

	test.describe( 'Shipping', () => {
		test( 'Shopper can switch between free shipping and flat rate shipping', async ( {
			page,
		} ) => {
			await page.goto( '/checkout', {
				waitUntil: 'networkidle',
			} );
			const FREE_SHIPPING_NAME = 'Free shipping';
			const FREE_SHIPPING_PRICE = '$0.00';
			const FLAT_RATE_SHIPPING_NAME = 'Flat rate shipping';
			const FLAT_RATE_SHIPPING_PRICE = '$10.00';

			await selectAndVerifyShippingOption(
				FREE_SHIPPING_NAME,
				FREE_SHIPPING_PRICE,
				page
			);
			await selectAndVerifyShippingOption(
				FLAT_RATE_SHIPPING_NAME,
				FLAT_RATE_SHIPPING_PRICE,
				page
			);
		} );
	} );
} );
