/**
 * External dependencies
 */
import { ProductCollectionQuery } from '@woocommerce/blocks/product-collection/types';

function taxonomyMapper( taxonomy: string ) {
	const map: Record< string, string > = {
		product_tag: 'tag',
		product_cat: 'cat',
	};

	return taxonomy in map ? map[ taxonomy ] : `_unstable_tax_${ taxonomy }`;
}

export function formatQuery( query: ProductCollectionQuery ) {
	if ( ! query ) {
		return {};
	}

	const sharedParams: Array< keyof ProductCollectionQuery > = [
		'exclude',
		'offset',
		'order',
		'search',
	];

	const mappedParams: { key: keyof ProductCollectionQuery; map: string }[] = [
		{ key: 'orderBy', map: 'orderby' },
		{ key: 'pages', map: 'page' },
		{ key: 'parents', map: 'parent' },
		{ key: 'perPage', map: 'per_page' },
		{ key: 'woocommerceStockStatus', map: 'stock_status' },
		{ key: 'woocommerceOnSale', map: 'on_sale' },
		{ key: 'woocommerceHandPickedProducts', map: 'include' },
	];

	return Object.assign(
		{},
		...sharedParams.map(
			( key ) => key in query && { [ key ]: query[ key ] }
		),
		...mappedParams.map(
			( param ) =>
				param.key in query && { [ param.map ]: query[ param.key ] }
		),
		...Object.entries( query.taxQuery ).map( ( [ taxonomy, terms ] ) => ( {
			[ taxonomyMapper( taxonomy ) ]: terms,
		} ) ),
		'woocommerceAttributes' in query && {
			attributes: query.woocommerceAttributes.map( ( attribute ) => ( {
				attribute: attribute.taxonomy,
				term_id: attribute.termId,
			} ) ),
		}
	);
}
