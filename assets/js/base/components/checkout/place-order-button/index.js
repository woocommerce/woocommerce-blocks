/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { useCheckoutContext } from '@woocommerce/base-context/checkout-context';

const PlaceOrderButton = () => {
	const { placeOrderLabel, placeOrderAction } = useCheckoutContext();

	return (
		<Button
			className="wc-block-components-checkout-place-order-button"
			onClick={ placeOrderAction }
		>
			{ placeOrderLabel ||
				__( 'Place order', 'woo-gutenberg-products-block' ) }
		</Button>
	);
};

export default PlaceOrderButton;
