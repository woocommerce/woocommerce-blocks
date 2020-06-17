/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

describe( 'Newest Products Block', () => {
	beforeEach( async () => {
		await switchUserToAdmin();
		await createNewPost();
	} );

	it( 'can be created', async () => {
		await insertBlock( 'Newest Products' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
