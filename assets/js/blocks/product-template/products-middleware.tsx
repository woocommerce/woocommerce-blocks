/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

export const productApiFetchMiddleware = () => {
	apiFetch.use( ( options, next ) => {
		const regex = /^\/wp\/v2\/product.*isProductCollectionBlock=true/;

		if ( options.path && regex.test( options?.path ) ) {
			const from = '/wp/v2/product';
			const to = '/wc/store/v1/products';
			const amendedPath = options.path.replace( from, to );
			return next( { ...options, path: amendedPath } );
		}

		return next( options );
	} );
};
