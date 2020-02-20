/**
 * External dependencies
 */
import { select } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { receiveCart } from './actions';
import { STORE_KEY as COLLECTIONS_STORE_KEY } from '../collections/constants';

/**
 * Resolver for retrieving a collection via a api route.
 */
export function* getCart() {
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

	yield receiveCart( collectionData );
}
