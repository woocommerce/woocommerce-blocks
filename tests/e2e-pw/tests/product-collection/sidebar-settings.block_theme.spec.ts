/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import ProductCollectionPage from './product-collection.page';

test.describe( 'Sidebar settings', () => {
	test( 'Shows the correct number of columns as set in settings.', async ( {
		page,
		admin,
		editor,
	} ) => {
		const pageObject = new ProductCollectionPage( {
			page,
			admin,
			editor,
		} );
		await pageObject.createNewPostAndInsertBlock();
		await pageObject.setNumberOfColumns( 2 );
		await expect(
			await pageObject.locateProductTemplate().getAttribute( 'class' )
		).toContain( 'columns-2' );

		await pageObject.setNumberOfColumns( 4 );
		await expect(
			await pageObject.locateProductTemplate().getAttribute( 'class' )
		).toContain( 'columns-4' );

		await pageObject.publishAndGoToFrontend();

		await expect(
			await pageObject.locateProductTemplate().getAttribute( 'class' )
		).toContain( 'columns-4' );
	} );
} );
