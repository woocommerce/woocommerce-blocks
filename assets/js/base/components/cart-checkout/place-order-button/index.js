/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import Button from '../button';

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
