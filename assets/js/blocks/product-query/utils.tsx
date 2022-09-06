/**
 * External dependencies
 */
import { addFilter } from '@wordpress/hooks';

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

const getQueryArgumentsByCustomQuery = ( key: string, value: string ) => {
	switch ( key ) {
		case 'onSale':
			return {
				on_sale: value,
			};
		case 'offset':
			return {
				offset: value,
			};
		case 'perPage':
			return {
				per_page: value,
			};

		default:
			return {};
	}
};

export function fetchAndRenderProducts( props: ProductQueryBlock ) {
	const customQueries = Object.entries(
		props?.attributes?.__woocommerceVariationProps?.attributes?.query || {}
	);

	const stockQueries = Object.entries( props?.attributes?.query );
	const queryArguments = [ ...customQueries, ...stockQueries ].reduce(
		( acc, [ key, value ] ) => {
			return {
				...acc,
				...getQueryArgumentsByCustomQuery( key, value ),
			};
		},
		{}
	);

	addFilter( 'query.entityRecordsArgs', 'core/query', ( { query } ) => ( {
		usedPostType: 'products',
		postType: 'root',
		query: { ...query, ...queryArguments },
	} ) );
}
