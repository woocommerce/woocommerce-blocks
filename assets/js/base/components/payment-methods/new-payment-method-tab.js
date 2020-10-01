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

/**
 * Internal dependencies
 */
import PaymentMethodErrorBoundary from './payment-method-error-boundary';

const NewPaymentMethodTab = ( { children, allowsSaving } ) => {
	const { isEditor } = useEditorContext();
	const {
		shouldSavePayment,
		setShouldSavePayment,
	} = usePaymentMethodDataContext();
	const { customerId } = useCheckoutContext();

	return (
		<PaymentMethodErrorBoundary isEditor={ isEditor }>
			{ children }
			{ customerId > 0 && allowsSaving && (
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

export default NewPaymentMethodTab;
