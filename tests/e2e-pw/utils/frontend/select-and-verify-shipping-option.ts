/**
 * External dependencies
 */
import { Page } from '@playwright/test';
import { expect } from '@woocommerce/e2e-playwright-utils';

export const selectAndVerifyShippingOption = async ( {
	shippingName,
	shippingPrice,
	page,
}: {
	shippingName: string;
	shippingPrice: string;
	page: Page;
} ) => {
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
