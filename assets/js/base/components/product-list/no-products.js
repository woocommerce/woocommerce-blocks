/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { WC_BLOCKS_ASSET_URL } from '@woocommerce/block-settings';

const noProducts = () => {
	return (
		<div className="wc-block-grid__no-products">
			<img
				src={ WC_BLOCKS_ASSET_URL + 'img/no-products.svg' }
				alt={ __( 'No products', 'woo-gutenberg-products-block' ) }
				className="wc-block-grid__no-products-image"
			/>
			<strong className="wc-block-grid__no-products-title">
				{ __( 'No products', 'woo-gutenberg-products-block' ) }
			</strong>
			<p className="wc-block-grid__no-products-description">
				{ __(
					'There are currently no products available to display.',
					'woo-gutenberg-products-block'
				) }
			</p>
		</div>
	);
};

export default noProducts;
