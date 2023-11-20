/**
 * External dependencies
 */
import { switchUserToAdmin } from '@wordpress/e2e-test-utils';
import {
	findLabelWithText,
	visitBlockPage,
	selectBlockByName,
} from '@woocommerce/blocks-test-utils';
import { merchant } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import {
	searchForBlock,
	openSettingsSidebar,
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
	describe( 'in page editor', () => {
		beforeAll( async () => {
			await switchUserToAdmin();
			await visitBlockPage( `${ block.name } Block` );
		} );

		describe( 'attributes', () => {
			beforeEach( async () => {
				await openSettingsSidebar();
				await selectBlockByName( block.slug );
			} );

			it( 'can enable dark mode inputs', async () => {
				const toggleLabel = await findLabelWithText(
					'Dark mode inputs'
				);
				await toggleLabel.click();

				await expect( page ).toMatchElement(
					`.wc-block-checkout.has-dark-controls`
				);

				await toggleLabel.click();

				await expect( page ).not.toMatchElement(
					`.wc-block-checkout.has-dark-controls`
				);
			} );
		} );

		describe( 'shipping address block attributes', () => {
			beforeEach( async () => {
				await openSettingsSidebar();
				await selectBlockByName(
					'woocommerce/checkout-shipping-address-block'
				);
			} );

			describe( 'Company input', () => {
				const selector = `${ block.class } #shipping-company`;

				it( 'visibility can be toggled', async () => {
					await expect( 'Company' ).toToggleElement( selector );
				} );

				it( 'required attribute can be toggled', async () => {
					// Company is disabled by default, so first we need to enable it.
					const toggleLabel = await findLabelWithText( 'Company' );
					await toggleLabel.click();
					await expect(
						'Require company name?'
					).toToggleRequiredAttrOf( selector );
				} );
			} );

			describe( 'Apartment input', () => {
				it( 'visibility can be toggled', async () => {
					const selector = `${ block.class } #shipping-address_2`;
					await expect( 'Apartment, suite, etc.' ).toToggleElement(
						selector
					);
				} );
			} );

			describe( 'Phone input', () => {
				const selector = `${ block.class } #shipping-phone`;

				it( 'visibility can be toggled', async () => {
					await expect( 'Phone' ).toToggleElement( selector );
				} );

				it( 'required attribute can be toggled', async () => {
					await expect(
						'Require phone number?'
					).toToggleRequiredAttrOf( selector );
				} );
			} );
		} );

		describe( 'action block attributes', () => {
			beforeEach( async () => {
				await openSettingsSidebar();
				await selectBlockByName( 'woocommerce/checkout-actions-block' );
			} );

			describe( 'Return to cart link', () => {
				it( 'visibility can be toggled', async () => {
					const selector = `${ block.class } .wc-block-components-checkout-return-to-cart-button`;
					const toggleLabel = await findLabelWithText(
						'Show a "Return to Cart" link'
					);
					await expect( toggleLabel ).toToggleElement( selector );
				} );
			} );
		} );
	} );

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
