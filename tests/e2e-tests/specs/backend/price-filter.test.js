/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	switchUserToAdmin,
	getAllBlocks,
} from '@wordpress/e2e-test-utils';

import { getDocument, queries } from 'pptr-testing-library';

describe( 'Filter Products by Price Block', () => {
	beforeEach( async () => {
		await switchUserToAdmin();
		await createNewPost();
	} );

	it( 'can be created', async () => {
		await insertBlock( 'Filter Products by Price' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'can only be inserted once', async () => {
		await insertBlock( 'Filter Products by Price' );
		expect( await getAllBlocks() ).toHaveLength( 1 );

		await insertBlock( 'Filter Products by Price' );
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'allows title can be manipulated', async () => {
		await insertBlock( 'Filter Products by Price' );
		await expect( page ).toFill(
			'.wp-block[data-type="woocommerce/price-filter"] textarea.wc-block-component-title',
			'New Title'
		);
		await page.click(
			'.components-toolbar button[aria-label="Heading 6"]'
		);
		await expect(
			page
		).toMatchElement(
			'.wp-block[data-type="woocommerce/price-filter"] h6 textarea',
			{ text: 'New Title' }
		);

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'allows display style to change', async () => {
		await insertBlock( 'Filter Products by Price' );
		await page.click( 'button[aria-label="Price Range: Text"]' );
		await expect( page ).toMatchElement(
			'.wc-block-price-filter__range-text'
		);
	} );

	it( 'allows you to toggle go button', async () => {
		await insertBlock( 'Filter Products by Price' );
		const { getByLabelText } = queries;
		const document = await getDocument( page );
		const showGoButton = await getByLabelText( document, /Filter button/i );
		await showGoButton.click();
		await expect( page ).toMatchElement(
			'button.wc-block-filter-submit-button.wc-block-price-filter__button'
		);
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
