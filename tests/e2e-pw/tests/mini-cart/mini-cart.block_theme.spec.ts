/**
 * External dependencies
 */
import { BlockData } from '@woocommerce/e2e-types';
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const blockData: BlockData = {
	name: 'woocommerce/mini-cart',
	mainClass: '.wc-block-mini-cart',
	selectors: {
		frontend: {
			drawer: '.wc-block-mini-cart__drawer',
			drawerCloseButton: 'button[aria-label="Close"]',
		},
		editor: {},
	},
};

const getMiniCartButton = async ( { page } ) => {
	return await page.getByLabel( '0 items in cart, total price of $0.00' );
};

test.describe( `${ blockData.name } Block`, () => {
	test( `laky test`, ( { page }, testInfo ) => {
		if ( testInfo.retry ) {
			expect( true ).toBe( true );
		}
		expect( true ).toBe( false );
	} );
} );
