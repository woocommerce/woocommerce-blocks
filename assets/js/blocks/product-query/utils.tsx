/**
 * Internal dependencies
 */
import {
	ProductQueryArguments,
	ProductQueryBlock,
	QueryVariation,
} from './types';

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
