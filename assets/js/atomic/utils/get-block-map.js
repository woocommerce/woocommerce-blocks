/**
 * External dependencies
 */
import { getRegisteredInnerBlocks } from '@woocommerce/blocks-registry';
import {
	ProductTitle,
	ProductPrice,
	ProductButton,
	ProductImage,
	ProductRating,
	ProductSummary,
	ProductSaleBadge,
} from '@woocommerce/atomic-components/product';

/**
 * Map blocks names to components.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 */
export const getBlockMap = ( blockName ) => ( {
	'woocommerce/product-price': ProductPrice,
	'woocommerce/product-image': ProductImage,
	'woocommerce/product-title': ProductTitle,
	'woocommerce/product-rating': ProductRating,
	'woocommerce/product-button': ProductButton,
	'woocommerce/product-summary': ProductSummary,
	'woocommerce/product-sale-badge': ProductSaleBadge,
	...getRegisteredInnerBlocks( blockName ),
} );

/**
 * Get a list of allowed inner blocks for a block.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 */
export const getAllowedInnerBlocks = ( blockName ) => {
	return [ ...Object.keys( getBlockMap( blockName ) ) ];
};
