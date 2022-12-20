/**
 * External dependencies
 */
import {
	canvas,
	setPostContent,
	insertBlock,
	ensureSidebarOpened,
} from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	saveOrPublish,
	findToolsPanelWithTitle,
	getToggleIdByLabel,
	selectBlockByName,
} from '@woocommerce/blocks-test-utils';
import { ElementHandle } from 'puppeteer';
import { setCheckbox } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { waitForCanvas } from '../../utils';

export const block = {
	name: 'Products (Beta)',
	slug: 'woocommerce/product-query',
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
		'.components-dropdown-menu__menu[aria-label="Advanced Filters options"]',
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
	inheritQueryFromTemplateSetting:
		"//label[text()='Inherit query from template']",
	classicProductsListName: '.woocommerce-loop-product__title',
	productQueryProductsListName: '.wp-block-query .wp-block-post-title',
};

export const toggleProductFilter = async ( filterName: string ) => {
	const $productFiltersPanel = await findToolsPanelWithTitle(
		'Advanced Filters'
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

export const resetProductQueryBlockPage = async () => {
	await visitBlockPage( `${ block.name } Block` );
	await waitForCanvas();
	await setPostContent( '' );
	await insertBlock( block.name );
	await saveOrPublish();
};

export const getPreviewProducts = async (): Promise< ElementHandle[] > => {
	await canvas().waitForSelector( SELECTORS.editorPreview.productsGrid );
	return await canvas().$$( SELECTORS.editorPreview.productsGridItem );
};

export const getFrontEndProducts = async (): Promise< ElementHandle[] > => {
	await canvas().waitForSelector( SELECTORS.productsGrid );
	return await canvas().$$( SELECTORS.productsGridItem );
};

export const addProductQueryBlock = async () => {
	await insertBlock( block.name );
	await page.waitForNetworkIdle();
};

export const toggleInheritQueryFromTemplateSetting = async () => {
	await setCheckbox(
		await getToggleIdByLabel( 'Inherit query from template' )
	);
};

export const configurateProductQueryBlock = async () => {
	await ensureSidebarOpened();
	await toggleInheritQueryFromTemplateSetting();
};

export const getProductsNameFromClassicTemplate = async () => {
	const products = await page.$$( SELECTORS.classicProductsListName );
	return Promise.all(
		products.map( ( el ) =>
			page.evaluate( ( node ) => node.textContent, el )
		)
	);
};

export const getProductsNameFromProductQuery = async () => {
	const products = await page.$$( SELECTORS.productQueryProductsListName );

	return Promise.all(
		products.map( ( el ) =>
			page.evaluate( ( element ) => element.textContent, el )
		)
	);
};
