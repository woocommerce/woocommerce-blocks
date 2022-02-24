/**
 * External dependencies
 */
import {
	shopper as wcShopper,
	uiUnblocked,
	SHOP_CART_PAGE,
} from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { getBlockPagePermalink } from './get-block-page-permalink';

export const shopper = {
	...wcShopper,

	goToCheckoutBlock: async () => {
		const checkoutBlockPermalink = await getBlockPagePermalink(
			`Checkout Block`
		);

		await page.goto( checkoutBlockPermalink, {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1', { text: 'Checkout' } );
	},

	productIsInCheckoutBlock: async ( productTitle, quantity, total ) => {
		// Make sure Order summary is expanded
		const [ button ] = await page.$x(
			`//button[contains(@aria-expanded, 'false')]//span[contains(text(), 'Order summary')]`
		);
		if ( button ) {
			await button.click();
		}
		await page.waitForSelector( 'span', {
			text: productTitle,
		} );
		await page.waitForSelector(
			'div.wc-block-components-order-summary-item__quantity',
			{
				text: quantity,
			}
		);
		await page.waitForSelector(
			'span.wc-block-components-product-price__value',
			{
				text: total,
			}
		);
	},

	goToBlockPage: async ( title ) => {
		await page.goto( await getBlockPagePermalink( title ), {
			waitUntil: 'networkidle0',
		} );

		await expect( page ).toMatchElement( 'h1', { text: title } );
	},

	/**
	 * Override the @woocommerce/e2e-utils `emptyCart` method to fix the
	 * ReferenceError issue and remove the cart items.
	 *
	 * @todo Remove shopper.emptyCart overload once the upstream  is fixed
	 */
	emptyCart: async () => {
		await page.goto( SHOP_CART_PAGE, {
			waitUntil: 'networkidle0',
		} );

		// Remove products if they exist
		if ( ( await page.$( '.remove' ) ) !== null ) {
			let products = await page.$$( '.remove' );
			while ( products && products.length > 0 ) {
				products.forEach( async ( product ) => {
					await page.evaluate( ( el ) => {
						return el.click();
					}, product );
					await uiUnblocked();
				} );
				products = await page.$$( '.remove' );
			}
		}

		// Remove coupons if they exist
		if ( ( await page.$( '.woocommerce-remove-coupon' ) ) !== null ) {
			await page.click( '.woocommerce-remove-coupon' );
			await uiUnblocked();
		}

		await page.waitForSelector( '.woocommerce-info' );
		// eslint-disable-next-line jest/no-standalone-expect
		await expect( page ).toMatchElement( '.woocommerce-info', {
			text: 'Your cart is currently empty.',
		} );
	},
};
