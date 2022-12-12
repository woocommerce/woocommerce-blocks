/**
 * We choose to name this file as common instead of splitting it to multiple
 * files like constants.ts and utils.ts because we want to keep the file
 * structure as simple as possible. We also want to distinguish the local
 * utilities like resetProductQueryBlockPage with our e2e utilites in
 * `@woocommerce/blocks-test-utils`. We think exporting local utilites from
 * a different file name is an simple but effective way to achieve that goal.
 */

/**
 * External dependencies
 */
import { canvas, setPostContent, insertBlock } from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	saveOrPublish,
	findToolsPanelWithTitle,
	getFormElementIdByLabel,
} from '@woocommerce/blocks-test-utils';
import { ElementHandle } from 'puppeteer';

/**
 * Internal dependencies
 */
import { waitForCanvas } from '../../../utils';

export const block = {
	name: 'Products (Beta)',
	slug: 'core/query',
	class: '.wp-block-query',
};

/**
 * Selectors used for interacting with the blocks. These selectors can be
 * changed upstream in Gutenberg, so we scope them here for maintainability.
 *
 * There are also some labels that are used repeatedly, but we don't scope them
 * in favor of readability. Unlike selectors, those label are visible to end
 * users, so it's easier to understand what's going on if we don't scope them.
 * Those labels can get upated in the future, but the tests will fail and we'll
 * know to update them, again the update process is easier than selector as the
 * label is visible to end users.
 */
export const SELECTORS = {
	advancedFiltersDropdownButton: (
		{ expanded }: { expanded: boolean } = { expanded: false }
	) =>
		`.components-tools-panel-header .components-dropdown-menu button[aria-expanded="${ expanded }"]`,
	advancedFiltersDropdown:
		'.components-dropdown-menu__menu[aria-label="Advanced Filters options"]',
	advancedFiltersDropdownItem: '.components-menu-item__button',
	productsGrid: `${ block.class } ul.wp-block-post-template`,
	productsGridItem: `${ block.class } ul.wp-block-post-template > li`,
	formTokenField: {
		label: '.components-form-token-field__label',
		removeToken: '.components-form-token-field__remove-token',
		suggestionsList: '.components-form-token-field__suggestions-list',
		firstSuggestion:
			'.components-form-token-field__suggestions-list > li:first-child',
	},
	productButton: '.wc-block-components-product-button',
	productPrice: '.wc-block-components-product-price',
	productRating: '.wc-block-components-product-rating',
	productImage: '.wc-block-components-product-image',
	cartItemRow: '.wc-block-cart-items__row',
};

export const resetProductQueryBlockPage = async ( variation = '' ) => {
	await visitBlockPage( `${ block.name } Block` );
	await waitForCanvas();
	await setPostContent( '' );
	await insertBlock( variation || block.name );
	await canvas().waitForSelector( SELECTORS.productsGridItem );
	// Wait until all product elements finish loading.
	await canvas().waitForFunction(
		( wrapperClass: string ) =>
			document.querySelectorAll( `${ wrapperClass } .is-loading` )
				.length === 0,
		{},
		block.class
	);
	await saveOrPublish();
};

export const getPreviewProducts = async (): Promise< ElementHandle[] > => {
	await canvas().waitForSelector( SELECTORS.productsGrid );
	return await canvas().$$(
		`${ SELECTORS.productsGridItem }.block-editor-block-preview__live-content`
	);
};

export const getFrontEndProducts = async (): Promise< ElementHandle[] > => {
	await canvas().waitForSelector( SELECTORS.productsGrid );
	return await canvas().$$( SELECTORS.productsGridItem );
};

export const toggleAdvancedFilter = async ( filterName: string ) => {
	const $advancedFiltersPanel = await findToolsPanelWithTitle(
		'Advanced Filters'
	);
	await expect( $advancedFiltersPanel ).toClick(
		SELECTORS.advancedFiltersDropdownButton()
	);
	await canvas().waitForSelector( SELECTORS.advancedFiltersDropdown );
	await expect( canvas() ).toClick( SELECTORS.advancedFiltersDropdownItem, {
		text: filterName,
	} );
	await expect( $advancedFiltersPanel ).toClick(
		SELECTORS.advancedFiltersDropdownButton( { expanded: true } )
	);
};

export const clearSelectedTokens = async ( $panel: ElementHandle< Node > ) => {
	const tokenRemoveButtons = await $panel.$$(
		SELECTORS.formTokenField.removeToken
	);
	for ( const el of tokenRemoveButtons ) {
		await el.click();
	}
};

export const selectToken = async ( formLabel: string, optionLabel: string ) => {
	const $stockStatusInput = await canvas().$(
		await getFormElementIdByLabel(
			formLabel,
			SELECTORS.formTokenField.label.replace( '.', '' )
		)
	);
	await $stockStatusInput.focus();
	await canvas().keyboard.type( optionLabel );
	const firstSuggestion = await canvas().waitForSelector(
		SELECTORS.formTokenField.firstSuggestion
	);
	await firstSuggestion.click();
	await canvas().waitForSelector( SELECTORS.productsGrid );
};

export const getProductElementNodesCount = async ( selector: string ) => {
	return await page.$$eval( selector, ( elements ) => elements.length );
};

export const getEditorProductElementNodesCount = async ( selector: string ) => {
	return await getProductElementNodesCount(
		`li.block-editor-block-list__layout ${ selector }`
	);
};
