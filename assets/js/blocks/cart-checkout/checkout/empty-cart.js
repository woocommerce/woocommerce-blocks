/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { WC_BLOCKS_ASSET_URL, SHOP_URL } from '@woocommerce/block-settings';

const EmptyCart = () => {
	return (
		<div className="wc-block-checkout-empty">
			<img
				src={ WC_BLOCKS_ASSET_URL + 'img/no-products.svg' }
				alt={ __( 'No products', 'woo-gutenberg-products-block' ) }
				className="wc-block-checkout-empty__image"
			/>
			<strong className="wc-block-checkout-empty__title">
				{ __( 'Your cart is empty!', 'woo-gutenberg-products-block' ) }
			</strong>
			<p className="wc-block-checkout-empty__description">
				{ __(
					'Checkout is not available whilst your cart is empty. Add some products to your cart and come back later!',
					'woo-gutenberg-products-block'
				) }
			</p>
			<span className="wp-block-button">
				<a href={ SHOP_URL } className="wp-block-button__link">
					{ __( 'Browse store', 'woo-gutenberg-products-block' ) }
				</a>
			</span>
		</div>
	);
};

export default EmptyCart;
