/**
 * External dependencies
 */
import {
	usePaymentMethods,
	usePaymentMethodInterface,
} from '@woocommerce/base-hooks';
import { cloneElement, useRef } from '@wordpress/element';
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

const NewPaymentMethodTab = ( { paymentMethodName } ) => {
	const { isEditor } = useEditorContext();
	const {
		shouldSavePayment,
		setShouldSavePayment,
	} = usePaymentMethodDataContext();
	const { paymentMethods } = usePaymentMethods();
	const currentPaymentMethods = useRef( paymentMethods );
	const currentPaymentMethod =
		currentPaymentMethods.current[ paymentMethodName ] || {};
	const {
		activePaymentMethod,
		...paymentMethodInterface
	} = usePaymentMethodInterface();
	const currentPaymentMethodInterface = useRef( paymentMethodInterface );
	const { customerId } = useCheckoutContext();

	const paymentMethodComponent = isEditor
		? currentPaymentMethod?.edit
		: currentPaymentMethod?.content;

	if ( ! paymentMethodComponent ) {
		return null;
	}

	const { supports = {} } = currentPaymentMethod;

	return (
		<PaymentMethodErrorBoundary isEditor={ isEditor }>
			{ cloneElement( paymentMethodComponent, {
				activePaymentMethod,
				...currentPaymentMethodInterface.current,
			} ) }
			{ customerId > 0 && supports.savePaymentInfo && (
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
