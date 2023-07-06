/**
 * External dependencies
 */
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import ProductCollectionPage from './product-collection.page';

const test = base.extend< { pageObject: ProductCollectionPage } >( {
	pageObject: async ( { page, admin, editor }, use ) => {
		const pageObject = new ProductCollectionPage( {
			page,
			admin,
			editor,
		} );
		await pageObject.createNewPostAndInsertBlock();
		await use( pageObject );
	},
} );

test.describe( 'Product Collection', () => {
	test( 'Renders product collection block correctly with 9 items', async ( {
		pageObject,
	} ) => {
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
			pageObject,
		} ) => {
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
			pageObject,
		} ) => {
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
			pageObject,
		} ) => {
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

			await pageObject.publishAndGoToFrontend();
			await expect( pageObject.productImages ).toHaveCount( 6 );
			await expect(
				await pageObject.productImages.filter( {
					hasText: 'Product on sale',
				} )
			).toHaveCount( await pageObject.productImages.count() );
		} );

		test( 'Products can be filtered based on selection in handpicked products option', async ( {
			pageObject,
		} ) => {
			await pageObject.addFilter( 'Show Hand-picked Products' );

			const filterName = 'Pick some products';
			await pageObject.setFilterComboboxValue( filterName, [ 'Album' ] );
			expect( pageObject.productTitles ).toHaveCount( 1 );

			const productNames = [ 'Album', 'Cap' ];
			await pageObject.setFilterComboboxValue( filterName, productNames );
			expect( pageObject.productTitles ).toHaveCount( 2 );
			expect( pageObject.productTitles ).toHaveText( productNames );

			await pageObject.publishAndGoToFrontend();
			expect( pageObject.productTitles ).toHaveCount( 2 );
			expect( pageObject.productTitles ).toHaveText( productNames );
		} );

		test( 'Products can be filtered based on keyword.', async ( {
			pageObject,
		} ) => {
			await pageObject.createNewPostAndInsertBlock();
			await pageObject.addFilter( 'Keyword' );

			await pageObject.setKeyword( 'Album' );
			await expect( pageObject.productTitles ).toHaveText( [ 'Album' ] );

			await pageObject.setKeyword( 'Cap' );
			await expect( pageObject.productTitles ).toHaveText( [ 'Cap' ] );

			await pageObject.publishAndGoToFrontend();
			await expect( pageObject.productTitles ).toHaveText( [ 'Cap' ] );
		} );

		test( 'Products can be filtered based on category.', async ( {
			pageObject,
		} ) => {
			const filterName = 'Product categories';
			await pageObject.addFilter( 'Show Taxonomies' );
			await pageObject.setFilterComboboxValue( filterName, [
				'Clothing',
			] );
			await expect( pageObject.productTitles ).toHaveText( [
				'Logo Collection',
			] );

			await pageObject.setFilterComboboxValue( filterName, [
				'Accessories',
			] );
			const accessoriesProductNames = [
				'Beanie',
				'Beanie with Logo',
				'Belt',
				'Cap',
				'Sunglasses',
			];
			await expect( pageObject.productTitles ).toHaveText(
				accessoriesProductNames
			);

			await pageObject.publishAndGoToFrontend();
			await expect( pageObject.productTitles ).toHaveText(
				accessoriesProductNames
			);
		} );

		test( 'Products can be filtered based on product attributes like color, size etc.', async ( {
			pageObject,
		} ) => {
			await pageObject.addFilter( 'Show Product Attributes' );
			await pageObject.setProductAttribute( 'Color', 'Green' );

			await expect( pageObject.productTitles ).toHaveCount( 3 );

			await pageObject.setProductAttribute( 'Size', 'Large' );

			await expect( pageObject.productTitles ).toHaveCount( 1 );

			await pageObject.publishAndGoToFrontend();

			await expect( pageObject.productTitles ).toHaveCount( 1 );
		} );
	} );

	test( 'Responsive -> Block correctly adjusts number of columns on smaller screens', async ( {
		pageObject,
	} ) => {
		await pageObject.publishAndGoToFrontend();

		const firstProduct = pageObject.products.first();

		// In the original viewport size, we expect the product width to be less than the parent width
		// because we will have more than 1 column
		let productWidth = await firstProduct.boundingBox();
		let parentWidth = await (
			await firstProduct.locator( 'xpath=..' )
		 ).boundingBox();
		expect( productWidth?.width ).toBeLessThan(
			parentWidth?.width as number
		);

		await pageObject.page.setViewportSize( {
			height: 667,
			width: 375,
		} );

		// In the smaller viewport size, we expect the product width to be (approximately) the same as the parent width
		// because we will have only 1 column
		productWidth = await firstProduct.boundingBox();
		parentWidth = await (
			await firstProduct.locator( 'xpath=..' )
		 ).boundingBox();
		expect( productWidth?.width ).toBeCloseTo(
			parentWidth?.width as number
		);
	} );
} );
