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

/**
 * Returns a payment method for the given context.
 *
 * @param {string} name The payment method slug to return.
 * @param {Object} paymentMethods The current registered payment methods
 * @param {boolean} isEditor Whether in the editor context (true) or not (false).
 *
 * @return {Object} The payment method matching the name for the given context.
 */
const getPaymentMethod = ( name, paymentMethods, isEditor ) => {
	let paymentMethod = paymentMethods[ name ] || null;
	if ( paymentMethod ) {
		paymentMethod = isEditor ? paymentMethod.edit : paymentMethod.content;
	}
	return paymentMethod;
};

const NewPaymentMethodTab = ( { selectedTab } ) => {
	const { isEditor } = useEditorContext();
	const {
		shouldSavePayment,
		setShouldSavePayment,
	} = usePaymentMethodDataContext();
	const { paymentMethods } = usePaymentMethods();
	const currentPaymentMethods = useRef( paymentMethods );
	const {
		activePaymentMethod,
		...paymentMethodInterface
	} = usePaymentMethodInterface();
	const currentPaymentMethodInterface = useRef( paymentMethodInterface );
	const { customerId } = useCheckoutContext();

	const paymentMethod = getPaymentMethod(
		selectedTab,
		currentPaymentMethods.current,
		isEditor
	);

	if ( ! paymentMethod || ! activePaymentMethod ) {
		return null;
	}

	const { supports = {} } =
		paymentMethod && currentPaymentMethods.current[ activePaymentMethod ]
			? currentPaymentMethods.current[ activePaymentMethod ]
			: {};

	return (
		<PaymentMethodErrorBoundary isEditor={ isEditor }>
			{ cloneElement( paymentMethod, {
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
