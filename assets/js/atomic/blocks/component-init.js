/**
 * External dependencies
 */
import { registerBlockComponent } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import ProductButton from './product/button/block';
import ProductImage from './product/image/frontend';
import ProductPrice from './product/price/block';
import ProductRating from './product/rating/block';
import ProductSaleBadge from './product/sale-badge/block';
import ProductSummary from './product/summary/block';
import ProductTitle from './product/title/frontend';
import ProductSku from './product/sku/block';
import ProductAddToCartForm from './product/add-to-cart-form/block';
import ProductAddToCartFormButton from './product/add-to-cart-form/button/frontend';

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
	blockName: 'woocommerce/product-add-to-cart-form',
	component: ProductAddToCartForm,
} );

registerBlockComponent( {
	blockName: 'woocommerce/product-add-to-cart-form-button',
	component: ProductAddToCartFormButton,
} );
