/**
 * External dependencies
 */
import { switchUserToAdmin } from '@wordpress/e2e-test-utils';
import { visitBlockPage } from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import { GUTENBERG_EDITOR_CONTEXT, describeOrSkip } from '../../utils';

const block = {
	name: 'Product Search Legacy',
	slug: 'woocommerce/product-search',
	class: '.wc-block-product-search',
};

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	`${ block.name } Block`,
	() => {
		beforeAll( async () => {
			await switchUserToAdmin();
			await visitBlockPage( `${ block.name } Block` );
		} );

		it( 'render the upgrade prompt', async () => {
			await expect( page ).toMatch(
				'This version of the Product Search block is outdated. Upgrade to continue using.'
			);
			await expect( page ).toMatch( 'Upgrade Block' );
		} );

		it( 'clicking the upgrade button convert the legacy block to core/search variation', async () => {
			await expect( page ).toClick( 'button', {
				text: 'Upgrade Block',
			} );

			await expect( page ).toMatchElement( '.wp-block-search' );
			await expect( page ).toMatchElement( '.wp-block-search__label', {
				text: 'Search',
			} );
			await expect( page ).toMatchElement(
				'.wp-block-search__input[value="Search products…"]'
			);
		} );
	}
);
