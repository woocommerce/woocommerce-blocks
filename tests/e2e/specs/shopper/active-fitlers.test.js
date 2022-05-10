/**
 * External dependencies
 */
import { insertBlock, deleteAllTemplates } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { goToTemplateEditor, useTheme, saveTemplate } from '../../utils';
import { shopper } from '../../../utils';

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

			const editor = page
				.frames()
				.find( ( frame ) => frame.name() === 'editor-canvas' );
			const [ attribute ] = await editor.$x(
				"//span[@class='woocommerce-search-list__item-label']/span[contains(., 'Capacity')]"
			);
			if ( attribute ) {
				await attribute.click();
				await editor.click(
					'.wc-block-attribute-filter__selection button'
				);
			}

			await saveTemplate();
		} );

		it( 'Active Filters is hiddden if there is no filter selected', async () => {
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

			await page.waitForSelector(
				'.wp-block-woocommerce-active-filters'
			);

			await page.waitForNavigation( { waitUntil: 'networkidle0' } );

			expect( page ).toMatchElement( '.wc-block-active-filters__list', {
				text: 'In stock',
			} );

			await Promise.all( [
				page.click( '.wc-block-active-filters__list-item-remove' ),
				page.waitForNavigation( { waitUntil: 'networkidle0' } ),
			] );

			await expect( page.url() ).not.toMatch( 'instock' );
			await expect( page.url() ).toMatch( '128gb' );
		} );
	} );
} );
