/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCheckoutContext } from '@woocommerce/base-context';
import { Icon, done } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import Button from '../../button';

const PlaceOrderButton = () => {
	const {
		submitLabel,
		onSubmit,
		isCalculating,
		isProcessing,
		isProcessingComplete,
		isComplete,
		hasError,
	} = useCheckoutContext();

	const processing = isProcessing || isProcessingComplete;
	const completed = isComplete && ! hasError;

	return (
		<Button
			className="wc-block-components-checkout-place-order-button"
			onClick={ onSubmit }
			disabled={ isCalculating || processing || completed }
			showSpinner={ processing }
		>
			{ completed ? (
				<Icon
					srcElement={ done }
					alt={ __( 'Done', 'woo-gutenberg-products-block' ) }
				/>
			) : (
				submitLabel
			) }
		</Button>
	);
};

export default PlaceOrderButton;
