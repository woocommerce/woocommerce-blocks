/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

describe( 'Product Rating Block', () => {
	beforeEach( async () => {
		await switchUserToAdmin();
		await createNewPost();
	} );

	it( 'can be created', async () => {
		await insertBlock( 'Product Rating' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
