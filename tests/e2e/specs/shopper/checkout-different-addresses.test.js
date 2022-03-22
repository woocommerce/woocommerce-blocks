/**
 * External dependencies
 */
import {
	merchant,
	openDocumentSettingsSidebar,
	uiUnblocked,
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

import { BILLING_DETAILS, SHIPPING_DETAILS } from '../../../utils/constants';
const SIMPLE_PRODUCT_NAME = '128GB USB Stick';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'Skipping Checkout tests', () => {} );

describe( 'Shopper → Checkout → Can have different shipping and billing addresses', () => {
	beforeAll( async () => {
		// prevent CartCheckoutCompatibilityNotice from appearing
		await preventCompatibilityNotice();
		await merchant.login();

		// Activate all address fields.
		await visitBlockPage( 'Checkout Block' );
		await openDocumentSettingsSidebar();
		await selectBlockByName(
			'woocommerce/checkout-shipping-address-block'
		);
		await expect( page ).toClick( 'label', { text: 'Company' } );
		await expect( page ).toClick( 'label', {
			text: 'Apartment, suite, etc.',
		} );
		await expect( page ).toClick( 'label', { text: 'Phone' } );
		await saveOrPublish();
	} );

	afterAll( async () => {
		// Deactivate all address fields.
		await visitBlockPage( 'Checkout Block' );
		await openDocumentSettingsSidebar();
		await selectBlockByName(
			'woocommerce/checkout-shipping-address-block'
		);
		await expect( page ).toClick( 'label', { text: 'Company' } );
		await expect( page ).toClick( 'label', {
			text: 'Apartment, suite, etc.',
		} );
		await expect( page ).toClick( 'label', { text: 'Phone' } );
		await saveOrPublish();
		await merchant.logout();
		await reactivateCompatibilityNotice();
	} );

	it( 'allows customer to have different shipping and billing addresses', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCheckout();

		await page.evaluate( () => {
			const checkbox = document.querySelector( '#checkbox-control-0' );
			if ( checkbox.checked ) {
				checkbox.click();
			}
		} );
		await uiUnblocked();
		// await page.waitForTimeout( 1000 );
		// await jestPuppeteer.debug();
		await shopper.block.fillShippingDetails( SHIPPING_DETAILS );
		await shopper.block.fillBillingDetails( BILLING_DETAILS );
		await shopper.block.placeOrder();
		await page.waitForTimeout( 1000 );
		await shopper.block.verifyShippingDetails( SHIPPING_DETAILS );
		await shopper.block.verifyBillingDetails( BILLING_DETAILS );
	} );
} );
