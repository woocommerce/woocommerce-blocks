/**
 * External dependencies
 */
import {
	visitBlockPage,
	selectBlockByName,
	saveOrPublish,
} from '@woocommerce/blocks-test-utils';
import {
	merchant,
	setCheckbox,
	openDocumentSettingsSidebar,
} from '@woocommerce/e2e-utils';
import { switchUserToAdmin, visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { shopper } from '../../../../utils';
import { SIMPLE_PHYSICAL_PRODUCT_NAME } from '.../../../../utils/constants';

const block = {
	name: 'Checkout',
	slug: 'woocommerce/checkout',
	class: '.wp-block-woocommerce-checkout',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// Skips all the tests if it's a WooCommerce Core process environment.
	test.only( 'Skipping Cart & Checkout tests', () => {} );
}

describe( 'Shopper → Checkout → Account', () => {
	beforeAll( async () => {
		await merchant.openSettings( 'account' );
		//Enable create an account at checkout option.
		await setCheckbox( '#woocommerce_enable_checkout_login_reminder' );
		//Enable login at checkout option.
		await setCheckbox(
			'#woocommerce_enable_signup_and_login_from_checkout'
		);
		//Enable guest checkout option.
		await setCheckbox( '#woocommerce_enable_guest_checkout' );
		await page.click( 'button[name="save"]' );
		await page.waitForNavigation( { waitUntil: 'networkidle0' } );
		await visitBlockPage( `${ block.name } Block` );
		await openDocumentSettingsSidebar();
		await selectBlockByName( block.slug );
		await selectBlockByName(
			'woocommerce/checkout-contact-information-block'
		);
		//Enable shoppers to sign up at checkout option.
		await expect( page ).toClick( 'label', {
			text:
				'Allow shoppers to sign up for a user account during checkout',
		} );
		await saveOrPublish();
		await shopper.logout();
	} );

	beforeEach( async () => {
		await shopper.block.emptyCart();
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
		await shopper.block.goToCheckout();
	} );

	it( 'user can login to existing account', async () => {
		//Get the login link from checkout page.
		const loginLink = await page.$eval(
			'span.wc-block-components-checkout-step__heading-content a',
			( el ) => el.href
		);
		//Confirm login link is correct.
		await expect( loginLink ).toContain(
			`${ process.env.WORDPRESS_BASE_URL }/my-account/?redirect_to`
		);
		await expect( loginLink ).toContain( `checkout` );
	} );

	it( 'user can can create an account', async () => {
		await expect( page ).toClick( 'span', {
			text: 'Create an account?',
		} );
		//Create random email to place an order.
		let testEmail = `test${ Math.random() * 10 }@example.com`;
		await expect( page ).toFill( `#email`, testEmail );
		await shopper.block.fillInCheckoutWithTestData();
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Order received' );
		await switchUserToAdmin();
		await visitAdminPage( 'users.php' );
		await page.screenshot( {
			path: `screenshots/${ expect.getState().currentTestName }.jpg`,
			fullPage: true,
		} );
		//Confirm account is being created with the email.
		await expect( page ).toMatch( testEmail );
	} );
} );
