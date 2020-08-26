/**
 * External dependencies
 */
import { searchForBlock, switchUserToAdmin } from '@wordpress/e2e-test-utils';

import {
	visitBlockPage,
	findElementWithText,
	closeInserter,
} from '@woocommerce/blocks-test-utils';

const block = {
	name: 'All Products',
	slug: 'woocommerce/all-products',
	class: '.wc-block-all-products',
};

/**
 * @todo: write helpers to simplify version and feature gating tests.
 */
if ( process.env.WP_VERSION < 5.3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'skipping all other things', () => {} );

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );
	it( 'can only be inserted once', async () => {
		await searchForBlock( block.name );
		const disabledInsertButton = await findElementWithText(
			'button.editor-block-list-item-woocommerce-all-products',
			block.name
		);
		expect(
			await disabledInsertButton.evaluate( ( button ) => button.disabled )
		).toBe( true );
		await closeInserter();
	} );
	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );
} );
