/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { WC_BLOCKS_ASSET_URL } from '@woocommerce/block-settings';

const NoMatchingProducts = ( { resetCallback = () => {} } ) => {
	return (
		<div className="wc-block-grid__no-products">
			<img
				src={ WC_BLOCKS_ASSET_URL + 'img/no-matching-products.svg' }
				alt={ __( 'No products', 'woo-gutenberg-products-block' ) }
				className="wc-block-grid__no-products-image"
			/>
			<strong className="wc-block-grid__no-products-title">
				{ __( 'No products found', 'woo-gutenberg-products-block' ) }
			</strong>
			<p className="wc-block-grid__no-products-description">
				{ __(
					'We were unable to find any results based on your search.',
					'woo-gutenberg-products-block'
				) }
			</p>
			<button onClick={ resetCallback }>
				{ __( 'Reset Search', 'woo-gutenberg-products-block' ) }
			</button>
		</div>
	);
};

export default NoMatchingProducts;
