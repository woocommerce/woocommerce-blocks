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
		editor: {
			block: '.wp-block-woocommerce-cart',
			insertButton: "//button//span[text()='Cart']",
		},
		frontend: {
			block: '.wp-block-woocommerce-cart',
		},
	},
};

test.describe( 'Merchant → Cart', () => {
	test.use( { storageState: process.env.ADMINSTATE } );

	test.describe( 'in page editor', () => {
		test.beforeEach( async ( { page } ) => {
			await editBlockPage( page, blockData );
		} );

		test( 'it renders without crashing', async ( { page } ) => {
			const blockPresence = page.locator(
				blockData.selectors.editor.block
			);
			expect( blockPresence ).toBeTruthy();
		} );

		test( 'can only be inserted once', async ( { page, editorUtils } ) => {
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

		test( 'inner blocks can be added/removed by filters', async ( {
			page,
			editor,
		} ) => {
			// Begin by removing the block.
			await editor.selectBlocks( blockData.selectors.editor.block );
			const options = await page
				.getByRole( 'toolbar', { name: 'Block tools' } )
				.getByRole( 'button', { name: 'Options' } );
			await options.click();
			const removeButton = await page.getByText( 'Remove Cart' );
			await removeButton.click();
			// Expect block to have been removed.
			await expect(
				page.locator( blockData.selectors.editor.block )
			).toHaveCount( 0 );

			// Register a checkout filter to allow `core/table` block in the Checkout block's inner blocks, add
			// core/audio into the woocommerce/cart-order-summary-block and remove core/paragraph from all Cart inner
			// blocks.
			await page.evaluate(
				"wc.blocksCheckout.registerCheckoutFilters( 'woo-test-namespace'," +
					'{ additionalCartCheckoutInnerBlockTypes: ( value, extensions, { block } ) => {' +
					"    value.push('core/table');" +
					"    if ( block === 'woocommerce/cart-order-summary-block' ) {" +
					"        value.push( 'core/audio' );" +
					'    }' +
					'    return value;' +
					'}' +
					'}' +
					');'
			);

			await editor.insertBlock( { name: 'woocommerce/cart' } );
			await expect(
				page.locator( blockData.selectors.editor.block )
			).toHaveCount( 1 );

			// // Select the cart-order-summary-block block and try to insert a block. Check the Table block is available.
			await editor.selectBlocks(
				blockData.selectors.editor.block +
					' [data-type="woocommerce/cart-order-summary-block"]'
			);

			const addBlockButton = await page
				.getByRole( 'document', { name: 'Block: Order Summary' } )
				.getByRole( 'button', { name: 'Add block' } );
			await addBlockButton.click();
			await page
				.getByLabel( 'Search for blocks and patterns' )
				.fill( 'Table' );
			const tableButton = await page.getByRole( 'option', {
				name: 'Table',
			} );
			await expect( tableButton ).toBeVisible();

			await page
				.getByLabel( 'Search for blocks and patterns' )
				.fill( 'Audio' );

			const audioButton = await page.getByRole( 'option', {
				name: 'Audio',
			} );
			await test.expect( audioButton ).toBeVisible();

			// Now check the filled cart block and expect only the Table block to be available there.
			await editor.selectBlocks(
				blockData.selectors.editor.block +
					' [data-type="woocommerce/filled-cart-block"]'
			);
			const filledCartAddBlockButton = await page
				.getByRole( 'document', { name: 'Block: Filled Cart' } )
				.getByRole( 'button', { name: 'Add block' } )
				.first();
			await filledCartAddBlockButton.click();

			const filledCartTableButton = await page.getByRole( 'option', {
				name: 'Table',
			} );
			await expect( filledCartTableButton ).toBeVisible();

			const filledCartAudioButton = await page.getByRole( 'option', {
				name: 'Audio',
			} );
			await expect( filledCartAudioButton ).not.toBeVisible();
		} );
	} );
} );
