/**
 * External dependencies
 */
import { test as base } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { CheckoutPage } from './checkout.page';

const test = base.extend< { pageObject: CheckoutPage } >( {
	pageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );

test.describe( 'Merchant → Checkout block', () => {
	test.describe( 'In page editor', () => {
		test.beforeEach( async ( { editorUtils, admin } ) => {
			await admin.visitSiteEditor( {
				postId: 'woocommerce/woocommerce//page-checkout',
				postType: 'wp_template',
			} );
			await editorUtils.enterEditMode();
		} );
	} );
} );
