/**
 * External dependencies
 */
import { getAllBlocks, switchUserToAdmin } from '@wordpress/e2e-test-utils';
import { visitBlockPage } from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import {
	insertBlockDontWaitForInsertClose,
	GUTENBERG_EDITOR_CONTEXT,
	describeOrSkip,
} from '../../utils';

const block = {
	name: 'Products (Beta)',
	slug: 'woocommerce/product-query',
	class: '.wp-block-query',
};

describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
	`${ block.name } Block`,
	() => {
		beforeAll( async () => {
			await switchUserToAdmin();
			await visitBlockPage( `${ block.name } Block` );
		} );

		it( 'can be inserted more than once', async () => {
			await insertBlockDontWaitForInsertClose( block.name );
			expect( await getAllBlocks() ).toHaveLength( 2 );
		} );

		it( 'renders without crashing', async () => {
			await expect( page ).toRenderBlock( block );
		} );
	}
);
