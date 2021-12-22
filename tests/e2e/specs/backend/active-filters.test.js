/**
 * External dependencies
 */
import {
	getEditedPostContent,
	getAllBlocks,
	switchUserToAdmin,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';
import { find, configure } from 'puppeteer-testing-library';

import {
	visitBlockPage,
	clearAndFillInput,
} from '@woocommerce/blocks-test-utils';
import { getDocument, queries } from 'pptr-testing-library';

/**
 * Internal dependencies
 */
import { insertBlockDontWaitForInsertClose } from '../../utils';

const block = {
	name: 'Active Product Filters',
	slug: 'woocommerce/active-filters',
	class: '.wc-block-active-filters',
};

describe( `${ block.name } Block`, () => {
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
		const document = getDocument( page );
		await openDocumentSettingsSidebar();
		await clearAndFillInput(
			'.wp-block[data-type="woocommerce/active-filters"] textarea.wc-block-editor-components-title',
			'New Title'
		);

		// Convert the title to H6.
		const heading6Button = await find(
			{
				name: 'Heading 6',
			},
			{ page }
		);
		await heading6Button.click();
		await expect(
			page
		).toMatchElement(
			'.wp-block[data-type="woocommerce/active-filters"] h6 textarea',
			{ text: 'New Title' }
		);

		await clearAndFillInput(
			'.wp-block[data-type="woocommerce/active-filters"] textarea.wc-block-editor-components-title',
			'Active filters'
		);
		// Convert the title back to H3.
		const heading3Button = await queries.getByLabelText(
			document,
			/Heading 3/i,
			{ selector: '.components-toolbar button' }
		);
		await heading3Button.click();
	} );

	it( 'allows changing the Display Style', async () => {
		const document = await getDocument( page );
		await openDocumentSettingsSidebar();

		// Click the button to convert the display style to Chips.
		const chipStyleButton = await queries.getByLabelText(
			document,
			/Display Style: Chips/i
		);
		await chipStyleButton.click();
		await expect( page ).toMatchElement(
			'.wc-block-active-filters__list.wc-block-active-filters__list--chips'
		);

		// Click the button to convert the display style to List.
		const listStyleButton = await queries.getByLabelText(
			document,
			/Display Style: List/i
		);
		await listStyleButton.click();
		await expect( page ).not.toMatchElement(
			'.wc-block-active-filters__list.wc-block-active-filters__list--chips'
		);
	} );
} );
