/**
 * External dependencies
 */
import { lazy } from '@wordpress/element';
import { WC_BLOCKS_BUILD_URL } from '@woocommerce/block-settings';

// Modify webpack pubilcPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

/**
 * Internal dependencies
 */
export const ProductTitle = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-title" */ './title/block'
	)
);
export const ProductPrice = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-price" */ './price/block'
	)
);
export const ProductButton = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-button" */ './button/block'
	)
);
export const ProductImage = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-image" */ './image/block'
	)
);
export const ProductRating = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-rating" */ './rating/block'
	)
);
export const ProductSummary = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-summary" */ './summary/block'
	)
);
export const ProductSaleBadge = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-sale-badge" */ './sale-badge/block'
	)
);
