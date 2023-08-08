/**
 * External dependencies
 */
import { Page } from '@playwright/test';
import { expect } from '@woocommerce/e2e-playwright-utils';

export class CheckoutPage {
	private BLOCK_NAME = 'woocommerce/checkout';
	private page: Page;

	constructor( { page }: { page: Page } ) {
		this.page = page;
	}

	async goToCheckout() {
		await this.page.goto( '/checkout', {
			waitUntil: 'networkidle',
		} );
	}

	async isShippingRateSelected(
		shippingName: string,
		shippingPrice: string
	) {
		const shippingLine = this.page.locator(
			'.wc-block-components-totals-shipping'
		);

		const nameCount = await shippingLine.getByText( shippingName ).count();
		const priceCount = await shippingLine
			.getByText( shippingPrice )
			.count();
		return nameCount > 0 && priceCount > 0;
	}

	async selectAndVerifyShippingOption(
		shippingName: string,
		shippingPrice: string
	) {
		await this.page.waitForLoadState( 'networkidle' );
		await this.page.waitForSelector(
			'.wc-block-components-radio-control__label'
		);

		if (
			! ( await this.isShippingRateSelected(
				shippingName,
				shippingPrice
			) )
		) {
			const shipping = await this.page.getByLabel( shippingName );
			await shipping.click();
			await this.page.waitForResponse( ( request ) => {
				const url = request.url();
				return url.includes( 'wc/store/v1/batch' );
			} );
		}
		await expect(
			await this.isShippingRateSelected( shippingName, shippingPrice )
		).toBe( true );
	}
}
