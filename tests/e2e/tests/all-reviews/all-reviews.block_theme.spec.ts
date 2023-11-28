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

const publishAndVisitPost = async ( { page, editor } ) => {
	await editor.publishPost();
	const url = new URL( page.url() );
	const postId = url.searchParams.get( 'post' );
	await page.goto( `/?p=${ postId }`, { waitUntil: 'commit' } );
};

test.describe( `${ blockData.name } Block`, () => {
	let productId: number;
	let firstReviewId: number;
	let secondReviewId: number;

	// Create product and review.
	test.beforeAll( async ( { baseURL } ) => {
		const api = new WooCommerceRestApi( {
			url: baseURL,
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			version: 'wc/v3',
		} );
		await api
			.post( 'products', {
				name: 'Product to search',
				type: 'simple',
				regular_price: '12.99',
			} )
			.then( ( response ) => {
				productId = response.data.id;
			} );
		await api
			.post( 'products/reviews', {
				product_id: productId,
				review: 'Nice album!',
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
				review: 'Not bad.',
				reviewer: 'John Doe',
				reviewer_email: 'john.doe@example.com',
				rating: 4,
			} )
			.then( ( response ) => {
				secondReviewId = response.data.id;
			} );
	} );

	// Remove product and review.
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
	} ) => {
		await admin.createNewPost();
		await editor.insertBlock( { name: blockData.name } );

		await expect( page.getByText( 'Nice album!' ) ).toBeVisible();

		await publishAndVisitPost( { page, editor } );

		await expect( page.getByText( 'Nice album!' ) ).toBeVisible();
	} );

	test( 'can change sort order in the frontend', async ( {
		admin,
		editor,
		page,
		frontendUtils,
	} ) => {
		await admin.createNewPost();
		await editor.insertBlock( { name: blockData.name } );
		await publishAndVisitPost( { page, editor } );

		const block = await frontendUtils.getBlockByName( blockData.name );
		let firstReview;
		firstReview = block.locator( blockData.selectors.frontend.firstReview );
		await expect( firstReview ).toHaveText( 'Not bad.' );

		const select = page.getByLabel( 'Order by' );
		select.selectOption( 'Highest rating' );

		firstReview = block.locator( blockData.selectors.frontend.firstReview );
		await expect( firstReview ).toHaveText( 'Nice album!' );
	} );
} );
