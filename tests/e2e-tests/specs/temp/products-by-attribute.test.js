/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

describe( 'Products by Attribute Block', () => {
	beforeEach( async () => {
		await switchUserToAdmin();
		await createNewPost();
	} );

	it( 'can be created', async () => {
		await insertBlock( 'Products by Attribute' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
