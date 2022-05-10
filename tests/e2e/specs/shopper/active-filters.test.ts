/**
 * External dependencies
 */
import {
	insertBlock,
	deleteAllTemplates,
	canvas,
} from '@wordpress/e2e-test-utils';
import { SHOP_PAGE } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { goToTemplateEditor, useTheme, saveTemplate } from '../../utils';
import { shopper } from '../../../utils';

/**
 * Click a link and wait for the page to load.
 *
 * @param {string} selector The CSS selector of the link to click.
 */
const clickLink = async ( selector ) => {
	await Promise.all( [
		page.click( selector ),
		page.waitForNavigation( { waitUntil: 'networkidle0' } ),
	] );
};

describe( 'Shopper → Active Filters Block', () => {
	useTheme( 'twentytwentytwo' );
	describe( 'With Product blocks', () => {} );
	describe( 'With PHP Templates', () => {
		beforeAll( async () => {
			await deleteAllTemplates( 'wp_template' );
			await goToTemplateEditor( {
				postId: 'woocommerce/woocommerce//archive-product',
			} );
			await insertBlock( 'Active Product Filters' );
			await insertBlock( 'Filter Products by Price' );
			await insertBlock( 'Filter Products by Stock' );
			await insertBlock( 'Filter Products by Attribute' );

			const canvasEl = canvas();

			const [ attribute ] = await canvasEl.$x(
				"//span[@class='woocommerce-search-list__item-label']/span[contains(., 'Capacity')]"
			);
			if ( attribute ) {
				await attribute.click();
				await canvasEl.click(
					'.wc-block-attribute-filter__selection button'
				);
			}

			await saveTemplate();
		} );

		afterAll( async () => {
			await deleteAllTemplates( 'wp_template' );
		} );

		it( 'Active Filters is hidden if there is no filter selected', async () => {
			await shopper.goToShop();

			expect( page ).not.toMatch( 'Active Filters' );
		} );

		it( 'Shows selected filters', async () => {
			await shopper.goToShop();

			await page.waitForSelector( '.wc-block-attribute-filter' );

			await expect( page ).toClick( 'label', {
				text: '128gb',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector(
				'.wp-block-woocommerce-active-filters'
			);

			expect( page ).toMatchElement(
				'.wc-block-active-filters__list-item-type',
				{
					text: 'Capacity',
				}
			);

			expect( page ).toMatchElement( '.wc-block-active-filters__list', {
				text: '128gb',
			} );

			await page.waitForSelector( '.wp-block-woocommerce-stock-filter' );

			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector(
				'.wp-block-woocommerce-active-filters'
			);

			expect( page ).toMatchElement(
				'.wc-block-active-filters__list-item-type',
				{
					text: 'Stock Status',
				}
			);

			expect( page ).toMatchElement( '.wc-block-active-filters__list', {
				text: 'In stock',
			} );
		} );

		it( 'When clicking the X on a filter it removes a filter and triggers a page refresh', async () => {
			await shopper.goToShop();

			await page.waitForSelector( '.wp-block-woocommerce-stock-filter' );

			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector( '.wc-block-attribute-filter' );

			await expect( page ).toClick( 'label', {
				text: '128gb',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector(
				'.wp-block-woocommerce-active-filters'
			);

			expect( page ).toMatchElement( '.wc-block-active-filters__list', {
				text: 'In stock',
			} );

			await clickLink( '.wc-block-active-filters__list-item-remove' );

			await expect( page.url() ).not.toMatch( 'instock' );
			await expect( page.url() ).toMatch( '128gb' );
		} );

		it( 'Clicking "Clear All" button removes all active filter and the page redirects to the base URL', async () => {
			await shopper.goToShop();

			await page.waitForSelector( '.wp-block-woocommerce-stock-filter' );

			await expect( page ).toClick( 'label', {
				text: 'In stock',
			} );

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			await page.waitForSelector(
				'.wp-block-woocommerce-active-filters'
			);

			expect( page ).toMatchElement(
				'.wc-block-active-filters__clear-all',
				{
					text: 'Clear All',
				}
			);

			await clickLink( '.wc-block-active-filters__clear-all' );

			await expect( page.url() ).not.toMatch( 'instock' );
			await expect( page.url() ).toMatch( SHOP_PAGE );
		} );
	} );
} );
