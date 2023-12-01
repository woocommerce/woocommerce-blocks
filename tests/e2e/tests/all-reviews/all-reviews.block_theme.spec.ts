/**
 * External dependencies
 */
import { expect, test } from '@woocommerce/e2e-playwright-utils';

const blockData = {
	name: 'woocommerce/all-reviews',
	selectors: {
		frontend: {
			firstReview:
				'.wc-block-review-list-item__item:first-child .wc-block-review-list-item__text p',
		},
	},
};

test.describe( `${ blockData.name } Block`, () => {
	let productId: number;
	let firstReviewId: number;
	let secondReviewId: number;
	const firstReviewContent = 'Nice album!';
	const secondReviewContent = 'Not bad.';

	// Create product and reviews.
	test.beforeAll( async ( { wcRestApiUtils } ) => {
		await wcRestApiUtils.createProduct(
			{
				name: 'Product with reviews',
				type: 'simple',
				regular_price: '12.99',
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

	// Remove product and reviews.
	test.afterAll( async ( { wcRestApiUtils } ) => {
		await wcRestApiUtils.deleteProductReview( firstReviewId );
		await wcRestApiUtils.deleteProductReview( secondReviewId );
		await wcRestApiUtils.deleteProduct( productId );
	} );

	test( 'renders a review in the editor and the frontend', async ( {
		admin,
		editor,
		page,
		editorUtils,
	} ) => {
		await admin.createNewPost();
		await editor.insertBlock( { name: blockData.name } );

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
