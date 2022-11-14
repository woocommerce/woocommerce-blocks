/**
 * External dependencies
 */
import { canvas, setPostContent, insertBlock } from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	saveOrPublish,
	selectBlockByName,
	findToolsPanelWithTitle,
} from '@woocommerce/blocks-test-utils';

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
	productFiltersDropdownButton:
		'.components-tools-panel-header .components-dropdown-menu button',
	productFiltersDropdown:
		'.components-dropdown-menu__menu[aria-label="Product filters options"]',
	productFiltersDropdownItem: '.components-menu-item__button',
};

const addProductFilter = async ( filterName: string ) => {
	const productFiltersPanel = await findToolsPanelWithTitle(
		'Product filters'
	);
	const button = await productFiltersPanel.$(
		SELECTORS.productFiltersDropdownButton
	);
	await button.click();
	await canvas().waitForSelector( SELECTORS.productFiltersDropdown );
	await expect( canvas() ).toClick( SELECTORS.productFiltersDropdownItem, {
		text: filterName,
	} );
};

const resetProductQueryBlockPage = async () => {
	await visitBlockPage( `${ block.name } Block` );
	await waitForCanvas();
	await setPostContent( '' );
	await insertBlock( block.name );
	await saveOrPublish();
};

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	'Product Query > Products Filters',
	() => {
		beforeEach( async () => {
			await visitBlockPage( `${ block.name } Block` );
			await waitForCanvas();
			await openBlockEditorSettings( { isFSEEditor: false } );
			await selectBlockByName( block.slug );
		} );

		/**
		 * Reset the content of Product Query Block page before and after this
		 * test suite to avoide breaking other tests.
		 */
		beforeAll( async () => {
			await resetProductQueryBlockPage();
		} );
		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		describe( 'Sale Status', () => {
			it( 'Sale status is disabled by default', async () => {
				const productFiltersPanel = await findToolsPanelWithTitle(
					'Product filters'
				);
				await expect( productFiltersPanel ).not.toMatch(
					'Show only products on sale'
				);
			} );

			it( 'Can add Sale Status filter', async () => {
				await addProductFilter( 'Sale status' );
				const productFiltersPanel = await findToolsPanelWithTitle(
					'Product filters'
				);
				await expect( productFiltersPanel ).toMatch(
					'Show only products on sale'
				);
			} );
		} );
	}
);
