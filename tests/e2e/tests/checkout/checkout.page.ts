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

	async placeOrder() {
		await this.page.getByText( 'Place Order', { exact: true } ).click();
		await this.page.waitForURL( /order-received/ );
	}

	async fillBillingDetails( customerBillingDetails ) {
		const billingForm = this.page.getByRole( 'group', {
			name: 'Billing address',
		} );
		const companyInputField = billingForm.getByLabel( 'Company' );

		if ( await companyInputField.isVisible() ) {
			await companyInputField.fill( customerBillingDetails.company );
		}

		const email = billingForm.getByLabel( 'Email address' );
		const firstName = billingForm.getByLabel( 'First name' );
		const lastName = billingForm.getByLabel( 'Last name' );
		const country = billingForm.getByLabel( 'Country/Region' );
		const address1 = billingForm.getByLabel( 'Address', { exact: true } );
		const address2 = billingForm.getByLabel( 'Apartment, suite, etc.' );
		const city = billingForm.getByLabel( 'City' );
		const state = billingForm.getByLabel( 'State', { exact: true } );
		const phone = billingForm.getByLabel( 'Phone' );

		// Using locator here since the label of this form changes depending on the country.
		const postcode = billingForm.locator( '[autocomplete="postal-code"]' );

		await email.fill( customerBillingDetails.email );
		await firstName.fill( customerBillingDetails.firstname );
		await lastName.fill( customerBillingDetails.lastname );
		await country.fill( customerBillingDetails.country );
		await address1.fill( customerBillingDetails.addressfirstline );
		await address2.fill( customerBillingDetails.addresssecondline );
		await city.fill( customerBillingDetails.city );
		await phone.fill( customerBillingDetails.phone );

		if ( await state.isVisible() ) {
			await state.fill( customerBillingDetails.state );
		}
		if ( await postcode.isVisible() ) {
			await postcode.fill( customerBillingDetails.postcode );
		}
		// Blur active field to trigger customer address update, then wait for requests to finish.
		await this.page.evaluate( 'document.activeElement.blur()' );
		await this.checkCustomerPushCompleted(
			'billing',
			customerBillingDetails
		);
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
