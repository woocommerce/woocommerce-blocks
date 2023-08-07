/**
 * External dependencies
 */
import { BlockData } from '@woocommerce/e2e-types';
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const blockData: BlockData = {
	name: 'Cart',
	slug: 'woocommerce/cart',
	mainClass: '.wp-block-woocommerce-cart',
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
	const blockSelectorInEditor = blockData.selectors.editor.block;

	test.describe( 'in page editor', () => {
		test.beforeEach( async ( { editorUtils, admin } ) => {
			await admin.visitSiteEditor( {
				postId: 'woocommerce/woocommerce//cart',
				postType: 'wp_template',
			} );
			await editorUtils.enterEditMode();
		} );

		test( 'it renders without crashing', async ( { editorUtils } ) => {
			const blockPresence = await editorUtils.getBlockByName(
				blockData.slug
			);
			expect( blockPresence ).toBeTruthy();
		} );

		test( 'can only be inserted once', async ( { page, editorUtils } ) => {
			await editorUtils.openGlobalBlockInserter();
			await page.getByPlaceholder( 'Search' ).fill( blockData.slug );
			const cartBlockButton = await page.locator( 'button', {
				has: page.locator( `text="${ blockData.name }"` ),
			} );
			await expect( cartBlockButton ).toHaveAttribute(
				'aria-disabled',
				'true'
			);
		} );

		test( 'inner blocks can be added/removed by filters', async ( {
			page,
			editor,
			editorUtils,
		} ) => {
			// Begin by removing the block.
			await editor.selectBlocks( blockSelectorInEditor );
			const options = await page
				.getByRole( 'toolbar', { name: 'Block tools' } )
				.getByRole( 'button', { name: 'Options' } );
			await options.click();
			const removeButton = await page.getByText( 'Remove Cart' );
			await removeButton.click();
			// Expect block to have been removed.
			await expect(
				await editorUtils.getBlockByName( blockData.slug )
			).toHaveCount( 0 );

			// Register a checkout filter to allow `core/table` block in the Checkout block's inner blocks, add
			// core/audio into the woocommerce/cart-order-summary-block and remove core/paragraph from all Cart inner
			// blocks.
			await page.evaluate(
				`wc.blocksCheckout.registerCheckoutFilters( 'woo-test-namespace', {
					additionalCartCheckoutInnerBlockTypes: ( value, extensions, { block } ) => {
						value.push( 'core/table' );
						if ( block === 'woocommerce/cart-order-summary-block' ) {
							value.push( 'core/audio' );
						}
						return value;
					},
				} );`
			);

			await editor.insertBlock( { name: 'woocommerce/cart' } );
			await expect(
				await editorUtils.getBlockByName( blockData.slug )
			).not.toHaveCount( 0 );

			// Select the cart-order-summary-block block and try to insert a block. Check the Table block is available.
			await editor.selectBlocks(
				blockData.selectors.editor.block +
					' [data-type="woocommerce/cart-order-summary-block"]'
			);

			const addBlockButton = await editor.canvas
				.getByRole( 'document', { name: 'Block: Order Summary' } )
				.getByRole( 'button', { name: 'Add block' } );
			await addBlockButton.dispatchEvent( 'click' );
			await editor.page
				.getByLabel( 'Search for blocks and patterns' )
				.fill( 'Table' );
			const tableButton = await editor.page.getByRole( 'option', {
				name: 'Table',
			} );
			await expect( tableButton ).toBeVisible();

			await editor.page
				.getByLabel( 'Search for blocks and patterns' )
				.fill( 'Audio' );

			const audioButton = await editor.page.getByRole( 'option', {
				name: 'Audio',
			} );
			await test.expect( audioButton ).toBeVisible();

			// Now check the filled cart block and expect only the Table block to be available there.
			await editor.selectBlocks(
				blockSelectorInEditor +
					' [data-type="woocommerce/filled-cart-block"]'
			);
			const filledCartAddBlockButton = await editor.canvas
				.getByRole( 'document', { name: 'Block: Filled Cart' } )
				.getByRole( 'button', { name: 'Add block' } )
				.first();
			await filledCartAddBlockButton.click();

			const filledCartTableButton = await editor.page.getByRole(
				'option',
				{
					name: 'Table',
				}
			);
			await expect( filledCartTableButton ).toBeVisible();

			const filledCartAudioButton = await editor.page.getByRole(
				'option',
				{
					name: 'Audio',
				}
			);
			await expect( filledCartAudioButton ).toBeHidden();
		} );

		test.only( 'shows empty cart when changing the view', async ( {
			page,
			editor,
			editorUtils,
		} ) => {
			await editor.selectBlocks( blockSelectorInEditor );
			await editor.page
				.getByRole( 'button', { name: 'Switch view' } )
				.click();
			const emptyCartButton = await page.getByRole( 'menuitem', {
				name: 'Empty Cart',
			} );

			// Focus the empty cart button and wait for the tooltip to disappear.
			await emptyCartButton.focus();
			await emptyCartButton.dispatchEvent( 'click' );

			const filledCartBlock = await editorUtils.getBlockByName(
				'woocommerce/filled-cart-block'
			);
			const emptyCartBlock = await editorUtils.getBlockByName(
				'woocommerce/empty-cart-block'
			);
			await expect( filledCartBlock ).toBeHidden();
			await expect( emptyCartBlock ).toBeVisible();
			await editor.selectBlocks( blockSelectorInEditor );
			await page.getByRole( 'button', { name: 'Switch view' } ).click();

			const filledCartButton = await page.getByRole( 'menuitem', {
				name: 'Filled Cart',
			} );

			await filledCartButton.click();
			await expect(
				editor.canvas.locator(
					blockData.selectors.editor.block +
						' [data-type="woocommerce/filled-cart-block"]'
				)
			).toBeVisible();
			await expect(
				editor.canvas.locator(
					blockData.selectors.editor.block +
						' [data-type="woocommerce/empty-cart-block"]'
				)
			).toBeHidden();
		} );
	} );
} );
