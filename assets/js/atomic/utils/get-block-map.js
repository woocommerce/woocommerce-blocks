/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
import withFilteredAttributes from '@woocommerce/base-hocs/with-filtered-attributes';
import { getRegisteredInnerBlocks } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import ProductButton from '../blocks/product/button/block';
import ProductImage from '../blocks/product/image/block';
import ProductPrice from '../blocks/product/price/block';
import ProductRating from '../blocks/product/rating/block';
import ProductSaleBadge from '../blocks/product/sale-badge/block';
import ProductSummary from '../blocks/product/summary/block';
import ProductTitle from '../blocks/product/title/block';
import ProductImageAttributes from '../blocks/product/image/attributes';
import ProductTitleAttributes from '../blocks/product/title/attributes';

/**
 * Map blocks to components suitable for use onm the frontend.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 */
export const getBlockMap = ( blockName ) => ( {
	'woocommerce/product-price': ProductPrice,
	'woocommerce/product-image': compose(
		withFilteredAttributes( ProductImageAttributes )
	)( ProductImage ),
	'woocommerce/product-title': compose(
		withFilteredAttributes( ProductTitleAttributes )
	)( ProductTitle ),
	'woocommerce/product-rating': ProductRating,
	'woocommerce/product-button': ProductButton,
	'woocommerce/product-summary': ProductSummary,
	'woocommerce/product-sale-badge': ProductSaleBadge,
	...getRegisteredInnerBlocks( blockName ),
} );
