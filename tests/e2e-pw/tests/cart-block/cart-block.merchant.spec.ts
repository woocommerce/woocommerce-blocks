/**
 * External dependencies
 */
import { BlockData } from '@woocommerce/e2e-types';
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { editBlockPage } from '../../utils/navigation/navigation';

const blockData: BlockData = {
	title: 'Cart',
	slug: 'woocommerce/cart',
	selectors: {
		block: '.wp-block-woocommerce-cart',
		insertButton: "//button//span[text()='Cart']",
	},
};

test.describe( 'Merchant → Cart', () => {
	test.use( { storageState: process.env.ADMINSTATE } );

	test.beforeEach( async ( { page } ) => {
		await editBlockPage( page, blockData );
	} );

	test( 'it renders without crashing', async ( { page } ) => {
		const blockPresence = page.locator( blockData.selectors.className );
		expect( blockPresence ).toBeTruthy();
	} );

	test.only( 'can only be inserted once', async ( { page, editorUtils } ) => {
		await editorUtils.openGlobalBlockInserter( page );
		await page.getByPlaceholder( 'Search' ).fill( blockData.slug );
		const cartBlockButton = await page.locator( 'button', {
			has: page.locator( `text="${ blockData.title }"` ),
		} );
		await expect( cartBlockButton ).toHaveAttribute(
			'aria-disabled',
			'true'
		);
	} );
} );
