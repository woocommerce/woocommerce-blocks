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
		await expect(
			page
		).toMatchElement(
			'div.wc-block-components-order-summary-item__quantity',
			{ text: quantity }
		);
		await expect( page ).toMatchElement(
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

	block: {
		goToCart: async () => {
			await page.goto( SHOP_CART_BLOCK_PAGE, {
				waitUntil: 'networkidle0',
			} );
		},

		goToCheckout: async () => {
			await page.goto( SHOP_CHECKOUT_BLOCK_PAGE, {
				waitUntil: 'networkidle0',
			} );
		},

		/**
		 * For some reason "wcShopper.emptyCart" sometimes result in an error, but using the same
		 * implementation here fixes the problem.
		 */
		emptyCart: async () => {
			await page.goto( SHOP_CART_PAGE, {
				waitUntil: 'networkidle0',
			} );

			// Remove products if they exist
			if ( ( await page.$( '.remove' ) ) !== null ) {
				let products = await page.$$( '.remove' );
				while ( products && products.length > 0 ) {
					await page.click( '.remove' );
					await uiUnblocked();
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

		placeOrder: async () => {
			await Promise.all( [
				expect( page ).toClick(
					'.wc-block-components-checkout-place-order-button',
					{
						text: 'Place Order',
					}
				),
				page.waitForNavigation( { waitUntil: 'networkidle0' } ),
			] );
		},

		/* We need to overwrite this function from wcShopper because clicking through to the
		product doesn't work. There is a fix in https://github.com/woocommerce/woocommerce/pull/31915
		We can delete this function once the PR is merged
		*/
		searchForProduct: async ( productname ) => {
			const searchFieldSelector = '.wp-block-search__input';
			await expect( page ).toMatchElement( searchFieldSelector );
			// await page.waitForSelector( searchFieldSelector, { timeout: 5000 } );
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
			await expect( page ).toMatchElement(
				'h1.entry-title',
				productname
			);
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
			await expect( page ).toMatchElement(
				'.wc-block-components-chip__text',
				{
					text: couponCode,
				}
			);
		},

		fillInCheckoutWithTestData: async () => {
			const shippingOrBilling = ( await page.$( '#shipping-first_name' ) )
				? 'shipping'
				: 'billing';
			const testData = {
				first_name: 'John',
				last_name: 'Doe',
				shipping_address_1: '123 Easy Street',
				country: 'United States (US)',
				city: 'New York',
				state: 'New York',
				postcode: '90210',
			};
			await shopper.block.fillInCheckoutAddress(
				testData,
				shippingOrBilling
			);
		},

		fillInCheckoutAddress: async (
			address,
			shippingOrBilling = 'shipping'
		) => {
			await expect( page ).toFill(
				`#${ shippingOrBilling }-first_name`,
				address.first_name
			);
			await expect( page ).toFill(
				`#${ shippingOrBilling }-first_name`,
				address.first_name
			);
			await expect( page ).toFill(
				`#${ shippingOrBilling }-last_name`,
				address.last_name
			);
			await expect( page ).toFill(
				`#${ shippingOrBilling }-address_1`,
				address.shipping_address_1
			);
			await expect( page ).toFill(
				`#${ shippingOrBilling }-country input`,
				address.country
			);
			await expect( page ).toFill(
				`#${ shippingOrBilling }-city`,
				address.city
			);
			await expect( page ).toFill(
				`#${ shippingOrBilling }-state input`,
				address.state
			);
			await expect( page ).toFill(
				`#${ shippingOrBilling }-postcode`,
				address.postcode
			);
		},
    
    fillBillingDetails: async ( customerBillingDetails ) => {
			await expect( page ).toFill(
				'#billing-first_name',
				customerBillingDetails.firstname
			);
			await expect( page ).toFill(
				'#billing-last_name',
				customerBillingDetails.lastname
			);
			await expect( page ).toFill(
				'#components-form-token-input-0',
				customerBillingDetails.country
			);
			await expect( page ).toFill(
				'#billing-address_1',
				customerBillingDetails.addressfirstline
			);
			await expect( page ).toFill(
				'#billing-address_2',
				customerBillingDetails.addresssecondline
			);
			await expect( page ).toFill(
				'#billing-city',
				customerBillingDetails.city
			);
			await expect( page ).toFill(
				'#components-form-token-input-2',
				customerBillingDetails.state
			);
			await expect( page ).toFill(
				'#billing-postcode',
				customerBillingDetails.postcode
			);
			await expect( page ).toFill(
				'#phone',
				customerBillingDetails.phone
			);
			await expect( page ).toFill(
				'#email',
				customerBillingDetails.email
			);
		},
	},
};