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
	const propertiesToCopy = [
		'attributes',
		'average_rating',
		'has_options',
		'id',
		'name',
		'on_sale',
		'permalink',
		'price_html',
		'sku',
		'slug',
		'sold_individually',
		'tags',
		'type',
		'variations',
	];
	return Object.keys( input ).reduce( ( acc, key ) => {
		if ( propertiesToCopy.includes( key ) ) {
			return { ...acc, [ key ]: input[ key ] };
		}
		return acc;
	}, {} );
};

const createPricesProperty = ( input: ProductItem ) => {
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

const createAddToCartProperty = ( input: ProductItem ) => {
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

const createCategoriesProperty = ( input: ProductItem ) => {
	const { categories } = input;
	const adjustCategory = ( category ) => {
		// @todo: Add category link
		return category;
	};
	return categories.map( adjustCategory );
};

const createDescriptionProperty = ( input: ProductItem ) => {
	const { description } = input;
	return `<p>${ description }</p>`;
};

const createShortDescriptionProperty = ( input: ProductItem ) => {
	const { short_description } = input;
	return `<p>${ short_description }</p>`;
};

const createImagesProperty = ( input: ProductItem ) => {
	const { images } = input;
	const adjustImage = ( image ) => {
		const {
			date_created,
			date_created_gmt,
			date_modified,
			date_modified_gmt,
			...rest
		} = image;
		return {
			...rest,
			sizes: '(max-width: 800px) 100vw, 800px',
			srcset: 'http://another-try.local/wp-content/uploads/2023/04/album-1.jpg 800w, http://another-try.local/wp-content/uploads/2023/04/album-1-450x450.jpg 450w, http://another-try.local/wp-content/uploads/2023/04/album-1-100x100.jpg 100w, http://another-try.local/wp-content/uploads/2023/04/album-1-600x600.jpg 600w, http://another-try.local/wp-content/uploads/2023/04/album-1-300x300.jpg 300w, http://another-try.local/wp-content/uploads/2023/04/album-1-150x150.jpg 150w, http://another-try.local/wp-content/uploads/2023/04/album-1-768x768.jpg 768w',
			thumbnail: image.src,
		};
	};
	return images.map( adjustImage );
};

export const transformProductData = (
	input: ProductItem
): WooCommerceBlocksAPIproductResponse => {
	const passedProperties = passProperties( input );
	return {
		...passedProperties,
		prices: createPricesProperty( input ),
		add_to_cart: createAddToCartProperty( input ),
		categories: createCategoriesProperty( input ),
		description: createDescriptionProperty( input ),
		short_description: createShortDescriptionProperty( input ),
		images: createImagesProperty( input ),
		is_in_stock: input.stock_status === 'instock',
		is_on_backorder: input.stock_status === 'onbackorder',
		is_purchasable: input.purchasable,
		low_stock_remaining: input.low_stock_amount,
		parent: input.parent_id,
		review_count: input.rating_count,
		variation: '',
		extensions: {},
	};
};

const defaultTransform = ( input: ProductItem ) => input;

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
