/**
 * External dependencies
 */
import { merchant } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import {
	searchForBlock,
	openWidgetEditor,
	closeModalIfExists,
} from '../../utils.js';

const block = {
	name: 'Checkout',
	slug: 'woocommerce/checkout',
	class: '.wp-block-woocommerce-checkout',
	selectors: {
		insertButton: "//button//span[text()='Checkout']",
	},
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// eslint-disable-next-line jest/no-focused-tests, jest/expect-expect
	test.only( `skipping ${ block.name } tests`, () => {} );
}

describe( `${ block.name } Block`, () => {
	describe( 'in widget editor', () => {
		it( "can't be inserted in a widget area", async () => {
			await merchant.login();
			await openWidgetEditor();
			await closeModalIfExists();
			await searchForBlock( block.name );
			const checkoutButton = await page.$x(
				`//button//span[text()='${ block.name }']`
			);

			expect( checkoutButton ).toHaveLength( 0 );
		} );
	} );
} );
