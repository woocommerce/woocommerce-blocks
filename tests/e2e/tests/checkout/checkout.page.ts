/**
 * External dependencies
 */
import { Page } from '@playwright/test';
import { expect } from '@woocommerce/e2e-playwright-utils';
import { BASE_URL } from '@woocommerce/e2e-utils';

export class CheckoutPage {
	private BLOCK_NAME = 'woocommerce/checkout';
	private page: Page;

	constructor( { page }: { page: Page } ) {
		this.page = page;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async checkThirdPartyLocalPickupMethodEnabled() {
		// Check that Woo Collection is enabled.
		await this.page.goto(
			`${ BASE_URL }?check_third_party_local_pickup_method`
		);
		await expect( this.page.getByText( 'Woo Collection' ) ).toBeVisible();
	}

	async goToCheckout() {
		await this.page.goto( '/checkout', {
			waitUntil: 'commit',
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
		await this.page.waitForSelector(
			'.wc-block-components-radio-control__label'
		);

		if (
			! ( await this.isShippingRateSelected(
				shippingName,
				shippingPrice
			) )
		) {
			const shipping = this.page.getByLabel( shippingName );
			await shipping.click();
			await this.page.waitForResponse( ( request ) => {
				const url = request.url();
				return url.includes( 'wc/store/v1/batch' );
			} );
		}
		return await this.isShippingRateSelected( shippingName, shippingPrice );
	}
}
