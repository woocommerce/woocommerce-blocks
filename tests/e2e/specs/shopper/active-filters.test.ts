/**
 * External dependencies
 */
import {
	insertBlock,
	deleteAllTemplates,
	canvas,
	createNewPost,
	switchUserToAdmin,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { SHOP_PAGE } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import {
	goToTemplateEditor,
	useTheme,
	saveTemplate,
	clickLink,
} from '../../utils';
import { shopper } from '../../../utils';
import { Frame, Page } from 'puppeteer';

const block = {
	name: 'Active Product Filters',
	slug: 'woocommerce/active-filters',
	class: '.wp-block-woocommerce-active-filters',
	selectors: {
		editor: {
			firstAttributeInTheList:
				'.woocommerce-search-list__list > li > label > input.woocommerce-search-list__item-input',
			filterButtonToggle: "//label[text()='Filter button']",
			doneButton: '.wc-block-attribute-filter__selection > button',
		},
		frontend: {
			activeFilterType: '.wc-block-active-filters__list-item-type',
			activeFilterName: '.wc-block-active-filters__list-item-name',
			removeFilterButton: '.wc-block-active-filters__list-item-remove',
			removeAllFiltersButton: '.wc-block-active-filters__clear-all',
			stockFilterBlock: '.wc-block-stock-filter-list',
			attributeFilterBlock: '.wc-block-attribute-filter-list',
			productsList: '.wc-block-grid__products > li',
			classicProductsList: '.products.columns-3 > li',
		},
	},
	foundProduct: '128GB USB Stick',
};

const { selectors } = block;

const insertBlocks = async () => {
	await insertBlock( block.name );
	await insertBlock( 'Filter Products by Price' );
	await insertBlock( 'Filter Products by Stock' );
	await insertBlock( 'Filter Products by Attribute' );
};

const configurateFilterProductsByAttributeBlock = async (
	pageOrCanvas: Page | Frame
) => {
	await pageOrCanvas.click( selectors.editor.firstAttributeInTheList );
	await pageOrCanvas.click( selectors.editor.doneButton );
};

describe( 'Shopper → Active Filters Block', () => {
	describe( 'With All Products block', () => {
		beforeAll( async () => {
			await switchUserToAdmin();
			await createNewPost( {
				postType: 'post',
				title: block.name,
			} );

			await insertBlocks();
			await configurateFilterProductsByAttributeBlock( page );
			await insertBlock( 'All Products' );
			await publishPost();

			const link = await page.evaluate( () =>
				wp.data.select( 'core/editor' ).getPermalink()
			);
			await page.goto( link );
		} );

		beforeEach( async () => {
			await page.reload();
		} );

		it( 'Active Filters is hidden if there is no filter selected', async () => {
			expect( page ).not.toMatch( 'Active Filters' );
		} );

		it( 'Shows selected filters', async () => {
			const isRefreshed = jest.fn( () => void 0 );

			await page.waitForSelector( block.class );
			await page.waitForSelector(
				selectors.frontend.attributeFilterBlock + '.is-loading',
				{ hidden: true }
			);

			await page.waitForSelector( selectors.frontend.stockFilterBlock );

			await expect( page ).toClick( 'label', {
				text: '128gb',
			} );

			await expect( page ).toMatchElement(
				selectors.frontend.activeFilterType,
				{
					text: 'Capacity',
				}
			);

			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await page.waitForSelector( block.class );

			await expect( page ).toMatchElement(
				selectors.frontend.activeFilterType,
				{
					text: 'Stock Status',
				}
			);

			await expect( page ).toMatchElement(
				selectors.frontend.activeFilterName,
				{
					text: 'In stock',
				}
			);

			await page.waitForSelector(
				selectors.frontend.productsList + '.is-loading',
				{ hidden: true }
			);

			const products = await page.$$( selectors.frontend.productsList );
			expect( products ).toHaveLength( 1 );
			expect( isRefreshed ).not.toHaveBeenCalled();
			await expect( page ).toMatch( block.foundProduct );
		} );

		fit( 'When clicking the X on a filter it removes a filter', async () => {
			const isRefreshed = jest.fn( () => void 0 );
			await page.waitForSelector( block.class );
			await page.waitForSelector(
				selectors.frontend.attributeFilterBlock + '.is-loading',
				{
					hidden: true,
				}
			);

			await expect( page ).toClick( 'label', {
				text: '128gb',
			} );

			await expect( page ).toClick(
				selectors.frontend.removeFilterButton
			);

			expect( page ).not.toMatch( 'Active Filters' );

			await page.waitForSelector(
				selectors.frontend.productsList + '.is-loading',
				{ hidden: true }
			);

			const products = await page.$$( selectors.frontend.productsList );
			expect( products ).toHaveLength( 5 );
			expect( isRefreshed ).not.toHaveBeenCalled();
		} );

		it( 'Clicking "Clear All" button removes all active filter', async () => {
			const isRefreshed = jest.fn( () => void 0 );
			await page.waitForSelector( block.class );
			await page.waitForSelector(
				selectors.frontend.attributeFilterBlock + '.is-loading',
				{ hidden: true }
			);
			await page.waitForSelector( selectors.frontend.stockFilterBlock );

			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await expect( page ).toClick( 'label', {
				text: '128gb',
			} );

			await expect( page ).toMatchElement(
				selectors.frontend.removeAllFiltersButton,
				{
					text: 'Clear All',
				}
			);

			await page.click( selectors.frontend.removeAllFiltersButton );

			await page.waitForSelector(
				selectors.frontend.productsList + '.is-loading',
				{ hidden: true }
			);

			const products = await page.$$( selectors.frontend.productsList );

			expect( products ).toHaveLength( 5 );
			expect( isRefreshed ).not.toHaveBeenCalled();
		} );
	} );
	describe( 'With PHP Templates', () => {
		useTheme( 'emptytheme' );
		beforeAll( async () => {
			await deleteAllTemplates( 'wp_template_part' );
			await deleteAllTemplates( 'wp_template' );
			await goToTemplateEditor( {
				postId: 'woocommerce/woocommerce//archive-product',
			} );

			await insertBlocks();

			const canvasEl = canvas();
			await configurateFilterProductsByAttributeBlock( canvasEl );
			await saveTemplate();
		} );

		beforeEach( async () => {
			await shopper.goToShop();
		} );

		afterAll( async () => {
			await deleteAllTemplates( 'wp_template' );
			await deleteAllTemplates( 'wp_template_part' );
		} );

		it( 'Active Filters is hidden if there is no filter selected', async () => {
			expect( page ).not.toMatch( 'Active Filters' );
		} );

		it( 'Shows selected filters', async () => {
			const isRefreshed = jest.fn( () => void 0 );
			page.on( 'load', isRefreshed );
			await page.waitForSelector( block.class );
			await page.waitForSelector(
				selectors.frontend.attributeFilterBlock + '.is-loading',
				{ hidden: true }
			);

			await expect( page ).toClick( 'label', {
				text: '128gb',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector( block.class );

			await expect( page ).toMatchElement(
				selectors.frontend.activeFilterType,
				{
					text: 'Capacity',
				}
			);

			await page.waitForSelector( selectors.frontend.stockFilterBlock );

			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector( block.class );

			await expect( page ).toMatchElement(
				selectors.frontend.activeFilterType,
				{
					text: 'Stock Status',
				}
			);

			await expect( page ).toMatchElement(
				selectors.frontend.activeFilterName,
				{
					text: 'In stock',
				}
			);

			const products = await page.$$(
				selectors.frontend.classicProductsList
			);

			expect( isRefreshed ).toHaveBeenCalledTimes( 2 );
			expect( products ).toHaveLength( 1 );
			await expect( page ).toMatch( block.foundProduct );
		} );

		it( 'When clicking the X on a filter it removes a filter and triggers a page refresh', async () => {
			const isRefreshed = jest.fn( () => void 0 );
			page.on( 'load', isRefreshed );
			await page.waitForSelector( selectors.frontend.stockFilterBlock );

			expect( isRefreshed ).not.toHaveBeenCalled();
			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector( block.class );

			await expect( page ).toClick( 'label', {
				text: '128gb',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector( block.class );

			await expect( page ).toMatchElement(
				selectors.frontend.activeFilterType,
				{
					text: 'Capacity',
				}
			);

			await clickLink( selectors.frontend.removeFilterButton );

			const products = await page.$$(
				selectors.frontend.classicProductsList
			);

			expect( page.url() ).not.toMatch( 'instock' );
			expect( page.url() ).toMatch( '128gb' );
			expect( isRefreshed ).toHaveBeenCalledTimes( 3 );
			expect( products ).toHaveLength( 1 );
			await expect( page ).toMatch( block.foundProduct );
		} );

		it( 'Clicking "Clear All" button removes all active filter and the page redirects to the base URL', async () => {
			const isRefreshed = jest.fn( () => void 0 );
			page.on( 'load', isRefreshed );
			await page.waitForSelector( selectors.frontend.stockFilterBlock );

			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector( block.class );

			await expect( page ).toMatchElement(
				selectors.frontend.removeAllFiltersButton,
				{
					text: 'Clear All',
				}
			);

			await clickLink( selectors.frontend.removeAllFiltersButton );

			const products = await page.$$(
				selectors.frontend.classicProductsList
			);

			expect( page.url() ).not.toMatch( 'instock' );
			expect( page.url() ).toMatch( SHOP_PAGE );
			expect( isRefreshed ).toHaveBeenCalledTimes( 2 );
			expect( products ).toHaveLength( 5 );
		} );
	} );
} );
