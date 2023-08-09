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

	async fillInCheckoutWithTestData( overrideData = {} ) {
		const isShippingOpen = await this.page
			.getByRole( 'group', {
				name: 'Shipping address',
			} )
			.isVisible();

		const isBillingOpen = await this.page
			.getByRole( 'group', {
				name: 'Billing address',
			} )
			.isVisible();

		const testData = {
			...{
				firstname: 'John',
				lastname: 'Doe',
				addressfirstline: '123 Easy Street',
				addresssecondline: 'Testville',
				country: 'United States (US)',
				city: 'New York',
				state: 'New York',
				postcode: '90210',
				email: 'john.doe@test.com',
				phone: '01234567890',
			},
			...overrideData,
		};
		await this.page.getByLabel( 'Email address' ).fill( testData.email );
		if ( isShippingOpen ) {
			await this.fillShippingDetails( testData );
		}
		if ( isBillingOpen ) {
			await this.fillBillingDetails( testData );
		}
		// Blur active field to trigger shipping rates update, then wait for requests to finish.
		await this.page.evaluate( 'document.activeElement.blur()' );
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

	async fillShippingDetails( customerShippingDetails ) {
		const shippingForm = this.page.getByRole( 'group', {
			name: 'Shipping address',
		} );
		const companyInputField = shippingForm.getByLabel( 'Company' );

		if ( await companyInputField.isVisible() ) {
			await companyInputField.fill( customerShippingDetails.company );
		}

		const firstName = shippingForm.getByLabel( 'First name' );
		const lastName = shippingForm.getByLabel( 'Last name' );
		const country = shippingForm.getByLabel( 'Country/Region' );
		const address1 = shippingForm.getByLabel( 'Address', { exact: true } );
		const address2 = shippingForm.getByLabel( 'Apartment, suite, etc.' );
		const city = shippingForm.getByLabel( 'City' );
		const state = shippingForm.getByLabel( 'State', { exact: true } );
		const phone = shippingForm.getByLabel( 'Phone' );

		// Using locator here since the label of this form changes depending on the country.
		const postcode = shippingForm.locator( '[autocomplete="postal-code"]' );

		await firstName.fill( customerShippingDetails.firstname );
		await lastName.fill( customerShippingDetails.lastname );
		await country.fill( customerShippingDetails.country );
		await address1.fill( customerShippingDetails.addressfirstline );
		await address2.fill( customerShippingDetails.addresssecondline );
		await city.fill( customerShippingDetails.city );
		await phone.fill( customerShippingDetails.phone );

		if ( await state.isVisible() ) {
			await state.fill( customerShippingDetails.state );
		}
		if ( await postcode.isVisible() ) {
			await postcode.fill( customerShippingDetails.postcode );
		}
		// Blur active field to trigger customer address update, then wait for requests to finish.
		await this.page.evaluate( 'document.activeElement.blur()' );
		await this.checkCustomerPushCompleted(
			'shipping',
			customerShippingDetails
		);
	}

	async checkCustomerPushCompleted(
		shippingOrBilling: 'shipping' | 'billing',
		addressToCheck
	) {
		// Blur active field to trigger customer information update, then wait for requests to finish.
		await this.page.evaluate( 'document.activeElement.blur()' );

		await this.page.waitForResponse( async ( response ) => {
			const isBatch = response
				.url()
				.includes( '/wp-json/wc/store/v1/batch' );
			const responseJson = await response.text();
			const parsedResponse = JSON.parse( responseJson );
			if ( ! Array.isArray( parsedResponse?.responses ) || ! isBatch ) {
				return false;
			}

			const keyToCheck =
				shippingOrBilling === 'shipping'
					? 'shipping_address'
					: 'billing_address';

			return parsedResponse.responses.some( ( singleResponse ) => {
				const firstname =
					singleResponse.body[ keyToCheck ].first_name ===
					addressToCheck.firstname;
				const lastname =
					singleResponse.body[ keyToCheck ].last_name ===
					addressToCheck.lastname;
				const address1 =
					singleResponse.body[ keyToCheck ].address_1 ===
					addressToCheck.addressfirstline;
				const address2 =
					singleResponse.body[ keyToCheck ].address_2 ===
					addressToCheck.addresssecondline;
				const postcode =
					singleResponse.body[ keyToCheck ].postcode ===
					addressToCheck.postcode;
				const city =
					singleResponse.body[ keyToCheck ].city ===
					addressToCheck.city;
				const phone =
					singleResponse.body[ keyToCheck ].phone ===
					addressToCheck.phone;
				const email =
					shippingOrBilling === 'billing'
						? singleResponse.body[ keyToCheck ].email ===
						  addressToCheck.email
						: true;

				// Note, we skip checking State and Country here because the value returned by the server is not the same as
				// what gets input into the form. The server returns the code, but the form accepts the full name.
				return (
					firstname &&
					lastname &&
					address1 &&
					address2 &&
					postcode &&
					city &&
					phone &&
					email
				);
			} );
		} );
	}

	async selectAndVerifyShippingOption(
		shippingName: string,
		shippingPrice: string
	) {
		const shipping = this.page.getByLabel( shippingName );
		await expect( shipping ).toBeVisible();
		if (
			! ( await this.isShippingRateSelected(
				shippingName,
				shippingPrice
			) )
		) {
			await shipping.click();
			await this.page.waitForResponse( ( request ) => {
				const url = request.url();
				return url.includes( 'wc/store/v1/batch' );
			} );
		}
		return await this.isShippingRateSelected( shippingName, shippingPrice );
	}
}
