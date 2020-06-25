/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	getAllBlocks,
	switchUserToAdmin,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';

import { visitBlockPage } from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Active Product Filters',
	slug: 'woocommerce/active-filters',
	class: '.wc-block-active-filters',
};

if ( process.env.WP_VERSION < 5.3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'skipping all other things', () => {} );

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
			'.wp-block[data-type="woocommerce/active-filters"] textarea.wc-block-editor-components-title',
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
		await expect( page ).toFill(
			'.wp-block[data-type="woocommerce/active-filters"] textarea.wc-block-editor-components-title',
			'Active filters'
		);
		await page.click(
			'.components-toolbar button[aria-label="Heading 3"]'
		);
	} );

	it( 'Display style to change', async () => {
		await openDocumentSettingsSidebar();
		await page.click( 'button[aria-label="Display Style: Chips"]' );
		await expect( page ).toMatchElement(
			'.wc-block-active-filters__list.wc-block-active-filters__list--chips'
		);
		await page.click( 'button[aria-label="Display Style: List"]' );
	} );
} );
