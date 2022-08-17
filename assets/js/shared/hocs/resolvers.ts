/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/data-controls';

export function* getProduct( id: string ) {
	const path = `/wp-json/wc/store/v1/products/${ id }`;

	const product = yield apiFetch( { url: path } );
	return {
		type: 'GET_PRODUCT',
		product,
	};
}
