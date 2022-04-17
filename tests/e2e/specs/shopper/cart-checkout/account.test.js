import { shopper } from '../../../../utils';
import { SIMPLE_PHYSICAL_PRODUCT_NAME } from '.../../../../utils/constants';
import {
	visitBlockPage,
	selectBlockByName,
	saveOrPublish,
} from '@woocommerce/blocks-test-utils';

import {
	merchant,
	setCheckbox,
	unsetCheckbox,
	openDocumentSettingsSidebar,
} from '@woocommerce/e2e-utils';
import { switchUserToAdmin, visitAdminPage } from '@wordpress/e2e-test-utils';
const block = {
	name: 'Checkout',
	slug: 'woocommerce/checkout',
	class: '.wp-block-woocommerce-checkout',
};
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	test.only( 'Skipping Cart & Checkout tests', () => {} );
}
describe( 'Shopper → Checkout → Account', () => {
	beforeAll( async () => {
		await merchant.openSettings( 'account' );
		await setCheckbox( '#woocommerce_enable_checkout_login_reminder' );
		await setCheckbox(
			'#woocommerce_enable_signup_and_login_from_checkout'
		);
		await setCheckbox( '#woocommerce_enable_guest_checkout' );
		await page.click( 'button[name="save"]' );
		await page.waitForNavigation( { waitUntil: 'networkidle0' } );
		// await page.evaluate( () => {
		// 	localStorage.setItem(
		// 		'wc-blocks_dismissed_compatibility_notices',
		// 		'["checkout"]'
		// 	);
		// } );
		await visitBlockPage( `${ block.name } Block` );
		await openDocumentSettingsSidebar();
		await selectBlockByName( block.slug );
		await selectBlockByName(
			'woocommerce/checkout-contact-information-block'
		);
		await expect( page ).toClick( 'label', {
			text:
				'Allow shoppers to sign up for a user account during checkout',
		} );
		await saveOrPublish();
		await shopper.logout();
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
		await shopper.block.goToCheckout();
	} );
	it( 'user can login to existing account', async () => {
		const loginLink = await page.$eval(
			'span.wc-block-components-checkout-step__heading-content a',
			( el ) => el.href
		);

		await expect( loginLink ).toContain(
			`${ process.env.WORDPRESS_BASE_URL }/my-account/?redirect_to`
		);
		await expect( loginLink ).toContain( `checkout` );
	} );
	it( 'user can can create an account', async () => {
		await expect( page ).toClick( 'span', {
			text: 'Create an account?',
		} );
		const TEST_EMAIL = 'test' + Math.random() * 10 + '@example.com';
		await expect( page ).toFill( `#email`, TEST_EMAIL );
		await shopper.block.fillInCheckoutWithTestData();
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Order received' );
		await switchUserToAdmin();
		await visitAdminPage( 'users.php' );
		await expect( page ).toMatch( TEST_EMAIL );
	} );
} );
