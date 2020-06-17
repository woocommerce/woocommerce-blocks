const fs = require( 'fs' ).promises;
const path = require( 'path' );
const blocks = [
	{
		name: 'all-reviews',
		title: 'All Reviews',
	},
	{
		name: 'featured-category',
		title: 'Featured Category',
	},
	{
		name: 'featured-product',
		title: 'Featured Product',
	},
	{
		name: 'handpicked-products',
		title: 'Hand-picked Products',
	},
	{
		name: 'product-best-sellers',
		title: 'Best Selling Products',
	},
	{
		name: 'product-categories',
		title: 'Product Categories List',
	},
	{
		name: 'product-category',
		title: 'Products by Category',
	},
	{
		name: 'product-new',
		title: 'Newest Products',
	},
	{
		name: 'product-on-sale',
		title: 'On Sale Products',
	},
	{
		name: 'products-by-attribute',
		title: 'Products by Attribute',
	},
	{
		name: 'product-top-rated',
		title: 'Top Rated Products',
	},
	{
		name: 'reviews-by-product',
		title: 'Reviews by Product',
	},
	{
		name: 'reviews-by-category',
		title: 'Reviews by Category',
	},
	{
		name: 'product-tag',
		title: 'Products by Tag',
	},
	{
		name: 'product-title',
		title: 'Product Title',
	},
	{
		name: 'product-price',
		title: 'Product Price',
	},
	{
		name: 'product-image',
		title: 'Product Image',
	},
	{
		name: 'product-rating',
		title: 'Product Rating',
	},
	{
		name: 'product-button',
		title: 'Add to Cart Button',
	},
	{
		name: 'product-summary',
		title: 'Product Summary',
	},
	{
		name: 'product-sale-badge',
		title: 'On-Sale Badge',
	},
	{
		name: 'price-filter',
		title: 'Filter Products by Price',
	},
	{
		name: 'attribute-filter',
		title: 'Filter Products by Attribute',
	},
	{
		name: 'active-filters',
		title: 'Active Product Filters',
	},
];

const template = ( { title } ) => `/**
 * External dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

describe( '${ title } Block', () => {
	beforeEach( async () => {
		await switchUserToAdmin();
		await createNewPost();
	} );

	it( 'can be created', async () => {
		await insertBlock( '${ title }' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );

`;
Promise.all(
	blocks.map( ( block ) => {
		return fs.writeFile(
			`${ path.dirname( __filename ) }/temp/${ block.name }.test.js`,
			template( block )
		);
	} )
);
