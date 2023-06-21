/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

interface ProductsStoreAPIData {
	id: number;
}
interface ProductsOutputData {
	id: number;
}

const transformProductData = (
	input: ProductsStoreAPIData
): ProductsOutputData => {
	return input;
};

export const productApiFetchMiddleware = () => {
	apiFetch.use( async ( options, next ) => {
		const regex = /^\/wp\/v2\/product.*isProductCollectionBlock=true/;

		if ( options.path && regex.test( options?.path ) ) {
			const from = '/wp/v2/product';
			const to = '/wc/store/v1/products';
			const amendedPath = options.path.replace( from, to );
			const response = await next( { ...options, path: amendedPath } );
			const transformedData = transformProductData( response );

			return transformedData;
		}

		return next( options );
	} );
};
