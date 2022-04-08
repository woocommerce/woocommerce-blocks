/**
 * External dependencies
 */
import {
	merchant,
	openDocumentSettingsSidebar,
	setCheckbox,
	unsetCheckbox,
} from '@woocommerce/e2e-utils';
import {
	visitBlockPage,
	selectBlockByName,
	saveOrPublish,
} from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import {
	shopper,
	preventCompatibilityNotice,
	reactivateCompatibilityNotice,
} from '../../../utils';
import {
	BILLING_DETAILS,
	SIMPLE_VIRTUAL_PRODUCT_NAME,
} from '../../../utils/constants';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `Skipping checkout tests`, () => {} );
}

describe( 'Merchant → Checkout → Can adjust T&S and Privacy Policy options', () => {
	beforeAll( async () => {
		await shopper.goToShop();
		await page.goto( 'http://localhost:8889/?setup_terms_and_privacy' );
		await expect( page ).toMatch( 'Terms & Privacy pages set up.' );
		await shopper.block.emptyCart();
	} );

	afterAll( async () => {
		await shopper.block.emptyCart();
		await page.goto( 'http://localhost:8889/?teardown_terms_and_privacy' );
		await expect( page ).toMatch( 'Terms & Privacy pages teared down.' );
	} );

	it( 'Merchant can see T&S and Privacy Policy links without checkbox', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await shopper.block.goToCheckout();
		await expect( page ).toMatch(
			'By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy'
		);
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Order received' );
	} );

	it.skip( 'Merchant can see T&S and Privacy Policy links with checkbox', async () => {
		// Activate checkboxes for T&S and Privacy Policy links.
		await preventCompatibilityNotice();
		await merchant.login();
		await visitBlockPage( 'Checkout Block' );
		await openDocumentSettingsSidebar();
		await selectBlockByName( 'woocommerce/checkout-terms-block' );
		const [ termsCheckboxLabel ] = await page.$x(
			`//label[contains(text(), "Require checkbox") and contains(@class, "components-toggle-control__label")]`
		);
		const termsCheckboxId = await page.evaluate(
			( label ) => `#${ label.getAttribute( 'for' ) }`,
			termsCheckboxLabel
		);
		await setCheckbox( termsCheckboxId );
		await saveOrPublish();
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await shopper.block.goToCheckout();
		await shopper.block.fillBillingDetails( BILLING_DETAILS );

		// Placing an order now, must lead to an error.
		await page.click( '.wc-block-components-checkout-place-order-button' );

		const termsCheckbox = container.querySelector(
			'.wp-block-woocommerce-checkout-terms-block div'
		);
		await expect( termsCheckbox ).toHaveClass( 'has-error' );
		await setCheckbox( 'terms-and-conditions' );

		// Placing an order now, must succeed.
		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Order received' );

		// Deactivate checkboxes for T&S and Privacy Policy links.
		await visitBlockPage( 'Checkout Block' );
		await openDocumentSettingsSidebar();
		await selectBlockByName( 'woocommerce/checkout-terms-block' );
		await unsetCheckbox( companyCheckboxId );
		await saveOrPublish();
		await merchant.logout();
		await reactivateCompatibilityNotice();
	} );
} );
