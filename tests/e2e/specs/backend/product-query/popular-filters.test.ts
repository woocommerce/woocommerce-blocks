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
	findToolsPanelWithTitle,
	getFixtureProductsData,
	getFormElementIdByLabel,
	shopper,
	getToggleIdByLabel,
} from '@woocommerce/blocks-test-utils';
import { ElementHandle } from 'puppeteer';
import { setCheckbox, unsetCheckbox } from '@woocommerce/e2e-utils';

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
	productFiltersDropdownButton: (
		{ expanded }: { expanded: boolean } = { expanded: false }
	) =>
		`.components-tools-panel-header .components-dropdown-menu button[aria-expanded="${ expanded }"]`,
	productFiltersDropdown:
		'.components-dropdown-menu__menu[aria-label="Product filters options"]',
	productFiltersDropdownItem: '.components-menu-item__button',
	editorPreview: {
		productsGrid: 'ul.wp-block-post-template',
		productsGridItem:
			'ul.wp-block-post-template > li.block-editor-block-preview__live-content',
	},
	productsGrid: `${ block.class } ul.wp-block-post-template`,
	productsGridItem: `${ block.class } ul.wp-block-post-template > li.product`,
	formTokenFieldLabel: '.components-form-token-field__label',
	tokenRemoveButton: '.components-form-token-field__remove-token',
};

const toggleProductFilter = async ( filterName: string ) => {
	const $productFiltersPanel = await findToolsPanelWithTitle(
		'Product filters'
	);
	await expect( $productFiltersPanel ).toClick(
		SELECTORS.productFiltersDropdownButton()
	);
	await canvas().waitForSelector( SELECTORS.productFiltersDropdown );
	await expect( canvas() ).toClick( SELECTORS.productFiltersDropdownItem, {
		text: filterName,
	} );
	await expect( $productFiltersPanel ).toClick(
		SELECTORS.productFiltersDropdownButton( { expanded: true } )
	);
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

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	'Product Query > Popular Filters',
	() => {
		beforeEach( async () => {
			/**
			 * Reset the block page before each test to ensure the block is
			 * inserted in a known state. This is also needed to ensure each
			 * test can be run individually.
			 */
			await resetProductQueryBlockPage();
			await openBlockEditorSettings();
			await selectBlockByName( block.slug );
		} );

		/**
		 * Reset the content of Product Query Block page after this test suite
		 * to avoid breaking other tests.
		 */
		afterAll( async () => {
			await resetProductQueryBlockPage();
		} );

		it( 'Popular Filters is expanded by default', async () => {
			const $productFiltersPanel = await findSidebarPanelWithTitle(
				'Popular Filters'
			);
			await expect( $productFiltersPanel ).toMatch(
				'Arrange products by popular pre-sets.'
			);
		} );

		it( 'Newest ', async () => {
			const $productFiltersPanel = await findSidebarPanelWithTitle(
				'Popular Filters'
			);
			await expect( $productFiltersPanel ).toMatch(
				'Arrange products by popular pre-sets.'
			);
		} );
	}
);
