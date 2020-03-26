/**
 * External dependencies
 */
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import Button from '../button';

const PlaceOrderButton = () => {
	const {
		submitLabel,
		onSubmit,
		hasError,
		isCalculating,
	} = useCheckoutContext();

	return (
		<Button
			className="wc-block-components-checkout-place-order-button"
			onClick={ onSubmit }
			disabled={ hasError || isCalculating }
		>
			{ submitLabel }
		</Button>
	);
};

export default PlaceOrderButton;
