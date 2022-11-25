/**
 * External dependencies
 */
import {
	canvas,
	setPostContent,
	insertBlock,
	findSidebarPanelWithTitle,
} from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	saveOrPublish,
	selectBlockByName,
	getFormElementIdByLabel,
	shopper,
} from '@woocommerce/blocks-test-utils';
import { ElementHandle } from 'puppeteer';

/**
 * Internal dependencies
 */
import {
	GUTENBERG_EDITOR_CONTEXT,
	describeOrSkip,
	waitForCanvas,
	openBlockEditorSettings,
} from '../../../utils';

const block = {
	name: 'Product Query',
	slug: 'core/query',
	class: '.wp-block-query',
};

const SELECTORS = {
	editorPreview: {
		productsGrid: 'ul.wp-block-post-template',
		productsGridItem:
			'ul.wp-block-post-template > li.block-editor-block-preview__live-content',
	},
	productsGrid: `${ block.class } ul.wp-block-post-template`,
	productsGridItem: `${ block.class } ul.wp-block-post-template > li.product`,
};

const resetProductQueryBlockPage = async () => {
	await visitBlockPage( `${ block.name } Block` );
	await waitForCanvas();
	await setPostContent( '' );
	await insertBlock( block.name );
	await saveOrPublish();
};

const getPreviewProducts = async (): Promise< ElementHandle[] > => {
	await canvas().waitForSelector( SELECTORS.editorPreview.productsGrid );
	return await canvas().$$( SELECTORS.editorPreview.productsGridItem );
};

const getFrontEndProducts = async (): Promise< ElementHandle[] > => {
	await canvas().waitForSelector( SELECTORS.productsGrid );
	return await canvas().$$( SELECTORS.productsGridItem );
};

const getProductTitle = async ( product: ElementHandle ): Promise< string > => {
	return (
		( await product.$eval(
			'.wp-block-post-title',
			( el ) => el.textContent
		) ) || ''
	);
};

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	'Product Query > Popular Filters',
	() => {
		let $popularFiltersPanel: ElementHandle< Node >;
		beforeEach( async () => {
			/**
			 * Reset the block page before each test to ensure the block is
			 * inserted in a known state. This is also needed to ensure each
			 * test can be run individually.
			 */
			await resetProductQueryBlockPage();
			await openBlockEditorSettings();
			await selectBlockByName( block.slug );
			$popularFiltersPanel = await findSidebarPanelWithTitle(
				'Popular Filters'
			);
		} );

		/**
		 * Reset the content of Product Query Block page after this test suite
		 * to avoid breaking other tests.
		 */
		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		it( 'Popular Filters is expanded by default', async () => {
			await expect( $popularFiltersPanel ).toMatch(
				'Arrange products by popular pre-sets.'
			);
		} );

		describe( 'Newest', () => {
			it( 'Newest is the default preset', async () => {
				await expect( $popularFiltersPanel ).toMatchElement(
					await getFormElementIdByLabel(
						'Choose among these pre-sets',
						'components-visually-hidden'
					),
					{ text: 'Newest' }
				);
			} );

			it( 'Editor preview and block frontend display the same products', async () => {
				const previewProductsTitle = await Promise.all(
					(
						await getPreviewProducts()
					 ).map(
						async ( product ) => await getProductTitle( product )
					)
				);
				await shopper.block.goToBlockPage( block.name );
				await canvas().waitForSelector( SELECTORS.productsGrid );
				const frontEndProductsTitle = await Promise.all(
					(
						await getFrontEndProducts()
					 ).map(
						async ( product ) => await getProductTitle( product )
					)
				);
				expect( frontEndProductsTitle ).toEqual( previewProductsTitle );
			} );
		} );
	}
);
