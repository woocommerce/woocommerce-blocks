/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormStep } from '@woocommerce/base-components/cart-checkout';
import { StoreNoticesProvider } from '@woocommerce/base-context';
import { usePaymentMethods, useStoreCart } from '@woocommerce/base-hooks';
import { PaymentMethods } from '@woocommerce/base-components/payment-methods';
import PropTypes from 'prop-types';

const PaymentMethodStep = ( { disabled } ) => {
	const { cartNeedsPayment } = useStoreCart();
	const { paymentMethods } = usePaymentMethods();

	if ( ! cartNeedsPayment ) {
		return null;
	}

	return (
		<FormStep
			id="payment-method"
			disabled={ disabled }
			className="wc-block-checkout__payment-method"
			title={ __( 'Payment method', 'woo-gutenberg-products-block' ) }
			description={
				Object.keys( paymentMethods ).length > 1
					? __(
							'Select a payment method below.',
							'woo-gutenberg-products-block'
					  )
					: ''
			}
		>
			<StoreNoticesProvider context="wc/payment-area">
				<PaymentMethods />
			</StoreNoticesProvider>
		</FormStep>
	);
};

PaymentMethodStep.propTypes = {
	disabled: PropTypes.bool.isRequired,
};

export default PaymentMethodStep;
