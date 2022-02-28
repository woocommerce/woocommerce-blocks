/**
 * External dependencies
 */
import { shopper as wcShopper } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { getBlockPageEditLink } from './visit-block-page';
import { SHOP_CART_BLOCK_PAGE, SHOP_CHECKOUT_BLOCK_PAGE } from './constants';

export const shopper = {
	...wcShopper,

	goToCheckoutBlock: async () => {
		await page.goto( SHOP_CHECKOUT_BLOCK_PAGE, {
			waitUntil: 'networkidle0',
		} );
	},

	goToCartBlock: async () => {
		await page.goto( SHOP_CART_BLOCK_PAGE, {
			waitUntil: 'networkidle0',
		} );
	},

	productIsInCheckoutBlock: async ( productTitle, quantity, total ) => {
		// Make sure Order summary is expanded
		const [ button ] = await page.$x(
			`//button[contains(@aria-expanded, 'false')]//span[contains(text(), 'Order summary')]`
		);
		if ( button ) {
			await button.click();
		}
		await expect( page ).toMatchElement( 'span', {
			text: productTitle,
		} );
		await expect( page ).toMatchElement(
			'div.wc-block-components-order-summary-item__quantity',
			{
				text: quantity,
			}
		);
		await expect( page ).toMatchElement(
			'span.wc-block-components-product-price__value',
			{
				text: total,
			}
		);
	},

	/**
	 * Find a page with the given title then navigate to it.
	 *
	 * @param {string} title Page title
	 */
	goToBlockPage: async ( title ) => {
		const editLink = await getBlockPageEditLink( title );

		if ( editLink ) {
			const url = new URL( editLink );

			await page.goto(
				`${ url.origin }/?p=${ url.searchParams.get( 'post' ) }`,
				{
					waitUntil: 'networkidle0',
				}
			);

			// eslint-disable-next-line jest/no-standalone-expect
			await expect( page ).toMatchElement( 'h1', { text: title } );
		} else {
			throw new Error( `Could not find block page: ${ title }` );
		}
	},
};
