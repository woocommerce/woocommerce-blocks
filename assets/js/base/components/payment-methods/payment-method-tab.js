/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useCheckoutContext,
	useEditorContext,
	usePaymentMethodDataContext,
} from '@woocommerce/base-context';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import PaymentMethodErrorBoundary from './payment-method-error-boundary';

/**
 * Component used to render the contents of a payment method tab.
 *
 * @param {Object}  props              Incoming props for the component.
 * @param {boolean} props.allowsSaving Whether that payment method allows saving
 *                                     the data for future purchases.
 * @param {boolean} props.displaySavePaymentMethodCheckbox Whether the payment method should display the option to save
 * 														   the details entered by the customer.
 * @param {Object}  props.children     Content of the payment method tab.
 *
 * @return {*} The rendered component.
 */
const PaymentMethodTab = ( {
	children,
	allowsSaving,
	displaySavePaymentMethodCheckbox,
} ) => {
	const { isEditor } = useEditorContext();
	const {
		shouldSavePayment,
		setShouldSavePayment,
	} = usePaymentMethodDataContext();
	const { customerId } = useCheckoutContext();

	return (
		<PaymentMethodErrorBoundary isEditor={ isEditor }>
			{ children }
			{ customerId > 0 &&
				allowsSaving &&
				displaySavePaymentMethodCheckbox && (
					<CheckboxControl
						className="wc-block-components-payment-methods__save-card-info"
						label={ __(
							'Save payment information to my account for future purchases.',
							'woo-gutenberg-products-block'
						) }
						checked={ shouldSavePayment }
						onChange={ () =>
							setShouldSavePayment( ! shouldSavePayment )
						}
					/>
				) }
		</PaymentMethodErrorBoundary>
	);
};

PaymentMethodTab.propTypes = {
	allowsSaving: PropTypes.bool,
	displaySavePaymentMethodCheckbox: PropTypes.bool,
	children: PropTypes.node,
};

export default PaymentMethodTab;
