/**
 * External dependencies
 */
import { usePaymentMethods } from '@woocommerce/base-hooks';
import { useCallback, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Label from '@woocommerce/base-components/label';
import { usePaymentMethodDataContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import NoPaymentMethods from './no-payment-methods';
import PaymentMethodOptions from './payment-method-options';
import SavedPaymentMethodOptions from './saved-payment-method-options';

/**
 * PaymentMethods component.
 *
 * @return {*} The rendered component.
 */
const PaymentMethods = () => {
	const { isInitialized, paymentMethods } = usePaymentMethods();
	const [ savedMethodsToken, setSavedMethodsToken ] = useState( '' );
	const [ paymentMethodsName, setPaymentMethodsName ] = useState( '' );
	const { customerPaymentMethods } = usePaymentMethodDataContext();

	const onChangeSavedMethods = useCallback(
		( token ) => {
			setSavedMethodsToken( token );
			setPaymentMethodsName( '' );
		},
		[ setSavedMethodsToken, setPaymentMethodsName ]
	);

	const onChangePaymentMethods = useCallback(
		( method ) => {
			setPaymentMethodsName( method );
			setSavedMethodsToken( '0' );
		},
		[ setSavedMethodsToken, setPaymentMethodsName ]
	);

	if ( isInitialized && Object.keys( paymentMethods ).length === 0 ) {
		return <NoPaymentMethods />;
	}

	return (
		<>
			<SavedPaymentMethodOptions
				selectedToken={ savedMethodsToken }
				onChange={ onChangeSavedMethods }
			/>
			{ Object.keys( customerPaymentMethods ).length > 0 && (
				<Label
					label={ __(
						'Use another payment method.',
						'woo-gutenberg-products-block'
					) }
					screenReaderLabel={ __(
						'Other available payment methods',
						'woo-gutenberg-products-block'
					) }
					wrapperElement="p"
					wrapperProps={ {
						className: [
							'wc-block-components-checkout-step__description wc-block-components-checkout-step__description-payments-aligned',
						],
					} }
				/>
			) }
			<PaymentMethodOptions
				selectedMethod={ paymentMethodsName }
				onChange={ onChangePaymentMethods }
			/>
		</>
	);
};

export default PaymentMethods;
