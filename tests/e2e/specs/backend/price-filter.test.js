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
import { insertBlockDontWaitForInsertClose } from '../../utils.js';

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

		it( "allows changing the block's title", async () => {
			const document = await getDocument( page );
			// we focus on the block
			await page.click( block.class );
			await openDocumentSettingsSidebar();
			await clearAndFillInput(
				'.wp-block[data-type="woocommerce/price-filter"] textarea.wc-block-editor-components-title',
				'New Title'
			);
			await page.click( block.class );

			// Change title to h6.
			const heading6Button = await queries.getByLabelText(
				document,
				/Heading 6/i
			);
			await heading6Button.click();
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
			// Change title to h3.
			const heading3Button = await queries.getByLabelText(
				document,
				/Heading 3/i
			);
			await heading3Button.click();
			await expect(
				page
			).not.toMatchElement(
				'.wp-block[data-type="woocommerce/price-filter"] h6 textarea',
				{ text: 'New Title' }
			);
		} );

		it( 'allows changing the Display Style', async () => {
			await openDocumentSettingsSidebar();
			const document = await getDocument( page );

			// Turn the display style to Price Range: Text
			const priceRangeTextButton = await queries.getByLabelText(
				document,
				/Price Range: Text/i
			);
			await priceRangeTextButton.click();

			await expect( page ).toMatchElement(
				'.wc-block-price-filter__range-text'
			);
			// Turn the display style to Price Range: Text
			const priceRangeEditableButton = await queries.getByLabelText(
				document,
				/Price Range: Editable/i
			);
			await priceRangeEditableButton.click();

			await expect( page ).not.toMatchElement(
				'.wc-block-price-filter__range-text'
			);
		} );

		it( 'allows you to toggle go button', async () => {
			await openDocumentSettingsSidebar();

			const { getByLabelText } = queries;
			const document = await getDocument( page );
			const showGoButton = await getByLabelText(
				document,
				/Filter button/i
			);
			await showGoButton.click();
			await expect( page ).toMatchElement(
				'button.wc-block-filter-submit-button.wc-block-price-filter__button'
			);
			expect( await getEditedPostContent() ).toMatchSnapshot();
			await showGoButton.click();
		} );
	} );
} );
