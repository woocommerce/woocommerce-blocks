/**
 * External dependencies
 */
import { test, expect } from '@playwright/test';

/**
 * Internal dependencies
 */
import { editBlockPage } from '../../../utils/navigation';
import { BlockTestingProperties } from '../../../types';

const blockProperties: BlockTestingProperties = {
	title: 'Cart',
	slug: 'woocommerce/cart',
	selectors: {
		block: '.wp-block-woocommerce-cart',
		insertButton: "//button//span[text()='Cart']",
	},
};

test.describe( 'Merchant → Cart', () => {
	test.use( { storageState: process.env.ADMINSTATE } );
	test( 'it renders without crashing', async ( { page } ) => {
		await editBlockPage( page, blockProperties );
		const blockPresence = page.locator(
			blockProperties.selectors.className
		);
		expect( blockPresence ).toBeTruthy();
	} );
} );
