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
} from '@woocommerce/blocks-test-utils';
import { ElementHandle } from 'puppeteer';

/**
 * Internal dependencies
 */
import { waitForCanvas } from '../../../utils';

export const block = {
	name: 'Product Query',
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
	productButton: '.wc-block-components-product-button',
	productPrice: '.wc-block-components-product-price',
	productRating: '.wc-block-components-product-rating',
	productImage: {
		editor: 'li.block-editor-block-list__layout .wc-block-components-product-image',
	},
};

export const resetProductQueryBlockPage = async ( variation = '' ) => {
	await visitBlockPage( `${ block.name } Block` );
	await waitForCanvas();
	await setPostContent( '' );
	await insertBlock( variation || block.name );
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

export const toggleProductFilter = async ( filterName: string ) => {
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
