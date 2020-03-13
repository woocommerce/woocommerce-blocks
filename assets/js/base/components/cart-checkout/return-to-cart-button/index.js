/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { CART_URL, ALL_PAGES } from '@woocommerce/block-settings';
import { Icon, arrowBack } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import './style.scss';

const ReturnToCartButton = ( { page = 0 } ) => {
	const href =
		page && ALL_PAGES[ page ] ? ALL_PAGES[ page ].permalink : CART_URL;
	return (
		<a
			href={ href }
			className="wc-block-components-checkout-return-to-cart-button"
		>
			<Icon srcElement={ arrowBack } />
			{ __( 'Return to Cart', 'woo-gutenberg-products-block' ) }
		</a>
	);
};

export default ReturnToCartButton;
