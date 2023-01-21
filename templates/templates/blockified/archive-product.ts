/**
 * External dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	INNER_BLOCKS_TEMPLATE as productsInnerBlocksTemplate,
	QUERY_DEFAULT_ATTRIBUTES as productsQueryDefaultAttributes,
} from '../../../assets/js/blocks/product-query/constants';
import { VARIATION_NAME as productsVariationName } from '../../../assets/js/blocks/product-query/variations/product-query';

const productArchiveClassName = 'woo-blocks-product-archive-template';
const commonAttributes = {
	className: productArchiveClassName,
};

const createProductsBlock = () =>
	createBlock(
		'core/query',
		{
			...productsQueryDefaultAttributes,
			...commonAttributes,
			namespace: productsVariationName,
		},
		createBlocksFromInnerBlocksTemplate( productsInnerBlocksTemplate )
	);

export const getProductArchiveTemplate = () => [
	createBlock( 'woocommerce/store-notices', commonAttributes ),
	createBlock( 'woocommerce/product-results-count', commonAttributes ),
	createBlock( 'woocommerce/catalog-sorting', commonAttributes ),
	createProductsBlock(),
];
