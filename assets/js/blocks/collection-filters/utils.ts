/**
 * External dependencies
 */
import { ProductCollectionQuery } from '@woocommerce/blocks/product-collection/types';

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

function mapTaxonomy( taxonomy: string ) {
	const map: Record< string, string > = {
		product_tag: 'tag',
		product_cat: 'cat',
	};

	return map[ taxonomy ] || `_unstable_tax_${ taxonomy }`;
}

function getTaxQueryMap( taxQuery: ProductCollectionQuery[ 'taxQuery' ] ) {
	return Object.entries( taxQuery ).map( ( [ taxonomy, terms ] ) => ( {
		[ mapTaxonomy( taxonomy ) ]: terms,
	} ) );
}

function getAttributeQuery(
	woocommerceAttributes: ProductCollectionQuery[ 'woocommerceAttributes' ]
) {
	if ( ! woocommerceAttributes ) {
		return {};
	}
	return {
		attributes: woocommerceAttributes.map( ( attribute ) => ( {
			attribute: attribute.taxonomy,
			term_id: attribute.termId,
		} ) ),
	};
}

export function formatQuery( query: ProductCollectionQuery ) {
	if ( ! query ) {
		return {};
	}

	const test = Object.assign(
		{},
		...sharedParams.map(
			( key ) => key in query && { [ key ]: query[ key ] }
		),
		...mappedParams.map(
			( param ) =>
				param.key in query && { [ param.map ]: query[ param.key ] }
		),
		...getTaxQueryMap( query.taxQuery ),
		getAttributeQuery( query.woocommerceAttributes )
	);
	return test;
}
