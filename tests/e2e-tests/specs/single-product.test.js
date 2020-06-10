/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	getAllBlocks,
	createNewPost,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

if ( process.env.WP_VERSION < 5.3 || process.env.WOOCOMMERCE_BLOCKS_PHASE < 3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'skipping all other things', () => {
		// eslint-disable-next-line no-console
		console.warn( 'skipping tests' );
	} );

describe( 'Single Product Block', () => {
	beforeEach( async () => {
		await switchUserToAdmin();
		await createNewPost();
	} );

	it( 'can be created', async () => {
		await insertBlock( 'Single Product' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'can be inserted more than once', async () => {
		await insertBlock( 'Single Product' );
		expect( await getAllBlocks() ).toHaveLength( 1 );

		await insertBlock( 'Single Product' );
		expect( await getAllBlocks() ).toHaveLength( 2 );
	} );
} );
