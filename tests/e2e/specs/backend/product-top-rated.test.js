/**
 * External dependencies
 */
import { switchUserToAdmin } from '@wordpress/e2e-test-utils';
import { visitBlockPage } from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import {
	removeAllBlocks,
	getBlocksBySlug,
	insertBlockDontWaitForInsertClose,
} from '../../utils.js';

const block = {
	name: 'Top Rated Products',
	slug: 'woocommerce/product-top-rated',
	class: '.wc-block-product-top-rated',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	beforeEach( async () => {
		removeAllBlocks();
	} );

	it( 'renders without crashing', async () => {
		await insertBlockDontWaitForInsertClose( block.name );
		await expect( page ).toRenderBlock( block );
	} );

	it( 'can be inserted more than once', async () => {
		await insertBlockDontWaitForInsertClose( block.name );
		expect( await getBlocksBySlug( block.slug ) ).toHaveLength( 2 );
	} );
} );
