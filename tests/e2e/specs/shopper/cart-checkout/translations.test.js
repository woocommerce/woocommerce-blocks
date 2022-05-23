/* eslint-disable jest/expect-expect */
/**
 * Internal dependencies
 */
import { merchant, shopper } from '../../../../utils';
import { Translations } from '../../../fixtures/fixture-data';
import { getTestTranslation } from '../../../../utils/get-test-translation';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// Skips all the tests if it's a WooCommerce Core process environment.
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'Skipping Cart & Checkout tests', () => {} );
}

describe( 'Shopper → Cart & Checkout → Translations', () => {
	beforeAll( async () => {
		await merchant.changeLanguage( Translations().locale );
	} );

	afterAll( async () => {
		// default value empty in the select menu for English (United States)
		await merchant.changeLanguage( 'en_EN' );
	} );

	it( 'User can view translated Cart block', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( '128GB USB Stick' );
		await shopper.block.goToCart();

		await page.waitForSelector( '.wp-block-woocommerce-filled-cart-block' );

		const productHeader = await page.waitForSelector(
			'.wc-block-cart-items .wc-block-cart-items__header span'
		);
		await expect( productHeader ).toMatch(
			getTestTranslation( 'Product' )
		);

		const removeLink = await page.waitForSelector(
			'.wc-block-cart-item__remove-link'
		);
		await expect( removeLink ).toMatch(
			getTestTranslation( 'Remove item' )
		);

		const submitButton = await page.waitForSelector(
			'.wc-block-cart__submit-button'
		);
		await expect( submitButton ).toMatch(
			getTestTranslation( 'Proceed to Checkout' )
		);

		const orderSummary = await page.$(
			'.wp-block-woocommerce-cart-order-summary-block'
		);

		await expect( orderSummary ).toMatch(
			getTestTranslation( 'Subtotal' )
		);
		await expect( orderSummary ).toMatch(
			getTestTranslation( 'Coupon code' )
		);
		await expect( orderSummary ).toMatch( getTestTranslation( 'Total' ) );
	} );

	it( 'User can view translated Checkout block', async () => {
		await shopper.block.goToCheckout();

		const contactHeading = await page.$(
			'#contact-fields .wc-block-components-checkout-step__title'
		);
		await expect( contactHeading ).toMatch(
			getTestTranslation( 'Contact information' )
		);

		const shippingHeading = await page.$(
			'#shipping-fields .wc-block-components-checkout-step__title'
		);
		await expect( shippingHeading ).toMatch(
			getTestTranslation( 'Shipping address' )
		);

		const shippingOptionsHeading = await page.$(
			'#shipping-option .wc-block-components-checkout-step__title'
		);
		await expect( shippingOptionsHeading ).toMatch(
			getTestTranslation( 'Shipping options' )
		);

		const paymentMethodHeading = await page.$(
			'#payment-method .wc-block-components-checkout-step__title'
		);
		await expect( paymentMethodHeading ).toMatch(
			getTestTranslation( 'Payment options' )
		);

		const returnToCart = await page.$(
			'.wc-block-components-checkout-return-to-cart-button'
		);
		await expect( returnToCart ).toMatch(
			getTestTranslation( 'Return to Cart' )
		);

		const submitButton = await page.$(
			'.wc-block-components-checkout-place-order-button'
		);
		await expect( submitButton ).toMatch(
			getTestTranslation( 'Place Order' )
		);

		const orderSummary = await page.$(
			'.wp-block-woocommerce-checkout-order-summary-block'
		);
		await expect( orderSummary ).toMatch(
			getTestTranslation( 'Order summary' )
		);
		await expect( orderSummary ).toMatch(
			getTestTranslation( 'Subtotal' )
		);
		await expect( orderSummary ).toMatch(
			getTestTranslation( 'Coupon code' )
		);
		await expect( orderSummary ).toMatch(
			getTestTranslation( 'Shipping' )
		);
		await expect( orderSummary ).toMatch( getTestTranslation( 'Total' ) );
	} );
} );
