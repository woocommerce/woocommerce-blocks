/**
 * External dependencies
 */
import { setPostContent, insertBlock } from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	saveOrPublish,
	selectBlockByName,
	findToolsPanelWithTitle,
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
			await setPostContent( '' );
			await insertBlock( block.name );
			await saveOrPublish();
			await openBlockEditorSettings( { isFSEEditor: false } );
			await selectBlockByName( block.slug );
		} );

		/**
		 * Reset the content of Product Query Block page to default so we don't
		 * break other tests.
		 */
		afterAll( async () => {
			await visitBlockPage( `${ block.name } Block` );
			await waitForCanvas();
			await setPostContent( '' );
			await insertBlock( block.name );
			await saveOrPublish();
		} );

		describe( 'Sale Status', () => {
			it( 'Sale status is disabled by default', async () => {
				const productFiltersPanel = await findToolsPanelWithTitle(
					'Product filters'
				);
				await expect( productFiltersPanel ).not.toMatch(
					'Show only products on sale'
				);
			} );
		} );
	}
);
