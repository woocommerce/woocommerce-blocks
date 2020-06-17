/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	getAllBlocks,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

describe( 'Active Product Filters Block', () => {
	beforeEach( async () => {
		await switchUserToAdmin();
		await createNewPost();
	} );

	it( 'can be created', async () => {
		await insertBlock( 'Active Product Filters' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'can only be inserted once', async () => {
		await insertBlock( 'Active Product Filters' );
		expect( await getAllBlocks() ).toHaveLength( 1 );

		await insertBlock( 'Active Product Filters' );
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'allows title can be manipulated', async () => {
		await insertBlock( 'Active Product Filters' );
		await expect( page ).toFill(
			'.wp-block[data-type="woocommerce/active-filters"] textarea.wc-block-component-title',
			'New Title'
		);
		await page.click(
			'.components-toolbar button[aria-label="Heading 6"]'
		);
		await expect(
			page
		).toMatchElement(
			'.wp-block[data-type="woocommerce/active-filters"] h6 textarea',
			{ text: 'New Title' }
		);

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Display style to change', async () => {
		await insertBlock( 'Active Product Filters' );
		await page.click( 'button[aria-label="Display Style: Chips"]' );
		await expect( page ).toMatchElement(
			'.wc-block-active-filters__list.wc-block-active-filters__list--chips'
		);
	} );
} );
