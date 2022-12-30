/**
 * External dependencies
 */
import { ElementHandle } from 'puppeteer';

/**
 * Internal dependencies
 */
import { GUTENBERG_EDITOR_CONTEXT, describeOrSkip } from '../../../utils';
import {
	resetProductQueryBlockPage,
	setupProductQueryShortcodeComparison,
	setupEditorFrontendComparison,
	selectPopularFilter,
	getPopularFilterPanel,
	getCurrentPopularFilter,
} from './common';

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
			$popularFiltersPanel = await getPopularFilterPanel();
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

		describe( 'Sorted by title', () => {
			it( 'Is the default preset', async () => {
				const currentFilter = await getCurrentPopularFilter(
					$popularFiltersPanel
				);
				expect( currentFilter ).toEqual( 'Sorted by title' );
			} );

			it( 'Editor preview and block frontend display the same products', async () => {
				const { previewProducts, frontEndProducts } =
					await setupEditorFrontendComparison();
				expect( frontEndProducts ).toEqual( previewProducts );
			} );

			it( 'Products are displayed in the correct order', async () => {
				const { productQueryProducts, shortcodeProducts } =
					await setupProductQueryShortcodeComparison(
						'[products orderby="title" order="ASC" limit="9"]'
					);
				expect( productQueryProducts ).toEqual( shortcodeProducts );
			} );
		} );

		describe( 'Newest', () => {
			beforeEach( async () => {
				await selectPopularFilter( 'Newest' );
			} );
			it( 'Editor preview and block frontend display the same products', async () => {
				const { previewProducts, frontEndProducts } =
					await setupEditorFrontendComparison();
				expect( frontEndProducts ).toEqual( previewProducts );
			} );

			it( 'Products are displayed in the correct order', async () => {
				const { productQueryProducts, shortcodeProducts } =
					await setupProductQueryShortcodeComparison(
						'[products orderby="date" order="DESC" limit="9"]'
					);
				expect( productQueryProducts ).toEqual( shortcodeProducts );
			} );
		} );

		describe( 'Best Selling', () => {
			beforeEach( async () => {
				await selectPopularFilter( 'Best Selling' );
			} );
			it( 'Editor preview and block frontend display the same products', async () => {
				const { previewProducts, frontEndProducts } =
					await setupEditorFrontendComparison();
				expect( frontEndProducts ).toEqual( previewProducts );
			} );

			it( 'Products are displayed in the correct order', async () => {
				const { productQueryProducts, shortcodeProducts } =
					await setupProductQueryShortcodeComparison(
						'[products best_selling="true" limit="9"]'
					);
				expect( productQueryProducts ).toEqual( shortcodeProducts );
			} );
		} );

		describe( 'Top Rated', () => {
			beforeEach( async () => {
				await selectPopularFilter( 'Top Rated' );
			} );
			it( 'Editor preview and block frontend display the same products', async () => {
				const { previewProducts, frontEndProducts } =
					await setupEditorFrontendComparison();
				expect( frontEndProducts ).toEqual( previewProducts );
			} );

			it( 'Products are displayed in the correct order', async () => {
				const { productQueryProducts, shortcodeProducts } =
					await setupProductQueryShortcodeComparison(
						'[products top_rated="true" limit="9"]'
					);
				expect( productQueryProducts ).toEqual( shortcodeProducts );
			} );
		} );
	}
);
