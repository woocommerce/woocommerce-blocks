/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';

const PlaceOrderButton = () => {
	return (
		<Button className="wc-block-components-checkout-place-order-button">
			{ __( 'Place order', 'woo-gutenberg-products-block' ) }
		</Button>
	);
};

export default PlaceOrderButton;
