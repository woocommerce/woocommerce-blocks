/**
 * External dependencies
 */
import { getAllBlocks, switchUserToAdmin } from '@wordpress/e2e-test-utils';
import { insertBlockDontWaitForInsertClose } from '../../utils.js';

/**
 * Internal dependencies
 */
import { visitBlockPage } from '@woocommerce/blocks-test-utils';
import { singleProduct as block } from '../../blocks';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'skipping all other things', () => {} );

describe( `${ block.name } Block`, () => {
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
} );
