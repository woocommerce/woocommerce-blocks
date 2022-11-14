/**
 * External dependencies
 */
import {
	setPostContent,
	insertBlock,
	findSidebarPanelWithTitle,
} from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	saveOrPublish,
	selectBlockByName,
} from '@woocommerce/blocks-test-utils';

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

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	'Product Query > Products Filters',
	() => {
		beforeEach( async () => {
			await visitBlockPage( `${ block.name } Block` );
			await waitForCanvas();
			await openBlockEditorSettings();
			await selectBlockByName( block.slug );
		} );

		/**
		 * Reset the content of Product Query Block page to default so we don't
		 * break other tests.
		 */
		afterAll( async () => {
			await visitBlockPage( `${ block.name } Block` );
			await setPostContent( '' );
			await insertBlock( 'Product Query' );
			await saveOrPublish();
		} );

		describe( 'Sale Status', () => {
			it( 'Sale status is disabled by default', async () => {
				const productFiltersPanel = await findSidebarPanelWithTitle(
					'Product filters'
				);
				expect( productFiltersPanel ).toBeFalsy();
				expect( productFiltersPanel ).not.toBeFalsy();
			} );
		} );
	}
);
