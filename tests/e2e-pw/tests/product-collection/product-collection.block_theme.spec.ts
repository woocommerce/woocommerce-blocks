/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import ProductCollectionPage from './product-collection.page';

test.describe( 'Product Collection', () => {
	test( 'Block renders correctly', async ( { page, admin, editor } ) => {
		const pageObject = new ProductCollectionPage( {
			page,
			admin,
			editor,
		} );
		await pageObject.createNewPostAndInsertBlock();

		expect( pageObject.locateProductTemplate() ).not.toBeNull();
		expect( await pageObject.locateProductImages() ).toHaveCount( 9 );
		expect( await pageObject.locateProductTitles() ).toHaveCount( 9 );
		expect( await pageObject.locateProductPrices() ).toHaveCount( 9 );
		expect( await pageObject.locateAddToCartButtons() ).toHaveCount( 9 );

		await pageObject.publishAndGoToFrontend();

		expect( pageObject.locateProductTemplate() ).not.toBeNull();
		expect( await pageObject.locateProductImages() ).toHaveCount( 9 );
		expect( await pageObject.locateProductTitles() ).toHaveCount( 9 );
		expect( await pageObject.locateProductPrices() ).toHaveCount( 9 );
		expect( await pageObject.locateAddToCartButtons() ).toHaveCount( 9 );
	} );
} );
