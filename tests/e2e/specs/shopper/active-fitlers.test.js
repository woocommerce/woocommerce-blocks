/**
 * External dependencies
 */
import { insertBlock, deleteAllTemplates } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	goToTemplateEditor,
	useTheme,
	saveTemplate,
	BASE_URL,
} from '../../utils';

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

		it( 'Shows selected filters', async () => {
			await page.goto( BASE_URL + '/shop', {
				waitUntil: 'networkidle0',
			} );
		} );
	} );
} );
