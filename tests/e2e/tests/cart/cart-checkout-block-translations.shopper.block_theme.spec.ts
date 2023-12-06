/**
 * External dependencies
 */
import { expect, test as base } from '@woocommerce/e2e-playwright-utils';
import { cli } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { REGULAR_PRICED_PRODUCT_NAME } from '../checkout/constants';
import { CheckoutPage } from '../checkout/checkout.page';

const test = base.extend< { checkoutPageObject: CheckoutPage } >( {
	checkoutPageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Shopper → Translations', () => {
	test.beforeAll( async () => {
		await cli(
			`npm run wp-env run tests-cli -- wp language core activate nl_NL`
		);
	} );

	test.afterAll( async () => {
		await cli(
			`npm run wp-env run tests-cli -- wp language core activate en_US`
		);
	} );

	test( 'User can view translated Cart block', async ( {
		frontendUtils,
		page,
	} ) => {
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( REGULAR_PRICED_PRODUCT_NAME );
		await frontendUtils.goToCart();

		await page.waitForSelector( '.wp-block-woocommerce-filled-cart-block' );

		const productHeader = page
			.locator( '.wc-block-cart-items .wc-block-cart-items__header span' )
			.first();
		await expect( productHeader ).toHaveText( 'Product' );

		const removeLink = page
			.locator( '.wc-block-cart-item__remove-link' )
			.first();
		await expect( removeLink ).toHaveText( 'Verwijder item' );

		const submitButton = page
			.locator( '.wc-block-cart__submit-button' )
			.first();
		await expect( submitButton ).toHaveText( 'Ga naar afrekenen' );

		const orderSummary = page.locator(
			'.wp-block-woocommerce-cart-order-summary-block'
		);
		await expect( orderSummary ).toHaveText( /Subtotaal/ );
		await expect( orderSummary ).toHaveText( /Een waardebon toevoegen/ );
		await expect( orderSummary ).toHaveText( /Totaal/ );
	} );

	test( 'User can view translated Checkout block', async ( {
		frontendUtils,
		page,
	} ) => {
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( REGULAR_PRICED_PRODUCT_NAME );
		await frontendUtils.goToCart();
		await frontendUtils.goToCheckout();

		const contactHeading = page.locator(
			'#contact-fields .wc-block-components-checkout-step__title'
		);
		await expect( contactHeading ).toHaveText( 'Contactgegevens' );

		const shippingHeading = page.locator(
			'#shipping-fields .wc-block-components-checkout-step__title'
		);
		await expect( shippingHeading ).toHaveText( 'Verzendadres' );

		const shippingOptionsHeading = page.locator(
			'#shipping-option .wc-block-components-checkout-step__title'
		);
		await expect( shippingOptionsHeading ).toHaveText( 'Verzendopties' );

		const paymentMethodHeading = page.locator(
			'#payment-method .wc-block-components-checkout-step__title'
		);
		await expect( paymentMethodHeading ).toHaveText( 'Betaalopties' );

		const returnToCart = page.locator(
			'.wc-block-components-checkout-return-to-cart-button'
		);
		await expect( returnToCart ).toHaveText( 'Ga terug naar winkelwagen' );

		const submitButton = page.locator(
			'.wc-block-components-checkout-place-order-button'
		);
		await expect( submitButton ).toHaveText( 'Plaats bestelling' );

		const orderSummary = page.locator(
			'.wp-block-woocommerce-checkout-order-summary-block'
		);
		await expect( orderSummary ).toHaveText( /Besteloverzicht/ );
		await expect( orderSummary ).toHaveText( /Subtotaal/ );
		await expect( orderSummary ).toHaveText( /Verzending/ );
		await expect( orderSummary ).toHaveText( /Totaal/ );
	} );
} );
