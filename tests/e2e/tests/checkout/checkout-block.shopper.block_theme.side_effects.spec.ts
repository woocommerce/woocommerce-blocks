/**
 * External dependencies
 */
import { expect, test as base } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import {
	REGULAR_PRICED_PRODUCT_NAME,
	SIMPLE_PHYSICAL_PRODUCT_NAME,
} from './constants';
import { CheckoutPage } from './checkout.page';

const test = base.extend< { checkoutPageObject: CheckoutPage } >( {
	checkoutPageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Shopper → Account', () => {
	// Become a logged out user.
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

	test( 'Shopper can log in to an existing account and can create an account', async ( {
		requestUtils,
		checkoutPageObject,
		page,
	} ) => {
		//Get the login link from checkout page.
		const loginLink = page.getByText( 'Log in.' );
		const loginLinkHref = await loginLink.getAttribute( 'href' );

		//Confirm login link is correct.
		expect( loginLinkHref ).toContain(
			`${ process.env.WORDPRESS_BASE_URL }/my-account/?redirect_to`
		);
		expect( loginLinkHref ).toContain( `checkout` );

		await requestUtils.rest( {
			method: 'PUT',
			path: 'wc/v3/settings/account/woocommerce_enable_signup_and_login_from_checkout',
			data: { value: 'yes' },
		} );

		await page.reload();

		const createAccount = page.getByLabel( 'Create an account?' );
		await createAccount.check();
		const testEmail = `test${ Math.random() * 10 }@example.com`;
		await checkoutPageObject.fillInCheckoutWithTestData( {
			email: testEmail,
		} );
		await checkoutPageObject.placeOrder();

		// Get users from API with same email used when purchasing.
		await requestUtils
			.rest( {
				method: 'GET',
				path: `wc/v3/customers?email=${ testEmail }`,
			} )
			.then( ( response ) => {
				expect( response[ 0 ].email ).toBe( testEmail );
			} );
	} );
} );

test.describe( 'shopper → Local pickup', () => {
	test.beforeEach( async ( { admin } ) => {
		// Enable local pickup.
		await admin.visitAdminPage(
			'admin.php?page=wc-settings&tab=shipping&section=pickup_location'
		);
		await admin.page.getByLabel( 'Enable local pickup' ).check();
		await admin.page
			.getByRole( 'button', { name: 'Add pickup location' } )
			.click();
		await admin.page.getByLabel( 'Location name' ).fill( 'Testing' );
		await admin.page.getByPlaceholder( 'Address' ).fill( 'Test Address' );
		await admin.page.getByPlaceholder( 'City' ).fill( 'Test City' );
		await admin.page.getByPlaceholder( 'Postcode / ZIP' ).fill( '90210' );
		await admin.page
			.getByLabel( 'Pickup details' )
			.fill( 'Pickup method.' );
		await admin.page.getByRole( 'button', { name: 'Done' } ).click();
		await admin.page
			.getByRole( 'button', { name: 'Save changes' } )
			.click();
	} );
	test.afterEach( async ( { admin } ) => {
		// Enable local pickup.
		await admin.visitAdminPage(
			'admin.php?page=wc-settings&tab=shipping&section=pickup_location'
		);
		await admin.page.getByRole( 'button', { name: 'Edit' } ).last().click();
		await admin.page
			.getByRole( 'button', { name: 'Delete location' } )
			.click();
		await admin.page
			.getByRole( 'button', { name: 'Save changes' } )
			.click();
	} );
	test( 'The shopper can choose a local pickup option', async ( {
		page,
		frontendUtils,
		checkoutPageObject,
	} ) => {
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_PHYSICAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await page.getByRole( 'radio', { name: 'Local Pickup free' } ).click();
		await expect( page.getByLabel( 'Testing' ).last() ).toBeVisible();
		await page.getByLabel( 'Testing' ).last().check();
		await checkoutPageObject.fillInCheckoutWithTestData();
		await checkoutPageObject.placeOrder();
		await expect(
			page.getByText( 'Collection from Testing' )
		).toBeVisible();
		await checkoutPageObject.verifyBillingDetails();
	} );
} );
