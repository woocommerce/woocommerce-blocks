/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { flatten, uniqBy } from 'lodash';

/**
 * Internal dependencies
 */
import { ENDPOINTS } from '../../constants';

export const isLargeCatalog = wc_product_block_data.isLargeCatalog || false;
export const limitTags = wc_product_block_data.limitTags || false;
export const hasTags = wc_product_block_data.hasTags || false;

const getProductsRequests = ( { selected = [], search = '', queryArgs = [] } ) => {
	const defaultArgs = {
		per_page: isLargeCatalog ? 100 : -1,
		catalog_visibility: 'any',
		status: 'publish',
		search,
		orderby: 'title',
		order: 'asc',
	};
	const requests = [
		addQueryArgs(
			ENDPOINTS.products,
			{ ...defaultArgs, ...queryArgs }
		),
	];

	// If we have a large catalog, we might not get all selected products in the first page.
	if ( isLargeCatalog && selected.length ) {
		requests.push(
			addQueryArgs( ENDPOINTS.products, {
				catalog_visibility: 'any',
				status: 'publish',
				include: selected,
			} )
		);
	}

	return requests;
};

/**
 * Get a promise that resolves to a list of products from the API.
 *
 * @param {Object} - A query object with the list of selected products and search term.
 */
export const getProducts = ( { selected = [], search = '', queryArgs = [] } ) => {
	const requests = getProductsRequests( { selected, search, queryArgs } );

	return Promise.all( requests.map( ( path ) => apiFetch( { path } ) ) ).then( ( data ) => {
		return uniqBy( flatten( data ), 'id' );
	} );
};

/**
 * Get a promise that resolves to a product object from the API.
 *
 * @param {number} productId Id of the product to retrieve.
 */
export const getProduct = ( productId ) => {
	return apiFetch( {
		path: `${ ENDPOINTS.products }/${ productId }`,
	} );
};

const getProductTagsRequests = ( { selected = [], search } ) => {
	const requests = [
		addQueryArgs( `${ ENDPOINTS.products }/tags`, {
			per_page: limitTags ? 100 : -1,
			orderby: limitTags ? 'count' : 'name',
			order: limitTags ? 'desc' : 'asc',
			search,
		} ),
	];

	// If we have a large catalog, we might not get all selected products in the first page.
	if ( limitTags && selected.length ) {
		requests.push(
			addQueryArgs( `${ ENDPOINTS.products }/tags`, {
				include: selected,
			} )
		);
	}

	return requests;
};

/**
 * Get a promise that resolves to a list of tags from the API.
 *
 * @param {Object} - A query object with the list of selected products and search term.
 */
export const getProductTags = ( { selected = [], search } ) => {
	const requests = getProductTagsRequests( { selected, search } );

	return Promise.all( requests.map( ( path ) => apiFetch( { path } ) ) ).then( ( data ) => {
		return uniqBy( flatten( data ), 'id' );
	} );
};

/**
 * Get a promise that resolves to a category object from the API.
 *
 * @param {number} categoryId Id of the product to retrieve.
 */
export const getCategory = ( categoryId ) => {
	return apiFetch( {
		path: `${ ENDPOINTS.categories }/${ categoryId }`,
	} );
};
