/**
 * External dependencies
 */
import { BlockData } from '@woocommerce/e2e-types';
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */

const blockData: BlockData = {
	name: 'Related Products',
	slug: 'woocommerce/related-products',
	mainClass: '.wc-block-related-products',
	selectors: {
		frontend: {},
		editor: {},
	},
};

test.describe( `${ blockData.name } Block`, () => {
	test( "can't be added in the Post Editor", async ( { admin, editor } ) => {
		await admin.createNewPost( { legacyCanvas: true } );

		editor.insertBlock( { name: blockData.slug } ).catch( ( e ) => {
			expect( e.message ).toContain( 'is not registered' );
		} );
	} );

	test( "can't be added in the Post Editor - Product Catalog Template", async ( {
		admin,
		editor,
		editorUtils,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `woocommerce/woocommerce//archive-product`,
			postType: 'wp_template',
		} );
		await editorUtils.enterEditMode();

		await editor.insertBlock( { name: blockData.slug } );

		editor.insertBlock( { name: blockData.slug } ).catch( ( e ) => {
			expect( e.message ).toContain( 'is not registered' );
		} );
	} );

	test( 'can be added in the Post Editor - Single Product Template', async ( {
		admin,
		editor,
		editorUtils,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `woocommerce/woocommerce//single-product`,
			postType: 'wp_template',
		} );
		await editorUtils.enterEditMode();

		await editor.setContent( '' );

		await editor.insertBlock( { name: blockData.slug } );

		await expect(
			await editorUtils.getBlockByName( blockData.slug )
		).toBeVisible();
	} );
} );
