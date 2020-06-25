/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	openDocumentSettingsSidebar,
	switchUserToAdmin,
	getAllBlocks,
} from '@wordpress/e2e-test-utils';

import { getDocument, queries } from 'pptr-testing-library';

import { visitBlockPage } from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Filter Products by Price',
	slug: 'woocommerce/price-filter',
	class: '.wc-block-price-filter',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'can only be inserted once', async () => {
		await insertBlock( block.name );
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'allows title can be manipulated', async () => {
		await openDocumentSettingsSidebar();
		await expect( page ).toFill(
			'.wp-block[data-type="woocommerce/price-filter"] textarea.wc-block-editor-components-title',
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

		await expect( page ).toFill(
			'.wp-block[data-type="woocommerce/price-filter"] textarea.wc-block-editor-components-title',
			'Filter by price'
		);
		await page.click(
			'.components-toolbar button[aria-label="Heading 3"]'
		);
	} );

	it( 'allows display style to change', async () => {
		await openDocumentSettingsSidebar();

		await page.click( 'button[aria-label="Price Range: Text"]' );
		await expect( page ).toMatchElement(
			'.wc-block-price-filter__range-text'
		);
		await page.click( 'button[aria-label="Price Range: Editable"]' );
	} );

	it( 'allows you to toggle go button', async () => {
		await openDocumentSettingsSidebar();

		const { getByLabelText } = queries;
		const document = await getDocument( page );
		const showGoButton = await getByLabelText( document, /Filter button/i );
		await showGoButton.click();
		await expect( page ).toMatchElement(
			'button.wc-block-filter-submit-button.wc-block-price-filter__button'
		);
		expect( await getEditedPostContent() ).toMatchSnapshot();
		await showGoButton.click();
	} );
} );
