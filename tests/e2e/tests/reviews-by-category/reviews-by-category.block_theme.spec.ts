/**
 * External dependencies
 */
import { expect, test } from '@woocommerce/e2e-playwright-utils';

const blockData = {
	name: 'woocommerce/reviews-by-category',
	selectors: {
		frontend: {
			firstReview:
				'.wc-block-review-list-item__item:first-child .wc-block-review-list-item__text p',
		},
	},
};

test.describe( `${ blockData.name } Block`, () => {
	let categoryId: number;
	let productId: number;
	let firstReviewId: number;
	let secondReviewId: number;
	const firstReviewContent = 'Nice album!';
	const secondReviewContent = 'Not bad.';

	// Create category, product and reviews.
	test.beforeAll( async ( { wcRestApiUtils } ) => {
		await wcRestApiUtils.createProductCategory(
			{
				name: 'Products with reviews',
			},
			( response ) => {
				categoryId = response.data.id;
			}
		);
		await wcRestApiUtils.createProduct(
			{
				name: 'Product with reviews',
				type: 'simple',
				regular_price: '12.99',
				categories: [ { id: categoryId } ],
			},
			( response ) => {
				productId = response.data.id;
			}
		);
		await wcRestApiUtils.createProductReview(
			{
				product_id: productId,
				review: firstReviewContent,
				reviewer: 'John Doe',
				reviewer_email: 'john.doe@example.com',
				rating: 5,
			},
			( response ) => {
				firstReviewId = response.data.id;
			}
		);
		await wcRestApiUtils.createProductReview(
			{
				product_id: productId,
				review: secondReviewContent,
				reviewer: 'John Doe',
				reviewer_email: 'john.doe@example.com',
				rating: 4,
			},
			( response ) => {
				secondReviewId = response.data.id;
			}
		);
	} );

	// Remove category, product and reviews.
	test.afterAll( async ( { wcRestApiUtils } ) => {
		await wcRestApiUtils.deleteProductReview( firstReviewId );
		await wcRestApiUtils.deleteProductReview( secondReviewId );
		await wcRestApiUtils.deleteProduct( productId );
		await wcRestApiUtils.deleteProductCategory( categoryId );
	} );

	test( 'renders a review in the editor and the frontend', async ( {
		admin,
		editor,
		page,
		editorUtils,
	} ) => {
		await admin.createNewPost();
		await editor.insertBlock( { name: blockData.name } );
		const productCheckbox = page.getByLabel(
			'Products with reviews, has 2 reviews'
		);
		productCheckbox.check();
		await expect( productCheckbox ).toBeChecked();
		const doneButton = page.getByRole( 'button', { name: 'Done' } );
		await doneButton.click();

		await expect( page.getByText( firstReviewContent ) ).toBeVisible();

		await editorUtils.publishAndVisitPost();

		await expect( page.getByText( firstReviewContent ) ).toBeVisible();
	} );

	test( 'can change sort order in the frontend', async ( {
		admin,
		editor,
		page,
		frontendUtils,
		editorUtils,
	} ) => {
		await admin.createNewPost();
		await editor.insertBlock( { name: blockData.name } );
		const productCheckbox = page.getByLabel(
			'Products with reviews, has 2 reviews'
		);
		productCheckbox.check();
		await expect( productCheckbox ).toBeChecked();
		const doneButton = page.getByRole( 'button', { name: 'Done' } );
		await doneButton.click();
		await editorUtils.publishAndVisitPost();

		const block = await frontendUtils.getBlockByName( blockData.name );
		let firstReview;
		firstReview = block.locator( blockData.selectors.frontend.firstReview );
		await expect( firstReview ).toHaveText( secondReviewContent );

		const select = page.getByLabel( 'Order by' );
		select.selectOption( 'Highest rating' );

		firstReview = block.locator( blockData.selectors.frontend.firstReview );
		await expect( firstReview ).toHaveText( firstReviewContent );
	} );
} );
