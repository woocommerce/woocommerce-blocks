/**
 * External dependencies
 */
import { getRegisteredInnerBlocks } from '@woocommerce/blocks-registry';
import { lazy } from '@wordpress/element';
import { WC_BLOCKS_BUILD_URL } from '@woocommerce/block-settings';

// Modify webpack pubilcPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

/**
 * Internal dependencies
 */
const ProductTitle = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-title" */ '../blocks/product/title/block'
	)
);
const ProductPrice = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-price" */ '../blocks/product/price/block'
	)
);
const ProductButton = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-button" */ '../blocks/product/button/block'
	)
);
const ProductImage = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-image" */ '../blocks/product/image/block'
	)
);
const ProductRating = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-rating" */ '../blocks/product/rating/block'
	)
);
const ProductSummary = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-summary" */ '../blocks/product/summary/block'
	)
);
const ProductSaleBadge = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-sale-badge" */ '../blocks/product/sale-badge/block'
	)
);

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
