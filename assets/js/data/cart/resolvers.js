/**
 * External dependencies
 */
import { select } from '@wordpress/data-controls';
import { camelCase, mapKeys } from 'lodash';

/**
 * Internal dependencies
 */
import { receiveCart } from './actions';
import { STORE_KEY as COLLECTIONS_STORE_KEY } from '../collections/constants';

/**
 * Resolver for retrieving a collection via a api route.
 */
export function* getCartData() {
	const collectionData = yield select(
		COLLECTIONS_STORE_KEY,
		'getCollection',
		'/wc/store',
		'cart',
		[]
	);

	if ( ! collectionData ) {
		yield receiveCart();
		return;
	}

	const mappedCollectionData = mapKeys( collectionData, ( value, key ) => {
		return camelCase( key );
	} );

	yield receiveCart( mappedCollectionData );
}
