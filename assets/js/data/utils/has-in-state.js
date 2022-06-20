/**
 * External dependencies
 */
import { getQueryArg } from '@wordpress/url';
import { has, inRange } from 'lodash';

/**
 * Utility for returning whether the given path exists in the state.
 *
 * @param {Object} state The state being checked
 * @param {Array}  path  The path to check
 *
 * @return {boolean} True means this exists in the state.
 */
export default function hasInState( state, path ) {
	const [ namespace, resourceName, ...rest ] = path;
	if (
		namespace !== '/wc/store/v1' ||
		resourceName !== 'products' ||
		! has( state, [ namespace, resourceName ] )
	) {
		return has( state, path );
	}

	if ( has( state, path ) ) {
		return true;
	}

	const [ ids, queryString ] = rest;
	if ( ids !== '[]' ) {
		return has( state, path );
	}

	const minPriceQuery = getQueryArg( `/${ queryString }`, 'min_price' );
	const maxPriceQuery = getQueryArg( `/${ queryString }`, 'max_price' );

	if ( ! minPriceQuery && ! maxPriceQuery ) {
		return has( state, path );
	}

	const cachedResults = state[ namespace ][ resourceName ][ ids ];

	const potential = Object.keys( cachedResults ).filter( ( key ) => {
		if ( minPriceQuery && maxPriceQuery ) {
			return (
				key.includes( 'min_price' ) &&
				key.includes( 'max_price' ) &&
				key
					.replace( /&max_price=[^&]*/, '' )
					.replace( /&min_price=[^&]*/, '' ) ===
					queryString
						.replace( /&max_price=[^&]*/, '' )
						.replace( /&min_price=[^&]*/, '' )
			);
		} else if ( maxPriceQuery ) {
			return (
				key.includes( 'max_price' ) &&
				key.replace( /&max_price=[^&]*/, '' ) ===
					queryString.replace( /&max_price=[^&]*/, '' )
			);
		} else if ( minPriceQuery ) {
			return (
				key.includes( 'min_price' ) &&
				key.replace( /&min_price=[^&]*/, '' ) ===
					queryString.replace( /&min_price=[^&]*/, '' )
			);
		}
		return false;
	} );

	if ( potential.length === 0 ) {
		return has( state, path );
	}

	const result = potential.find( ( key ) => {
		const cachedResult = cachedResults[ key ];
		if ( minPriceQuery && maxPriceQuery ) {
			return (
				inRange(
					parseInt( minPriceQuery, 10 ),
					...cachedResult.priceRange.min
				) &&
				inRange(
					parseInt( maxPriceQuery, 10 ),
					...cachedResult.priceRange.max
				)
			);
		} else if ( maxPriceQuery ) {
			return inRange(
				parseInt( maxPriceQuery, 10 ),
				...cachedResult.priceRange.max
			);
		} else if ( minPriceQuery ) {
			return inRange(
				parseInt( minPriceQuery, 10 ),
				...cachedResult.priceRange.min
			);
		}
		return false;
	} );

	if ( result ) {
		return cachedResults[ result ];
	}

	return has( state, path );
}
