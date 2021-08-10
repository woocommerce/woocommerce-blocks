/**
 * External dependencies
 */
import {
	openDocumentSettingsSidebar,
	switchUserToAdmin,
	getAllBlocks,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import {
	clearAndFillInput,
	visitBlockPage,
} from '@woocommerce/blocks-test-utils';
import { queries, getDocument } from 'pptr-testing-library';

/**
 * Internal dependencies
 */
import {
	insertBlockDontWaitForInsertClose,
} from '../../utils.js';

const block = {
	name: 'Filter Products by Price',
	slug: 'woocommerce/price-filter',
	class: '.wp-block-woocommerce-price-filter',
};

describe( `${ block.name } Block`, () => {

	describe( 'after compatibility notice is dismissed', () => {
		beforeAll( async () => {
			await switchUserToAdmin();
			await visitBlockPage( `${ block.name } Block` );
		} );

		it( 'can only be inserted once', async () => {
			await insertBlockDontWaitForInsertClose( block.name );
			expect( await getAllBlocks() ).toHaveLength( 1 );
		} );

		it( 'renders without crashing', async () => {
			await expect( page ).toRenderBlock( block );
		} );

		it( 'allows title to be manipulated', async () => {
			// we focus on the block
			await page.click( block.class );
			await openDocumentSettingsSidebar();
			await clearAndFillInput(
				'.wp-block[data-type="woocommerce/price-filter"] textarea.wc-block-editor-components-title',
				'New Title'
			);
			await page.click( block.class );
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
			await clearAndFillInput(
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
} );
