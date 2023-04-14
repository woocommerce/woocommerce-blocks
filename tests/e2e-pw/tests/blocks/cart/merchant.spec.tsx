/**
 * External dependencies
 */
import { test, expect } from '@playwright/test';

/**
 * Internal dependencies
 */
import { editBlockPage } from '../../../utils/navigation';
import { BlockTestingProperties } from '../../../types';
import { openGlobalBlockInserter } from '../../../utils/editor';

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

	test( 'can only be inserted once', async ( { page } ) => {
		await editBlockPage( page, blockProperties );
		await openGlobalBlockInserter( page );
		await page.getByPlaceholder( 'Search' ).fill( blockProperties.slug );
		const cartBlockButton = await page.locator( 'button', {
			has: page.locator( `text="${ blockProperties.title }"` ),
		} );
		await expect( cartBlockButton ).toHaveAttribute(
			'aria-disabled',
			'true'
		);
	} );
} );
