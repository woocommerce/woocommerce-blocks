/**
 * External dependencies
 */
import { expect, test } from '@woocommerce/e2e-playwright-utils';
import { default as WooCommerceRestApi } from '@woocommerce/woocommerce-rest-api';

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
	test.beforeAll( async ( { baseURL } ) => {
		const api = new WooCommerceRestApi( {
			url: baseURL,
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			version: 'wc/v3',
		} );
		await api
			.post( 'products', {
				name: 'Product with reviews',
				type: 'simple',
				regular_price: '12.99',
			} )
			.then( ( response ) => {
				productId = response.data.id;
			} );
		await api
			.post( 'products/reviews', {
				product_id: productId,
				review: firstReviewContent,
				reviewer: 'John Doe',
				reviewer_email: 'john.doe@example.com',
				rating: 5,
			} )
			.then( ( response ) => {
				firstReviewId = response.data.id;
			} );
		await api
			.post( 'products/reviews', {
				product_id: productId,
				review: secondReviewContent,
				reviewer: 'John Doe',
				reviewer_email: 'john.doe@example.com',
				rating: 4,
			} )
			.then( ( response ) => {
				secondReviewId = response.data.id;
			} );
	} );

	// Remove product and reviews.
	test.afterAll( async ( { baseURL } ) => {
		const api = new WooCommerceRestApi( {
			url: baseURL,
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			version: 'wc/v3',
		} );
		await api.delete( `products/reviews/${ firstReviewId }`, {
			force: true,
		} );
		await api.delete( `products/reviews/${ secondReviewId }`, {
			force: true,
		} );
		await api.delete( `products/${ productId }`, {
			force: true,
		} );
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
