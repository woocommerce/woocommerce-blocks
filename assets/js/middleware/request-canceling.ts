/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

const controllerMap = new Map< string, AbortController >();

/**
 * Returns whether or not this is an idempotent wc/store API request.
 *
 */
const isIdempotentRequest = ( url: string, method: string ): boolean => {
	const idempotentRequests = {
		/* '/wc/store/v1/batch': [ 'POST' ], Batch should be deprecated after this.

		Hitting those endpoint several times would result in an error, but that error doesn't make sense and we can remove it and just return 201.
		'/wc/store/v1/cart/add-item': [ 'POST' ],
		'/wc/store/v1/cart/apply-coupon': [ 'POST' ],

		/* Those are legacy requests
		'/wc/store/v1/cart/coupons': [ 'GET', 'POST', 'DELETE' ],
		'/wc/store/v1/cart/coupons/(?P<code>[\\w-]+)': [ 'GET', 'DELETE' ],
		'/wc/store/v1/cart/items': [ 'GET', 'POST', 'DELETE' ],
		'/wc/store/v1/cart/items/(?P<key>[\\w-]{32})': [
			'GET',
			'POST',
			'PUT',
			'PATCH',
			'DELETE',
		],

		Would fail if already removed, maybe it should return 204 or cart instead of failing.
		'/wc/store/v1/cart/remove-coupon': [ 'POST' ],
		'/wc/store/v1/cart/remove-item': [ 'POST' ],

		'/wc/store/v1/cart/extensions': [ 'POST' ], Not safe to replay

		No chance to look into Product endpoints yet
		'/wc/store/v1/products/attributes': [ 'GET' ],
		'/wc/store/v1/products/attributes/(?P<id>[\\d]+)': [ 'GET' ],
		'/wc/store/v1/products/attributes/(?P<attribute_id>[\\d]+)/terms': [
			'GET',
		],
		'/wc/store/v1/products/categories': [ 'GET' ],
		'/wc/store/v1/products/categories/(?P<id>[\\d]+)': [ 'GET' ],
		'/wc/store/v1/products/collection-data': [ 'GET' ],
		'/wc/store/v1/products/reviews': [ 'GET' ],
		'/wc/store/v1/products/tags': [ 'GET' ],
		'/wc/store/v1/products': [ 'GET' ],
		'/wc/store/v1/products/(?P<id>[\\d]+)': [ 'GET' ],
		'/wc/store/v1/products/(?P<slug>[\\S]+)': [ 'GET' ],
		'/wc/store/v1/order/(?P<id>[\\d]+)': [ 'GET' ],
		'/wc/store/v1/checkout/(?P<id>[\\d]+)': [ 'POST' ],
		*/
		'/wc/store/v1/cart': [ 'GET' ],
		'/wc/store/v1/cart/select-shipping-rate': [ 'POST' ],
		'/wc/store/v1/cart/update-item': [ 'POST' ],
		'/wc/store/v1/cart/update-customer': [ 'POST' ],
		'/wc/store/v1/checkout': [
			'GET',
			/* POST several times is risky given we might have processed payment already.
			'POST'
			*/
		],
	};

	for ( const [ path, methods ] of Object.entries( idempotentRequests ) ) {
		if ( url && url.includes( path ) ) {
			if ( method && methods.includes( method ) ) {
				return true;
			}
		}
	}
	return false;
};

/**
 * Nonce middleware which appends the current nonce to store API requests.
 *
 * @param {Object}   options Fetch options.
 * @param {Function} next    The next middleware or fetchHandler to call.
 * @return {*} The evaluated result of the remaining middleware chain.
 */
const cancelRequestMiddleware = ( options, next ) => {
	const url = options.url || options.path;
	if ( isIdempotentRequest( url, options.method ) ) {
		let controller = controllerMap.get( url );

		if ( controller ) {
			controller.abort();
		}
		controller = new AbortController();
		controllerMap.set( url, controller );
		options.signal = controller.signal;
	}
	return next( options, next );
};

apiFetch.use( cancelRequestMiddleware );
