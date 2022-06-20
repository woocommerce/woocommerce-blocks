/**
 * External dependencies
 */
import { getQueryArgs } from '@wordpress/url';
import { setWith, clone } from 'lodash';

const modifyResponse = ( response, queryString ) => {
	if ( ! response?.items ) {
		return response;
	}

	const prices = response.items.map( ( item ) => {
		if ( ! item.prices.price_range ) {
			return {
				min: parseInt( item.prices.price, 10 ),
				max: parseInt( item.prices.price, 10 ),
			};
		}

		return {
			min: parseInt( item.prices.price_range.min_amount, 10 ),
			max: parseInt( item.prices.price_range.max_amount, 10 ),
		};
	} );

	const query = getQueryArgs( `/${ queryString }` );

	response.priceRange = {
		min: [
			query?.min_price ? parseInt( query.min_price, 10 ) : 0,
			Math.min( ...prices.map( ( price ) => price.min ) ),
		],
		max: [
			Math.max( ...prices.map( ( price ) => price.max ) ),
			query?.max_price ? parseInt( query.max_price, 10 ) : 999999999,
		],
	};

	return response;
};

/**
 * Utility for updating state and only cloning objects in the path that changed.
 *
 * @param {Object} state The state being updated
 * @param {Array}  path  The path being updated
 * @param {*}      value The value to update for the path
 *
 * @return {Object} The new state
 */
export default function updateState( state, path, value ) {
	const [ namespace, resourceName, ...rest ] = path;
	if ( namespace !== '/wc/store/v1' || resourceName !== 'products' ) {
		return setWith( clone( state ), path, value, clone );
	}

	const [ ids, queryString ] = rest;
	if ( ids !== '[]' ) {
		return setWith( clone( state ), path, value, clone );
	}

	return setWith(
		clone( state ),
		path,
		modifyResponse( value, queryString ),
		clone
	);
}
