/**
 * External dependencies
 */
import {
	getAllBlocks,
	openDocumentSettingsSidebar,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';
import {
	findLabelWithText,
	visitBlockPage,
	selectBlockByName,
} from '@woocommerce/blocks-test-utils';

import {
	insertBlockDontWaitForInsertClose,
	closeInserter,
} from '../../utils.js';

const block = {
	name: 'Checkout',
	slug: 'woocommerce/checkout',
	class: '.wp-block-woocommerce-checkout',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );
}

describe( `${ block.name } Block`, () => {
	describe( `before compatibility notice is dismissed`, () => {
		beforeAll( async () => {
			// make sure CartCheckoutCompatibilityNotice will appear
			await page.evaluate( () => {
				localStorage.removeItem(
					'wc-blocks_dismissed_compatibility_notices'
				);
			} );
			await visitBlockPage( `${ block.name } Block` );
		} );

		it( 'shows compatibility notice', async () => {
			const compatibilityNoticeTitle = await page.$x(
				`//h1[contains(text(), 'Compatibility notice')]`
			);
			expect( compatibilityNoticeTitle.length ).toBe( 1 );
		} );
	} );

	describe( 'after compatibility notice is dismissed', () => {
		beforeAll( async () => {
			await page.evaluate( () => {
				localStorage.setItem(
					'wc-blocks_dismissed_compatibility_notices',
					'["checkout"]'
				);
			} );
			await switchUserToAdmin();
			await visitBlockPage( `${ block.name } Block` );
		} );
		afterAll( async () => {
			await page.evaluate( () => {
				localStorage.removeItem(
					'wc-blocks_dismissed_compatibility_notices'
				);
			} );
		} );

		it( 'can only be inserted once', async () => {
			await insertBlockDontWaitForInsertClose( block.name );
			await closeInserter();
			expect( await getAllBlocks() ).toHaveLength( 1 );
		} );

		it( 'renders without crashing', async () => {
			await expect( page ).toRenderBlock( block );
		} );

		describe( 'attributes', () => {
			beforeEach( async () => {
				await openDocumentSettingsSidebar();
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
				await openDocumentSettingsSidebar();
				await page.click(
					'.wp-block-woocommerce-checkout-shipping-address-block'
				);
			} );

			describe( 'Company input', () => {
				const selector = `.wc-block-components-address-form__company input`;

				it( 'visibility can be toggled', async () => {
					const toggleLabel = await findLabelWithText( 'Company' );
					await expect( toggleLabel ).toToggleElement( selector );
				} );

				it( 'required attribute can be toggled', async () => {
					// Company is disabled by default, so first we need to enable it.
					const toggleLabel = await findLabelWithText( 'Company' );
					await toggleLabel.click();
					const checkboxLabel = await findLabelWithText(
						'Require company name?'
					);

					await expect( checkboxLabel ).toToggleRequiredAttrOf(
						selector
					);
				} );
			} );

			describe( 'Apartment input', () => {
				it( 'visibility can be toggled', async () => {
					const selector = `${ block.class }  #shipping-address_2`;
					const toggleLabel = await findLabelWithText(
						'Apartment, suite, etc.'
					);
					await expect( toggleLabel ).toToggleElement( selector );
				} );
			} );

			describe( 'Phone input', () => {
				const selector = `${ block.class } #shipping-phone`;

				it( 'visibility can be toggled', async () => {
					const toggleLabel = await findLabelWithText( 'Phone' );
					await expect( toggleLabel ).toToggleElement( selector );
				} );

				it( 'required attribute can be toggled', async () => {
					// Phone is disabled by default, so first we need to enable it.
					const toggleLabel = await findLabelWithText( 'Phone' );
					await toggleLabel.click();
					const checkboxLabel = await findLabelWithText(
						'Require phone number?'
					);
					await expect( checkboxLabel ).toToggleRequiredAttrOf(
						selector
					);
				} );
			} );
		} );

		describe( 'action block attributes', () => {
			beforeEach( async () => {
				await openDocumentSettingsSidebar();
				await page.click(
					block.class +
						' .wp-block-woocommerce-checkout-actions-block'
				);
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
} );
