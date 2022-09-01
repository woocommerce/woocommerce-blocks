/**
 * External dependencies
 */

import apiFetch from '@wordpress/api-fetch';
import { doAction } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	ProductQueryArguments,
	ProductQueryBlock,
	QueryVariation,
} from './types';

/**
 * Identifies if a block is a Query block variation from our conventions
 *
 * We are extending Gutenberg's core Query block with our variations, and
 * also adding extra namespaced attributes. If those namespaced attributes
 * are present, we can be fairly sure it is our own registered variation.
 */
export function isWooQueryBlockVariation( block: ProductQueryBlock ) {
	return (
		block.name === 'core/query' &&
		block.attributes.__woocommerceVariationProps &&
		Object.values( QueryVariation ).includes(
			block.attributes.__woocommerceVariationProps
				.name as unknown as QueryVariation
		)
	);
}

/**
 * Sets the new query arguments of a Product Query block
 *
 * Because we add a new set of deeply nested attributes to the query
 * block, this utility function makes it easier to change just the
 * options relating to our custom query, while keeping the code
 * clean.
 */
export function setCustomQueryAttribute(
	block: ProductQueryBlock,
	attributes: Partial< ProductQueryArguments >
) {
	const { __woocommerceVariationProps } = block.attributes;

	block.setAttributes( {
		__woocommerceVariationProps: {
			...__woocommerceVariationProps,
			attributes: {
				...__woocommerceVariationProps.attributes,
				query: {
					...__woocommerceVariationProps.attributes?.query,
					...attributes,
				},
			},
		},
	} );
}

const getQueryArgumentsByCustomQuery = ( customQuery: string ) => {
	switch ( customQuery ) {
		case 'onSale':
			return 'on_sale=true';

		default:
			return '';
	}
};

export async function fetchAndRenderProducts( props: ProductQueryBlock ) {
	const customQueries = Object.entries(
		props.attributes.__woocommerceVariationProps.attributes?.query || {}
	);

	const queryArguments = customQueries.reduce( ( acc, [ key, value ] ) => {
		if ( value ) {
			return acc.concat( getQueryArgumentsByCustomQuery( key ) );
		}
		return acc;
	}, '' );

	const products = await apiFetch( {
		path: `/wc/store/v1/products?${ queryArguments }`,
	} );

	doAction(
		'hook_name',
		products?.map( ( product ) => ( {
			...product,
			type: 'product',
		} ) )
	);
}
