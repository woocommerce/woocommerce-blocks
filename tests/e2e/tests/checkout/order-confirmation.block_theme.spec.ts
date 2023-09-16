/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import {
	FREE_SHIPPING_NAME,
	FREE_SHIPPING_PRICE,
	SIMPLE_PHYSICAL_PRODUCT_NAME,
} from './constants';
import { CheckoutPage } from './checkout.page';

const testData = {
	firstname: 'John',
	lastname: 'Doe',
	addressfirstline: '123 Easy Street',
	addresssecondline: 'Testville',
	country: 'United States (US)',
	city: 'New York',
	state: 'New York',
	postcode: '90210',
	email: 'john.doe@test.com',
	phone: '01234567890',
};

const {
	firstname,
	lastname,
	addressfirstline,
	addresssecondline,
	city,
	postcode,
	email,
	phone,
} = testData;

const test = base.extend< { pageObject: CheckoutPage } >( {
	pageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Shopper → Order Confirmation', () => {
	test.beforeEach( async ( { admin, editorUtils } ) => {
		await admin.visitSiteEditor( {
			postId: 'woocommerce/woocommerce//order-confirmation',
			postType: 'wp_template',
		} );
		await editorUtils.enterEditMode();
		await editorUtils.closeWelcomeGuideModal();
		await editorUtils.transformIntoBlocks();
	} );

	test( 'should be rendered on the frontend side', async ( {
		frontendUtils,
		pageObject,
		page,
	} ) => {
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_PHYSICAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await expect(
			await pageObject.selectAndVerifyShippingOption(
				FREE_SHIPPING_NAME,
				FREE_SHIPPING_PRICE
			)
		).toBe( true );
		await pageObject.fillInCheckoutWithTestData( testData );
		await pageObject.placeOrder();
		await expect(
			page.getByText( 'Thank you. Your order has been received.' )
		).toBeVisible();
		await expect( page.getByText( email ) ).toBeVisible();
		await expect( page.getByText( FREE_SHIPPING_NAME ) ).toBeVisible();
		await expect(
			page.getByText( SIMPLE_PHYSICAL_PRODUCT_NAME )
		).toBeVisible();
		await expect(
			page
				.getByText(
					`${ firstname } ${ lastname }${ addressfirstline }${ addresssecondline }${ city }, NY ${ postcode }${ phone }`
				)
				.first()
		).toBeVisible();
		await expect(
			page
				.getByText(
					`${ firstname } ${ lastname }${ addressfirstline }${ addresssecondline }${ city }, NY ${ postcode }${ phone }`
				)
				.nth( 1 )
		).toBeVisible();
	} );
} );

test.describe( 'Shopper → Order Confirmation → Local Pickup', () => {
	test( 'Confirm shipping address section is hidden, but billing is visible', async ( {
		pageObject,
		frontendUtils,
		admin,
	} ) => {
		await admin.visitAdminPage(
			'admin.php?page=wc-settings&tab=shipping&section=pickup_location'
		);
		await admin.page.getByLabel( 'Enable local pickup' ).uncheck();
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
		await admin.page
			.getByRole( 'button', { name: 'Dismiss this notice' } )
			.click();
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_PHYSICAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await pageObject.page
			.getByRole( 'radio', { name: 'Local Pickup free' } )
			.click();
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		await expect(
			pageObject.page.getByRole( 'heading', { name: 'Shipping address' } )
		).toBeHidden();
		await expect(
			pageObject.page.getByRole( 'heading', { name: 'Billing address' } )
		).toBeVisible();
	} );
} );

test.describe( 'Shopper → Order Confirmation → Downloadable Products', () => {
	let confirmationPageUrl: string;

	test.beforeEach( async ( { frontendUtils, pageObject } ) => {
		await frontendUtils.emptyCart();
		await frontendUtils.goToShop();
		await frontendUtils.addToCart( SIMPLE_VIRTUAL_PRODUCT_NAME );
		await frontendUtils.goToCheckout();
		await pageObject.fillInCheckoutWithTestData();
		await pageObject.placeOrder();
		confirmationPageUrl = pageObject.page.url();
	} );

	test( 'Confirm shipping address section is hidden, but billing is visible', async ( {
		pageObject,
	} ) => {
		await expect(
			pageObject.page.getByRole( 'heading', { name: 'Shipping address' } )
		).toBeHidden();
		await expect(
			pageObject.page.getByRole( 'heading', { name: 'Billing address' } )
		).toBeVisible();
	} );

	test( 'Confirm order downloads are visible', async ( {
		pageObject,
		admin,
	} ) => {
		// While order is pending the downloads are hidden.
		await expect(
			pageObject.page.getByRole( 'heading', { name: 'Downloads' } )
		).toBeHidden();

		// Update last order status to completed.
		await admin.visitAdminPage( 'edit.php?post_type=shop_order' );
		await admin.page.waitForSelector( '.wp-list-table' );
		await admin.page.click(
			'.wp-list-table tbody tr:first-child a.order-view'
		);
		await admin.page.getByRole( 'textbox', { name: 'On hold' } ).click();
		await admin.page.getByRole( 'option', { name: 'Completed' } ).click();
		await admin.page
			.getByRole( 'button', { name: 'Update' } )
			.first()
			.click();

		// Go back to page.
		await pageObject.page.goto( confirmationPageUrl );
		await expect(
			pageObject.page.getByRole( 'heading', { name: 'Downloads' } )
		).toBeVisible();
	} );
} );
