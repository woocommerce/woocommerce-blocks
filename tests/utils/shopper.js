/**
 * External dependencies
 */
import { shopper as wcShopper } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { getBlockPagePermalink } from './get-block-page-permalink';

export const shopper = {
	...wcShopper,

	goToCartBlock: async () => {
		const checkoutBlockPermalink = await getBlockPagePermalink(
			`Cart Block`
		);

		await page.goto( checkoutBlockPermalink, {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1', { text: 'Cart' } );
	},

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

	/* We need to overwrite this function from wcShopper because clicking through to the
		product doesn't work. There is a fix in https://github.com/woocommerce/woocommerce/pull/31915
		We can delete this function once the PR is merged
		*/
	searchForProduct: async ( productname ) => {
		const searchFieldSelector = 'input.wp-block-search__input';
		await page.waitForSelector( searchFieldSelector, {
			timeout: 100000,
		} );
		await expect( page ).toFill( searchFieldSelector, productname );
		await expect( page ).toClick( '.wp-block-search__button' );
		// Single search results may go directly to product page
		if ( await page.waitForSelector( 'h2.entry-title' ) ) {
			await expect( page ).toMatchElement( 'h2.entry-title', {
				text: productname,
			} );
			await expect( page ).toClick( 'h2.entry-title > a', {
				text: productname,
			} );
		}
		await page.waitForSelector( 'h1.entry-title' );
		await expect( page.title() ).resolves.toMatch( productname );
		await expect( page ).toMatchElement( 'h1.entry-title', productname );
	},

	// The wcShopper.emptyCart is broken. This one works with the Cart block for extra snaz
	emptyCart: async () => {
		await shopper.goToCartBlock();

		// Remove coupons
		let couponRemoveLinks = await page.$$(
			'.wc-block-components-chip__remove'
		);
		while ( couponRemoveLinks.length > 0 ) {
			await couponRemoveLinks[ 0 ].click();
			couponRemoveLinks = await page.$$(
				'.wc-block-cart-item__remove-link'
			);
		}

		// Remove products if they exist
		let productRemoveLinks = await page.$$(
			'.wc-block-cart-item__remove-link'
		);
		while ( productRemoveLinks.length > 0 ) {
			await productRemoveLinks[ 0 ].click();
			productRemoveLinks = await page.$$(
				'.wc-block-cart-item__remove-link'
			);
		}
		await page.waitForSelector( '.wp-block-woocommerce-empty-cart-block' );
	},

	addCoupon: async ( couponCode ) => {
		const title = await page.title();
		if ( ! title.includes( 'Cart Block' ) ) {
			await shopper.goToCartBlock();
		}
		// Make sure the coupon panel is open
		const applyButton = await page.$(
			'.wc-block-components-totals-coupon__button'
		);
		if ( ! applyButton ) {
			await page.click( '.wc-block-components-panel__button' );
		}
		await page.type(
			'.wc-block-components-totals-coupon__input input',
			couponCode
		);
		await page.click( '.wc-block-components-totals-coupon__button' );
		await page.waitForSelector( '.wc-block-components-chip__text', {
			text: couponCode,
		} );
	},
};
