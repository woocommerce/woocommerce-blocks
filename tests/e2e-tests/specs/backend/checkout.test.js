/**
 * External dependencies
 */
import {
	insertBlock,
	getAllBlocks,
	openDocumentSettingsSidebar,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';
import {
	findLabelWithText,
	visitBlockPage,
} from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Checkout',
	slug: 'woocommerce/checkout',
	class: '.wc-block-checkout',
};

const closeInserter = async () => {
	await page.click( '.edit-post-header [aria-label="Add block"]' );
};

if ( process.env.WP_VERSION < 5.3 || process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'can only be inserted once', async () => {
		await insertBlock( block.name );
		await closeInserter();
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	describe( 'attributes', () => {
		beforeEach( async () => {
			await openDocumentSettingsSidebar();
			await page.click( block.class );
		} );

		describe( 'Company input', () => {
			const selector = `${ block.class } .wc-block-components-address-form__company input`;
			const toggleText = 'Company';
			const requiredCheckboxText = 'Require company name?';

			it( 'visibility can be toggled', async () => {
				await expect( toggleText ).toToggleVisibilityOf( selector );
			} );

			it( 'required attribute can be toggled', async () => {
				// Company is disabled by default, so first we need to enable it.
				const toggleLabel = await findLabelWithText( toggleText );
				await toggleLabel.click();

				await expect( requiredCheckboxText ).toToggleRequiredAttrOf(
					selector
				);
			} );
		} );

		describe( 'Apartment input', () => {
			it( 'visibility can be toggled', async () => {
				const selector = `${ block.class } .wc-block-components-address-form__address_2 input`;
				const toggleText = 'Apartment, suite, etc.';
				await expect( toggleText ).toToggleVisibilityOf( selector );
			} );
		} );

		describe( 'Phone input', () => {
			const selector = `${ block.class } #phone`;
			const toggleText = 'Phone';
			const requiredCheckboxText = 'Require phone number?';

			it( 'visibility can be toggled', async () => {
				await expect( toggleText ).toToggleVisibilityOf( selector );
			} );

			it( 'required attribute can be toggled', async () => {
				await expect( requiredCheckboxText ).toToggleRequiredAttrOf(
					selector
				);
			} );
		} );

		describe( 'Order notes checkbox', () => {
			it( 'visibility can be toggled', async () => {
				const selector = `${ block.class } .wc-block-checkout__add-note`;
				const toggleText =
					'Allow customers to optionally add order notes';
				await expect( toggleText ).toToggleVisibilityOf( selector );
			} );
		} );

		describe( 'Links to polices', () => {
			it( 'visibility can be toggled', async () => {
				const selector = `${ block.class } .wc-block-components-checkout-policies`;
				const toggleText = 'Show links to policies';
				await expect( toggleText ).toToggleVisibilityOf( selector );
			} );
		} );

		describe( 'Return to cart link', () => {
			it( 'visibility can be toggled', async () => {
				const selector = `${ block.class } .wc-block-components-checkout-return-to-cart-button`;
				const toggleText = 'Show a "Return to Cart" link';
				await expect( toggleText ).toToggleVisibilityOf( selector );
			} );
		} );

		it( 'can enable dark mode inputs', async () => {
			await openDocumentSettingsSidebar();
			await page.click( block.class );
			const toggleLabel = await findLabelWithText( 'Dark mode inputs' );
			await toggleLabel.click();

			await expect( page ).toMatchElement(
				`${ block.class }.has-dark-controls`
			);

			await toggleLabel.click();

			await expect( page ).not.toMatchElement(
				`${ block.class }.has-dark-controls`
			);
		} );
	} );
} );
