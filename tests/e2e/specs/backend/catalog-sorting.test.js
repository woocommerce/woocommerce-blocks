/**
 * External dependencies
 */
import {
	canvas,
	createNewPost,
	switchUserToAdmin,
	searchForBlock,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	filterCurrentBlocks,
	goToSiteEditor,
	GUTENBERG_EDITOR_CONTEXT,
	useTheme,
	waitForCanvas,
} from '../../utils.js';

const block = {
	name: 'Catalog Sorting',
	slug: 'woocommerce/catalog-sorting',
	class: '.wc-block-catalog-sorting',
};

describe( `${ block.name } Block`, () => {
	describe( 'in a post', () => {
		beforeAll( async () => {
			await switchUserToAdmin();
		} );

		it( 'can not be inserted', async () => {
			await createNewPost( {
				postType: 'post',
				title: block.name,
			} );
			await searchForBlock( block.name );
			expect( page ).toMatch( 'No results found.' );
		} );
	} );

	describe( 'in FSE editor', () => {
		useTheme( 'emptytheme' );

		beforeEach( async () => {
			await goToSiteEditor();
			const selector =
				'.edit-site-site-hub__edit-button[aria-label="Open the editor"]';
			if ( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' ) {
				await page.waitForSelector( selector );
				await page.click( selector );
			}
			await waitForCanvas();
		} );

		it( 'can be inserted in FSE area', async () => {
			await insertCatalogSorting();

			await expect( canvas() ).toMatchElement( block.class );
		} );

		it( 'can be inserted more than once', async () => {
			await insertCatalogSorting();
			await insertCatalogSorting();
			const foo = await filterCurrentBlocks(
				( b ) => b.name === block.slug
			);
			expect( foo ).toHaveLength( 2 );
		} );
	} );
} );

const insertCatalogSorting = async () => {
	await searchForBlock( block.name );
	await page.waitForXPath( `//button//span[text()='${ block.name }']` );
	const insertButton = (
		await page.$x( `//button//span[text()='${ block.name }']` )
	 )[ 0 ];
	await insertButton.click();
};
