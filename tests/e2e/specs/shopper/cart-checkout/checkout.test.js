/**
 * External dependencies
 */
import {
	merchant,
	openDocumentSettingsSidebar,
	setCheckbox,
	unsetCheckbox,
	withRestApi,
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
	BILLING_DETAILS,
	SHIPPING_DETAILS,
	SIMPLE_PHYSICAL_PRODUCT_NAME,
	SIMPLE_VIRTUAL_PRODUCT_NAME,
} from '../../../../utils';

import { createCoupon } from '../../../utils';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// Skips all the tests if it's a WooCommerce Core process environment.
	// eslint-disable-next-line jest/no-focused-tests, jest/expect-expect
	test.only( 'Skipping Cart & Checkout tests', () => {} );
}

let companyCheckboxId = null;
let coupon;

describe( 'Shopper → Checkout', () => {
	beforeAll( async () => {
		await shopper.block.emptyCart();
	} );

	it( 'User can view empty cart message', async () => {
		await shopper.block.goToCheckout();
		// Verify cart is empty'
		await expect( page ).toMatchElement(
			'strong.wc-block-checkout-empty__title',
			{
				text: 'Your cart is empty!',
			}
		);
	} );
	describe( 'Payment Methods', () => {
		it( 'User can change payment methods', async () => {
			await shopper.block.emptyCart();
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await expect( page ).toClick(
				'.wc-block-components-payment-method-label',
				{
					text: 'Direct bank transfer',
				}
			);
			await expect( page ).toClick(
				'.wc-block-components-payment-method-label',
				{
					text: 'Cash on delivery',
				}
			);
		} );
	} );

	describe( 'Shipping and Billing Addresses', () => {
		beforeAll( async () => {
			await preventCompatibilityNotice();
			await merchant.login();
			await visitBlockPage( 'Checkout Block' );
			await openDocumentSettingsSidebar();
			await selectBlockByName(
				'woocommerce/checkout-shipping-address-block'
			);

			// This checkbox ID is unstable, so, we're getting its value from "for" attribute of the label
			const [ companyCheckboxLabel ] = await page.$x(
				`//label[contains(text(), "Company") and contains(@class, "components-toggle-control__label")]`
			);
			companyCheckboxId = await page.evaluate(
				( label ) => `#${ label.getAttribute( 'for' ) }`,
				companyCheckboxLabel
			);

			await setCheckbox( companyCheckboxId );
			await saveOrPublish();
			await shopper.block.emptyCart();
		} );

		afterAll( async () => {
			await shopper.block.emptyCart();
			await visitBlockPage( 'Checkout Block' );
			await openDocumentSettingsSidebar();
			await selectBlockByName(
				'woocommerce/checkout-shipping-address-block'
			);
			await unsetCheckbox( companyCheckboxId );
			await saveOrPublish();
			await merchant.logout();
			await reactivateCompatibilityNotice();
		} );

		// eslint-disable-next-line jest/expect-expect
		it( 'User can have different shipping and billing addresses', async () => {
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await page.waitForSelector( '#checkbox-control-0' );
			await unsetCheckbox( '#checkbox-control-0' );
			await shopper.block.fillShippingDetails( SHIPPING_DETAILS );
			await shopper.block.fillBillingDetails( BILLING_DETAILS );
			await shopper.block.placeOrder();
			await shopper.block.verifyShippingDetails( SHIPPING_DETAILS );
			await shopper.block.verifyBillingDetails( BILLING_DETAILS );
		} );
	} );

	describe( 'Checkout Form Errors', () => {
		beforeAll( async () => {
			const isShopperLoggedIn = await shopper.isLoggedIn();

			// @todo Find a better way to reset the checkout form instead of login then logout
			if ( isShopperLoggedIn ) {
				// Click on the "Log out" link in "My account" page
				await await shopper.logout();
			} else {
				await shopper.login();
				await shopper.logout();
			}
		} );

		it( 'User can see errors when form is incomplete', async () => {
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();

			// Click on "Place Order" button
			await expect( page ).toClick(
				'.wc-block-components-checkout-place-order-button',
				{
					text: 'Place Order',
				}
			);

			await page.waitForSelector(
				'.wc-block-components-validation-error'
			);

			// Verify that all required fields show the correct warning.
			await expect( page ).toMatchElement(
				'#email ~ .wc-block-components-validation-error p',
				{
					text: 'Please fill out this field.',
				}
			);
			await expect( page ).toMatchElement(
				'#billing-first_name ~ .wc-block-components-validation-error p',
				{
					text: 'Please fill out this field.',
				}
			);
			await expect( page ).toMatchElement(
				'#billing-last_name ~ .wc-block-components-validation-error p',
				{
					text: 'Please fill out this field.',
				}
			);
			await expect( page ).toMatchElement(
				'#billing-address_1 ~ .wc-block-components-validation-error p',
				{
					text: 'Please fill out this field.',
				}
			);
			await expect( page ).toMatchElement(
				'#billing-city ~ .wc-block-components-validation-error p',
				{
					text: 'Please fill out this field.',
				}
			);
			await expect( page ).toMatchElement(
				'#billing-postcode ~ .wc-block-components-validation-error p',
				{
					text: 'Please fill out this field.',
				}
			);
		} );
	} );

	describe( 'Place Order', () => {
		it( 'Guest user can place order', async () => {
			if ( await shopper.isLoggedIn() ) {
				await shopper.logout();
			}
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await shopper.block.fillBillingDetails( BILLING_DETAILS );
			await shopper.block.placeOrder();
			await expect( page ).toMatch( 'Your order has been received.' );
		} );

		it( 'Logged in user can place an order', async () => {
			await shopper.login();
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await shopper.block.fillBillingDetails( BILLING_DETAILS );
			await shopper.block.placeOrder();
			await expect( page ).toMatch( 'Your order has been received.' );
			await shopper.logout();
		} );
	} );

	describe( `Shipping`, () => {
		const FREE_SHIPPING_NAME = 'Free Shipping';
		const FREE_SHIPPING_PRICE = '$0.00';
		const NORMAL_SHIPPING_NAME = 'Normal Shipping';
		const NORMAL_SHIPPING_PRICE = '$20.00';

		it( 'User can choose free shipping', async () => {
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await shopper.block.selectAndVerifyShippingOption(
				FREE_SHIPPING_NAME,
				FREE_SHIPPING_PRICE
			);
			await shopper.block.fillInCheckoutWithTestData();
			await shopper.block.placeOrder();
			await page.waitForSelector( '.woocommerce-order' );
			await expect( page ).toMatch( 'Order received' );
			await expect( page ).toMatch( FREE_SHIPPING_NAME );
		} );

		it( 'User can choose flat rate shipping', async () => {
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await shopper.block.selectAndVerifyShippingOption(
				NORMAL_SHIPPING_NAME,
				NORMAL_SHIPPING_PRICE
			);
			await shopper.block.fillInCheckoutWithTestData();
			await shopper.block.placeOrder();
			await page.waitForSelector( '.woocommerce-order' );
			await expect( page ).toMatch( 'Order received' );
			await expect( page ).toMatch( NORMAL_SHIPPING_NAME );
		} );
	} );

	describe( 'Coupons', () => {
		beforeAll( async () => {
			coupon = await createCoupon( { usageLimit: 1 } );
			await shopper.login();
		} );

		afterAll( async () => {
			await withRestApi.deleteCoupon( coupon.id );
			await shopper.logout();
		} );

		it( 'Logged in user can apply single-use coupon and place order', async () => {
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await shopper.block.applyCouponFromCheckout( coupon.code );

			const discountBlockSelector =
				'.wc-block-components-totals-discount';
			const discountAppliedCouponCodeSelector =
				'.wc-block-components-totals-discount__coupon-list-item span.wc-block-components-chip__text';
			const discountValueSelector =
				'.wc-block-components-totals-discount .wc-block-components-totals-item__value';

			// Verify that the discount had been applied correctly on the checkout page.
			await page.waitForSelector( discountBlockSelector );
			await expect( page ).toMatchElement( discountValueSelector, {
				text: coupon.amount,
			} );
			await expect( page ).toMatchElement(
				discountAppliedCouponCodeSelector,
				{
					text: coupon.code,
				}
			);

			await shopper.block.fillInCheckoutWithTestData();
			await shopper.block.placeOrder();
			await expect( page ).toMatch( 'Your order has been received.' );

			// Verify that the discount had been applied correctly on the order confirmation page.
			await expect( page ).toMatchElement( `th`, {
				text: 'Discount',
			} );
			await expect( page ).toMatchElement(
				`span.woocommerce-Price-amount`,
				{
					text: coupon.amount,
				}
			);
		} );

		it( 'Logged in user cannot apply single-use coupon twice', async () => {
			await shopper.goToShop();
			await shopper.addToCartFromShopPage( SIMPLE_VIRTUAL_PRODUCT_NAME );
			await shopper.block.goToCheckout();
			await shopper.block.applyCouponFromCheckout( coupon.code );
			await page.waitForSelector(
				'.wc-block-components-validation-error'
			);
			await expect( page ).toMatch(
				'Coupon usage limit has been reached.'
			);
		} );
	} );
} );
