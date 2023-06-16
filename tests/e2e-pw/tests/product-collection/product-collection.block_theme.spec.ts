/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import ProductCollectionPage from './product-collection.page';

test.describe( 'Product Collection', () => {
	test( 'Renders product collection block correctly with 9 items', async ( {
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

		expect( pageObject.productTemplate ).not.toBeNull();
		expect( pageObject.productImages ).toHaveCount( 9 );
		expect( pageObject.productTitles ).toHaveCount( 9 );
		expect( pageObject.productPrices ).toHaveCount( 9 );
		expect( pageObject.addToCartButtons ).toHaveCount( 9 );

		await pageObject.publishAndGoToFrontend();

		expect( pageObject.productTemplate ).not.toBeNull();
		expect( pageObject.productImages ).toHaveCount( 9 );
		expect( pageObject.productTitles ).toHaveCount( 9 );
		expect( pageObject.productPrices ).toHaveCount( 9 );
		expect( pageObject.addToCartButtons ).toHaveCount( 9 );
	} );

	test.describe( 'Product Collection Sidebar Settings', () => {
		test( 'Reflects the correct number of columns according to sidebar settings', async ( {
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
				await pageObject.productTemplate.getAttribute( 'class' )
			).toContain( 'columns-2' );

			await pageObject.setNumberOfColumns( 4 );
			await expect(
				await pageObject.productTemplate.getAttribute( 'class' )
			).toContain( 'columns-4' );

			await pageObject.publishAndGoToFrontend();

			await expect(
				await pageObject.productTemplate.getAttribute( 'class' )
			).toContain( 'columns-4' );
		} );

		test( 'Order By - sort products by title in descending order correctly', async ( {
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

			await pageObject.setOrderBy( 'title/desc' );
			const allTitles = await pageObject.productTitles.allInnerTexts();
			const expectedTitles = [ ...allTitles ].sort().reverse();

			expect( allTitles ).toStrictEqual( expectedTitles );

			await pageObject.publishAndGoToFrontend();

			expect(
				await pageObject.productTitles.allInnerTexts()
			).toStrictEqual( expectedTitles );
		} );

		// Products can be filtered based on 'on sale' status.
		test( 'Products can be filtered based on "on sale" status.', async ( {
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

			// On each page we show 9 products.
			await expect( pageObject.productImages ).toHaveCount( 9 );
			// All products should not be on sale.
			await expect(
				await pageObject.productImages.filter( {
					hasText: 'Product on sale',
				} )
			).not.toHaveCount( 9 );

			await pageObject.setShowOnlyProductsOnSale( true );

			// In test data we have only 6 products on sale
			await expect( pageObject.productImages ).toHaveCount( 6 );

			// Expect all shown products to be on sale.
			await expect(
				await pageObject.productImages.filter( {
					hasText: 'Product on sale',
				} )
			).toHaveCount( await pageObject.productImages.count() );
		} );
	} );
} );
