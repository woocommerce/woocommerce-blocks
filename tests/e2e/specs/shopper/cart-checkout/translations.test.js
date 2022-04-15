/**
 * Internal dependencies
 */
import { cli, merchant, shopper } from '../../../../utils';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'Skipping Cart & Checkout tests', () => {} );
}

describe( 'Shopper → Cart & Checkout → Translations', () => {
	// We need to install the language files for the blocks plugin.
	// We also need to install the plugin from w.org via the cli. This is because
	// on w.org, the slug is `woo-gutenberg-products-block` where as here it's
	// `woocommerce-gutenberg-products-block`. If we try to install the language files
	// directly, it won't find them because of the slug mismatch.
	beforeAll( async () => {
		await merchant.changeLanguage( 'nl_NL' );
	} );

	// We need to clean up here by changing the language back to English
	// and uninstalling the w.org version of Woo Blocks plugin and the language files
	afterAll( async () => {
		await merchant.changeLanguage( 'en_EN' );
	} );

	it( 'User can view translated Cart block ', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( '128GB USB Stick' );
		await shopper.block.goToCart();

		await page.waitForSelector( '.wp-block-woocommerce-filled-cart-block' );

		const productHeader = await page.waitForSelector(
			'.wc-block-cart-items .wc-block-cart-items__header span'
		);
		await expect( productHeader ).toMatch( 'Product' );

		const removeLink = await page.waitForSelector(
			'.wc-block-cart-item__remove-link'
		);
		await expect( removeLink ).toMatch( 'Artikel verwijderen' );

		const submitButton = await page.waitForSelector(
			'.wc-block-cart__submit-button'
		);
		await expect( submitButton ).toMatch( 'Doorgaan naar afrekenen' );

		const orderSummary = await page.$(
			'.wp-block-woocommerce-cart-order-summary-block'
		);

		await expect( orderSummary ).toMatch( 'Subtotaal' );
		await expect( orderSummary ).toMatch( 'Waardebon code' );
		await expect( orderSummary ).toMatch( 'Totaal' );
	} );

	it( 'USer can view translated Checkout block', async () => {
		await shopper.block.goToCheckout();

		const contactHeading = await page.$(
			'#contact-fields .wc-block-components-checkout-step__title'
		);
		await expect( contactHeading ).toMatch( 'Contactgegevens' );

		const shippingHeading = await page.$(
			'#shipping-fields .wc-block-components-checkout-step__title'
		);
		await expect( shippingHeading ).toMatch( 'Verzendadres' );

		const shippingOptionsHeading = await page.$(
			'#shipping-option .wc-block-components-checkout-step__title'
		);
		await expect( shippingOptionsHeading ).toMatch( 'Verzendopties' );

		const paymentMethodHeading = await page.$(
			'#payment-method .wc-block-components-checkout-step__title'
		);
		await expect( paymentMethodHeading ).toMatch( 'Betaalopties' );

		const returnToCart = await page.$(
			'.wc-block-components-checkout-return-to-cart-button'
		);
		await expect( returnToCart ).toMatch( 'Ga terug naar winkelwagen' );

		const submitButton = await page.$(
			'.wc-block-components-checkout-place-order-button'
		);
		await expect( submitButton ).toMatch( 'Plaats bestelling' );

		const orderSummary = await page.$(
			'.wp-block-woocommerce-checkout-order-summary-block'
		);
		await expect( orderSummary ).toMatch( 'Besteloverzicht' );
		await expect( orderSummary ).toMatch( 'Subtotaal' );
		await expect( orderSummary ).toMatch( 'Waardebon code' );
		await expect( orderSummary ).toMatch( 'Verzendmethoden' );
		await expect( orderSummary ).toMatch( 'Totaal' );
	} );
} );
