/**
 * External dependencies
 */

import { RequestUtils } from '@wordpress/e2e-test-utils-playwright';

/**
 * Internal dependencies
 */

export class StoreApiUtils {
	requestUtils: RequestUtils;
	constructor( requestUtils: RequestUtils ) {
		this.requestUtils = requestUtils;
	}

	async cleanCart() {
		return this.requestUtils.request.delete( `/wc/store/cart/items` );
	}
}
