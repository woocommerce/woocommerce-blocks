/**
 * External dependencies
 */
import { expect, test as base } from '@woocommerce/e2e-playwright-utils';

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

test.describe( 'Shopper → Account', () => {
	test.use( {
		storageState: {
			origins: [],
			cookies: [],
		},
	} );
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.rest( {
			method: 'PUT',
			path: 'wc/v3/settings/account/woocommerce_enable_guest_checkout',
			data: { value: 'yes' },
		} );
		await requestUtils.rest( {
			method: 'PUT',
			path: 'wc/v3/settings/account/woocommerce_enable_checkout_login_reminder',
			data: { value: 'yes' },
		} );
	} );
	test.beforeEach( async ( { frontendUtils } ) => {
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( REGULAR_PRICED_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
	} );

	test( 'Shopper can log in to an existing account', async ( { page } ) => {
		//Get the login link from checkout page.
		const loginLink = page.getByText( 'Log in.' );
		const loginLinkHref = await loginLink.getAttribute( 'href' );

		//Confirm login link is correct.
		expect( loginLinkHref ).toContain(
			`${ process.env.WORDPRESS_BASE_URL }/my-account/?redirect_to`
		);
		expect( loginLinkHref ).toContain( `checkout` );
	} );
} );
