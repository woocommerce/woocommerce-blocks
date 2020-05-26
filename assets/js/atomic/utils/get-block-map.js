/**
 * External dependencies
 */
import { getRegisteredInnerBlocks } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import ProductButton from '../blocks/product/button/frontend';
import ProductImage from '../blocks/product/image/frontend';
import ProductPrice from '../blocks/product/price/frontend';
import ProductRating from '../blocks/product/rating/frontend';
import ProductSaleBadge from '../blocks/product/sale-badge/frontend';
import ProductSummary from '../blocks/product/summary/frontend';
import ProductTitle from '../blocks/product/title/frontend';

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
