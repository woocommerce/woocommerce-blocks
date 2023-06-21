/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import type { ProductResponseItem } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import type { ProductItem } from './types';

type WooCommerceBlocksAPIproductResponse = ProductResponseItem;

const passProperties = ( input: ProductItem ) => {
	const {
		_links,
		backordered,
		backorders,
		backorders_allowed,
		button_text,
		...passedProperties
	} = input;
	return { ...passedProperties };
};

const createPricesProperty = ( input: WooCommerceAPIproductResponse ) => {
	// @todo: get actual currency data
	const currency = {
		currency_code: 'PLN',
		currency_symbol: 'z\u0142',
		currency_minor_unit: 2,
		currency_decimal_separator: ',',
		currency_thousand_separator: '',
		currency_prefix: '',
		currency_suffix: ' z\u0142',
	};
	// @todo: price is already formatted, not in a lowest currency unit as in store API
	const { price, regular_price, sale_price } = input;
	return {
		price,
		regular_price,
		sale_price,
		price_range: null,
		...currency,
	};
};

const createAddToCartProperty = ( input: WooCommerceAPIproductResponse ) => {
	const { id, name } = input;
	return {
		text: 'Add to cart',
		description: `Add &ldquo;${ name }&rdquo; to your cart`,
		url: `?add-to-cart=${ id }`,
		minimum: 1,
		maximum: 9999,
		multiple_of: 1,
	};
};

export const transformProductData = (
	input: WooCommerceAPIproductResponse
): WooCommerceBlocksAPIproductResponse => {
	const passedProperties = passProperties( input );
	return {
		...passedProperties,
		prices: createPricesProperty( input ),
		add_to_cart: createAddToCartProperty( input ),
	};
};

const defaultTransform = ( input: WooCommerceAPIproductResponse ) => input;

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
			const output = response.map( transform );

			return output;
		}

		return next( options );
	} );
};
