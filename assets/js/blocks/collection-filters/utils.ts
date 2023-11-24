/**
 * External dependencies
 */
import { objectHasProp } from '@woocommerce/types';
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import type { ProductCollectionQuery } from '~/blocks/product-collection/types';

function mergeAttributeParams(
	acc: Record< string, unknown >,
	innerBlock: BlockInstance
) {
	const current =
		( acc?.calculate_attribute_counts as Array< unknown > ) ?? [];
	acc.calculate_attribute_counts = [
		...current,
		innerBlock.attributes.queryParam.calculate_attribute_counts,
	];
	return acc;
}

function getInnerBlocksParams(
	block: BlockInstance,
	initial: Record< string, unknown > = {}
) {
	return block.innerBlocks.reduce(
		( acc, innerBlock ): Record< string, unknown > => {
			if (
				objectHasProp(
					innerBlock.attributes.queryParam,
					'calculate_attribute_counts'
				)
			) {
				acc = mergeAttributeParams( acc, innerBlock );
			} else {
				acc = { ...acc, ...innerBlock.attributes?.queryParam };
			}

			return getInnerBlocksParams( innerBlock, acc );
		},
		initial
	);
}

export function getQueryParams( block: BlockInstance | null ) {
	if ( ! block ) return {};

	return getInnerBlocksParams( block );
}

export const sharedParams: Array< keyof ProductCollectionQuery > = [
	'exclude',
	'offset',
	'search',
];

/**
 * There is an open dicussion around the shape of this object. Check it out on GH.
 *
 * @see {@link https://github.com/woocommerce/woocommerce-blocks/pull/11218#discussion_r1365171167 | #11218 review comment}.
 */
export const mappedParams: {
	key: keyof ProductCollectionQuery;
	map: string;
}[] = [
	{ key: 'woocommerceStockStatus', map: 'stock_status' },
	{ key: 'woocommerceOnSale', map: 'on_sale' },
	{ key: 'woocommerceHandPickedProducts', map: 'include' },
];

function mapTaxonomy( taxonomy: string ) {
	const map = {
		product_tag: 'tag',
		product_cat: 'cat',
	};

	return map[ taxonomy as keyof typeof map ] || `_unstable_tax_${ taxonomy }`;
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
	return woocommerceAttributes.map( ( attribute ) => ( {
		attribute: attribute.taxonomy,
		term_id: attribute.termId,
	} ) );
}

export function formatQuery( query: ProductCollectionQuery ) {
	if ( ! query ) {
		return {};
	}

	return Object.assign(
		{
			attributes: getAttributeQuery( query.woocommerceAttributes ),
			catalog_visibility: 'visible',
		},
		...sharedParams.map(
			( key ) => key in query && { [ key ]: query[ key ] }
		),
		...mappedParams.map(
			( param ) =>
				param.key in query && { [ param.map ]: query[ param.key ] }
		),
		...getTaxQueryMap( query.taxQuery )
	);
}
