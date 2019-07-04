/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { flatten, uniqBy, merge } from 'lodash';

export const isLargeCatalog = wc_product_block_data.isLargeCatalog || false;

const getProductsRequests = ( { selected = [], search = '', queryArgs = [] } ) => {
	const defaultArgs = {
		per_page: isLargeCatalog ? 100 : -1,
		catalog_visibility: 'visible',
		status: 'publish',
		search,
		orderby: 'title',
		order: 'asc',
	};
	const requests = [
		addQueryArgs(
			'/wc/blocks/products',
			merge( defaultArgs, queryArgs )
		),
	];

	// If we have a large catalog, we might not get all selected products in the first page.
	if ( isLargeCatalog && selected.length ) {
		requests.push(
			addQueryArgs( '/wc/blocks/products', {
				catalog_visibility: 'visible',
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
 * @param {object} - A query object with the list of selected products and search term.
 */
export const getProducts = ( { selected = [], search = '', queryArgs = [] } ) => {
	const requests = getProductsRequests( { selected, search, queryArgs } );

	return Promise.all( requests.map( ( path ) => apiFetch( { path } ) ) ).then( ( data ) => {
		return uniqBy( flatten( data ), 'id' );
	} );
};
