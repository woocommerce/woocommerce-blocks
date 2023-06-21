/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import type {
	SimpleProduct,
	ExternalProduct,
	GroupedProduct,
	VariableProduct,
} from '@woocommerce/api';
import type { ProductResponseItem } from '@woocommerce/types';

type WooCommerceAPIproductsResponse = Array<
	SimpleProduct | ExternalProduct | GroupedProduct | VariableProduct
>;

type WooCommerceBlocksAPIproductsResponse = Array< ProductResponseItem >;

export const transformProductData = (
	input: WooCommerceAPIproductsResponse
): WooCommerceBlocksAPIproductsResponse => {
	return input;
};

const defaultTransform = ( input: WooCommerceAPIproductsResponse ) => input;

export const productCollectionApiFetchMiddleware = (
	transform = defaultTransform
) => {
	apiFetch.use( async ( options, next ) => {
		const regex = /^\/wp\/v2\/product.*isProductCollectionBlock=true/;

		if ( options.path && regex.test( options?.path ) ) {
			const from = '/wp/v2/product';
			const to = '/wc/v3/products';

			const amendedPath = options.path.replace( from, to );
			const response = await next( { ...options, path: amendedPath } );

			return transform( response );
		}

		return next( options );
	} );
};
