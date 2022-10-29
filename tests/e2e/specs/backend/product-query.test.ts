/**
 * External dependencies
 */
import {
	getAllBlocks,
	switchUserToAdmin,
	canvas,
	openDocumentSettingsSidebar,
	openListView,
	setPostContent,
	insertBlock,
} from '@wordpress/e2e-test-utils';
import { visitBlockPage, saveOrPublish } from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import {
	insertBlockDontWaitForInsertClose,
	GUTENBERG_EDITOR_CONTEXT,
	describeOrSkip,
} from '../../utils';
import { shopper } from '../../../utils';

const block = {
	name: 'Product Query',
	slug: 'woocommerce/product-query',
	class: '.wp-block-query',
};

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	`${ block.name } Block`,
	() => {
		beforeAll( async () => {
			await switchUserToAdmin();
			await visitBlockPage( `${ block.name } Block` );
		} );

		it( 'can be inserted more than once', async () => {
			await insertBlockDontWaitForInsertClose( block.name );
			expect( await getAllBlocks() ).toHaveLength( 2 );
		} );

		it( 'renders without crashing', async () => {
			await expect( page ).toRenderBlock( block );
		} );

		it( 'Editor preview shows only on sale products after enabling `Show only products on sale`', async () => {
			await visitBlockPage( `${ block.name } Block` );
			const canvasEl = canvas();
			await openDocumentSettingsSidebar();
			await openListView();
			await page.click(
				'.block-editor-list-view-block__contents-container a.components-button'
			);
			const [ onSaleToggle ] = await page.$x(
				'//label[text()="Show only products on sale"]'
			);
			await onSaleToggle.click();
			await canvasEl.waitForSelector( `${ block.class } > p` );
			await canvasEl.waitForSelector(
				`${ block.class } > ul.wp-block-post-template`
			);
			const products = await canvasEl.$$(
				`${ block.class } ul.wp-block-post-template > li.block-editor-block-preview__live-content`
			);
			expect( products ).toHaveLength( 1 );
		} );

		describe( 'On Sale variation', () => {
			beforeAll( async () => {
				await visitBlockPage( `${ block.name } Block` );
				await setPostContent( '' );
				await insertBlock( 'Products on Sale' );
			} );

			it( 'Show only on sale products', async () => {
				const canvasEl = canvas();
				await canvasEl.waitForSelector(
					`${ block.class } > ul.wp-block-post-template`
				);
				const products = await canvasEl.$$(
					`${ block.class } ul.wp-block-post-template > li.block-editor-block-preview__live-content`
				);
				expect( products ).toHaveLength( 1 );
			} );

			it( 'Does not have on sale toggle', async () => {
				await openDocumentSettingsSidebar();
				await openListView();
				await page.click(
					'.block-editor-list-view-block__contents-container a.components-button'
				);
				await expect( page ).not.toMatchElement(
					'.block-editor-block-inspector',
					{
						text: 'Show only products on sale',
					}
				);
			} );
		} );

		describe( 'Atomic blocks', () => {
			afterAll( async () => {
				await visitBlockPage( `${ block.name } Block` );
				await setPostContent( '' );
				await insertBlock( 'Product Query' );
				await saveOrPublish();
			} );

			it( 'Can add the Add to Cart Button block', async () => {
				await visitBlockPage( `${ block.name } Block` );
				const canvasEl = canvas();
				await canvasEl.waitForSelector(
					`${ block.class } .wp-block-woocommerce-product-image a img`
				);
				const postTitleEl = await canvasEl.$(
					`${ block.class } .wp-block-post-title`
				);
				await postTitleEl.click();
				await insertBlock( 'Add to Cart Button' );
				await expect( canvasEl ).toMatchElement( block.class, {
					text: 'Add to cart',
				} );
				await saveOrPublish();

				await shopper.block.goToBlockPage( block.name );
				await page.waitForSelector(
					'.wp-block-query button.add_to_cart_button'
				);
				await expect( page ).toClick( 'button', {
					text: 'Add to cart',
				} );
				await shopper.block.goToCart();
				await page.waitForSelector( '.wc-block-cart-items__row' );
				expect(
					await page.$$eval(
						'.wc-block-cart-items__row',
						( rows ) => rows.length
					)
				).toEqual( 1 );
			} );

			it( 'Can add the Product Image block', async () => {
				await visitBlockPage( `${ block.name } Block` );
				const canvasEl = canvas();
				await canvasEl.waitForSelector(
					`${ block.class } .wp-block-woocommerce-product-image a img`
				);
				const postTitleEl = await canvasEl.$(
					`${ block.class } .wp-block-post-title`
				);
				await postTitleEl.click();
				await insertBlock( 'Product Image' );
				expect(
					await canvasEl.$$eval(
						`${ block.class } ul.wp-block-post-template > li.block-editor-block-list__layout .wp-block-woocommerce-product-image`,
						( images ) => images.length
					)
				).toEqual( 2 );
			} );
		} );
	}
);
