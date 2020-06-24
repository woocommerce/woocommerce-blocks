/**
 * External dependencies
 */
import { registerBlockComponent } from '@woocommerce/blocks-registry';
import { lazy } from '@wordpress/element';
import { WC_BLOCKS_BUILD_URL } from '@woocommerce/block-settings';

// Modify webpack pubilcPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = WC_BLOCKS_BUILD_URL;

const ProductTitle = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-title" */ './product/title/frontend'
	)
);
const ProductPrice = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-price" */ './product/price/block'
	)
);
const ProductButton = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-button" */ './product/button/block'
	)
);
const ProductImage = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-image" */ './product/image/frontend'
	)
);
const ProductRating = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-rating" */ './product/rating/block'
	)
);
const ProductSummary = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-summary" */ './product/summary/block'
	)
);
const ProductSaleBadge = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-sale-badge" */ './product/sale-badge/block'
	)
);
const ProductSku = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-sku" */ './product/sku/block'
	)
);
const ProductCategoryList = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-category-list" */ './product/category-list/block'
	)
);
const ProductTagList = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-tag-list" */ './product/tag-list/block'
	)
);
const ProductStockIndicator = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-stock-indicator" */ './product/stock-indicator/block'
	)
);
const ProductAddToCart = lazy( () =>
	import(
		/* webpackChunkName: "atomic-block-components-add-to-cart" */ './product/add-to-cart/frontend'
	)
);

registerBlockComponent( {
	blockName: 'woocommerce/product-price',
	component: ProductPrice,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-image',
	component: ProductImage,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-title',
	component: ProductTitle,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-rating',
	component: ProductRating,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-button',
	component: ProductButton,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-summary',
	component: ProductSummary,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-sale-badge',
	component: ProductSaleBadge,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-sku',
	component: ProductSku,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-category-list',
	component: ProductCategoryList,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-tag-list',
	component: ProductTagList,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-stock-indicator',
	component: ProductStockIndicator,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-add-to-cart',
	component: ProductAddToCart,
} );
