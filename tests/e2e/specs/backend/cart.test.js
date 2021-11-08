/**
 * External dependencies
 */
import {
	clickBlockToolbarButton,
	openDocumentSettingsSidebar,
	switchUserToAdmin,
	getAllBlocks,
} from '@wordpress/e2e-test-utils';
import {
	findLabelWithText,
	visitBlockPage,
	selectBlockByName,
} from '@woocommerce/blocks-test-utils';
import { merchant } from '@woocommerce/e2e-utils';

import {
	searchForBlock,
	insertBlockDontWaitForInsertClose,
	openWidgetEditor,
	closeModalIfExists,
	openWidgetsEditorBlockInserter,
} from '../../utils.js';

const block = {
	name: 'Cart',
	slug: 'woocommerce/cart',
	class: '.wp-block-woocommerce-cart',
};

const filledCartBlock = {
	name: 'Filled Cart',
	slug: 'woocommerce/filled-cart-block',
	class: '.wp-block-woocommerce-filled-cart-block',
};

const emptyCartBlock = {
	name: 'Empty Cart',
	slug: 'woocommerce/empty-cart-block',
	class: '.wp-block-woocommerce-empty-cart-block',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 ) {
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );
}

describe( `${ block.name } Block`, () => {
	describe( 'in page editor', () => {
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
						'["cart"]'
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
				expect( await getAllBlocks() ).toHaveLength( 1 );
			} );

			it( 'renders without crashing', async () => {
				await expect( page ).toRenderBlock( block );
				await expect( page ).toRenderBlock( filledCartBlock );
				await expect( page ).toRenderBlock( emptyCartBlock );
			} );

			it( 'shows empty cart when changing the view', async () => {
				await selectBlockByName( block.slug );
				await expect( page ).toMatchElement(
					`${ emptyCartBlock.class }[hidden]`
				);
				await clickBlockToolbarButton( 'Switch view' );
				const emptyCartButton = await page.waitForXPath(
					`//button[contains(@class,'components-dropdown-menu__menu-item') and contains(text(),'Empty Cart')]`
				);
				await emptyCartButton.evaluate( ( element ) => {
					document.querySelector( 'html' ).style.scrollBehavior =
						'auto';
					element.scrollIntoView();
				} );
				await emptyCartButton.click();
				await expect( page ).not.toMatchElement(
					`${ block.class } .wp-block-woocommerce-empty-cart-block[hidden]`
				);

				await selectBlockByName( block.slug );
				await clickBlockToolbarButton( 'Switch view' );
				const filledCartButton = await page.waitForXPath(
					`//button[contains(@class,'components-dropdown-menu__menu-item') and contains(text(),'Filled Cart')]`
				);
				await filledCartButton.evaluate( ( element ) => {
					document.querySelector( 'html' ).style.scrollBehavior =
						'auto';
					element.scrollIntoView();
				} );
				await filledCartButton.click();
				await expect( page ).toMatchElement(
					`${ emptyCartBlock.class }[hidden]`
				);
			} );

			describe( 'attributes', () => {
				beforeEach( async () => {
					await openDocumentSettingsSidebar();
					await selectBlockByName(
						'woocommerce/cart-order-summary-block'
					);
				} );

				it( 'can toggle Shipping calculator', async () => {
					const selector = `${ block.class } .wc-block-components-totals-shipping__change-address-button`;
					const toggleLabel = await findLabelWithText(
						'Shipping calculator'
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
			await openWidgetsEditorBlockInserter();
			await searchForBlock( block.name );
			const cartButton = await page.$x(
				`//button//span[text()='${ block.name }']`
			);

			// This one match is the Cart widget.
			expect( cartButton ).toHaveLength( 1 );
		} );
	} );
} );
