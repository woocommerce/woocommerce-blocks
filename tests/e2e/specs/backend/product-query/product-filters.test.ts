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

/**
 * Selectors used for interacting with the block in the editor. These selectors
 * can be changed upstream in Gutenberg, so we scope them here for
 * maintainability.
 *
 * There are also some labels that are used repeatedly, but we don't scope them
 * in favor of readability. Unlike selectors, those label are visible to end
 * users, so it's easier to understand what's going on if we don't scope them.
 * Those labels can get upated in the future, but the tests will fail and we'll
 * know to update them.
 */
const SELECTORS = {
	productFiltersDropdownButton: {
		default:
			'.components-tools-panel-header .components-dropdown-menu button[aria-expanded="false"]',
		expanded:
			'.components-tools-panel-header .components-dropdown-menu button[aria-expanded="true"]',
	},
	productFiltersDropdown:
		'.components-dropdown-menu__menu[aria-label="Product filters options"]',
	productFiltersDropdownItem: '.components-menu-item__button',
};

const toggleProductFilter = async ( filterName: string ) => {
	const productFiltersPanel = await findToolsPanelWithTitle(
		'Product filters'
	);
	await expect( productFiltersPanel ).toClick(
		SELECTORS.productFiltersDropdownButton.default
	);
	await canvas().waitForSelector( SELECTORS.productFiltersDropdown );
	await expect( canvas() ).toClick( SELECTORS.productFiltersDropdownItem, {
		text: filterName,
	} );
	await expect( productFiltersPanel ).toClick(
		SELECTORS.productFiltersDropdownButton.expanded
	);
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
		let productFiltersPanel: ElementHandle< Node > | null;
		beforeEach( async () => {
			/**
			 * Reset the block page before each test to ensure the block is
			 * inserted in a known state. This is also needed to ensure each
			 * test can be run individually.
			 */
			await resetProductQueryBlockPage();
			await openBlockEditorSettings( { isFSEEditor: false } );
			await selectBlockByName( block.slug );
			productFiltersPanel = await findToolsPanelWithTitle(
				'Product filters'
			);
		} );

		/**
		 * Reset the content of Product Query Block page after this test suite
		 * to avoid breaking other tests.
		 */
		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		describe( 'Sale Status', () => {
			it( 'Sale status is disabled by default', async () => {
				await expect( productFiltersPanel ).not.toMatch(
					'Show only products on sale'
				);
			} );

			it( 'Can add and remove Sale Status filter', async () => {
				await toggleProductFilter( 'Sale status' );
				await expect( productFiltersPanel ).toMatch(
					'Show only products on sale'
				);
				await toggleProductFilter( 'Sale status' );
				await expect( productFiltersPanel ).not.toMatch(
					'Show only products on sale'
				);
			} );
		} );
	}
);
