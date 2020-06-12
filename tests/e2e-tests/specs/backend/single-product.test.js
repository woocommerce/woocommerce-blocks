/**
 * External dependencies
 */
import {
	insertBlock,
	getAllBlocks,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

import { visitBlockPage } from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import { deleteBlockPages } from '../../fixtures/fixture-loaders';

const block = {
	name: 'Single Product',
	slug: 'woocommerce/single-product',
	class: '.wc-block-single-product',
};

describe( `${ block.name } Block`, () => {
	let maybePageId;
	beforeAll( async () => {
		await switchUserToAdmin();
		maybePageId = await visitBlockPage( `${ block.name } Block` );
	} );

	afterAll( async () => {
		if ( maybePageId ) {
			await deleteBlockPages( [ maybePageId ] );
		}
	} );
	it( 'can be inserted more than once', async () => {
		await insertBlock( block.name );
		expect( await getAllBlocks() ).toHaveLength( 2 );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'Delete' );
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'renders without crashing', async () => {
		// Gutenberg error
		expect(
			( await page.content() ).match(
				/Your site doesn’t include support for/gi
			)
		).toBeNull();
		// Our ErrorBoundary
		expect(
			( await page.content() ).match(
				/There was an error whilst rendering/gi
			)
		).toBeNull();
		// Validation Error
		expect(
			( await page.content() ).match(
				/This block contains unexpected or invalid content/gi
			)
		).toBeNull();

		await expect( page ).toMatchElement( block.class );
	} );
} );
