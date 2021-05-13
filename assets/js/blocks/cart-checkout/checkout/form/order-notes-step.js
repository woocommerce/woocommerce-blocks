/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormStep } from '@woocommerce/base-components/cart-checkout';
import { useShippingDataContext } from '@woocommerce/base-context';
import {
	useCheckoutContext,
	setOrderNotes,
} from '@woocommerce/base-context/providers/cart-checkout/checkout-state';

/**
 * Internal dependencies
 */
import CheckoutOrderNotes from './order-notes';

const OrderNotesStep = () => {
	const { needsShipping } = useShippingDataContext();
	const {
		isProcessing: checkoutIsProcessing,
		orderNotes,
		dispatch,
	} = useCheckoutContext();

	return (
		<FormStep
			id="order-notes"
			showStepNumber={ false }
			className="wc-block-checkout__order-notes"
			disabled={ checkoutIsProcessing }
		>
			<CheckoutOrderNotes
				disabled={ checkoutIsProcessing }
				onChange={ ( value ) => {
					setOrderNotes( dispatch, value );
				} }
				placeholder={
					needsShipping
						? __(
								'Notes about your order, e.g. special notes for delivery.',
								'woo-gutenberg-products-block'
						  )
						: __(
								'Notes about your order.',
								'woo-gutenberg-products-block'
						  )
				}
				value={ orderNotes }
			/>
		</FormStep>
	);
};

export default OrderNotesStep;
