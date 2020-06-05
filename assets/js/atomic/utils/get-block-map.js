/**
 * External dependencies
 */
import { getRegisteredInnerBlocks } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import ProductButton from '../blocks/product/button/block';
import ProductImage from '../blocks/product/image/frontend';
import ProductPrice from '../blocks/product/price/block';
import ProductRating from '../blocks/product/rating/block';
import ProductSaleBadge from '../blocks/product/sale-badge/block';
import ProductSummary from '../blocks/product/summary/block';
import ProductTitle from '../blocks/product/title/frontend';

/**
 * Map blocks to components suitable for use onm the frontend.
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
