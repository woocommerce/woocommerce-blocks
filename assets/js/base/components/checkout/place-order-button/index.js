/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { useCheckoutContext } from '@woocommerce/base-context';

const PlaceOrderButton = () => {
	const { submitLabel, onSubmit } = useCheckoutContext();

	return (
		<Button
			className="wc-block-components-checkout-place-order-button"
			onClick={ onSubmit }
		>
			{ submitLabel ||
				__( 'Place order', 'woo-gutenberg-products-block' ) }
		</Button>
	);
};

export default PlaceOrderButton;
