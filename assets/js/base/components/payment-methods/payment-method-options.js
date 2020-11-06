/**
 * External dependencies
 */
import {
	usePaymentMethods,
	usePaymentMethodInterface,
	useStoreNotices,
	useEmitResponse,
} from '@woocommerce/base-hooks';
import { cloneElement } from '@wordpress/element';
import {
	useEditorContext,
	usePaymentMethodDataContext,
} from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import PaymentMethodTab from './payment-method-tab';
import RadioControlAccordion from '../radio-control-accordion';

/**
 * Component used to render all non-saved payment method options.
 * 
 * @param {Object} props Incoming props for the component.
 * @param {function():any} props.onChange Function to call on the change event.
 * @param {string} props.selectedMethod Selected method. Empty strin means no method is selected.
 * @return {*} The rendered component.
 */
const PaymentMethodOptions = ( { onChange, selectedMethod = '' } ) => {
	const { setActivePaymentMethod } = usePaymentMethodDataContext();
	const { paymentMethods } = usePaymentMethods();
	const {
		activePaymentMethod,
		...paymentMethodInterface
	} = usePaymentMethodInterface();
	const { noticeContexts } = useEmitResponse();
	const { removeNotice } = useStoreNotices();
	const { isEditor } = useEditorContext();

	const options = Object.keys( paymentMethods ).map( ( name ) => {
		const { edit, content, label, supports } = paymentMethods[ name ];
		const component = isEditor ? edit : content;
		return {
			value: name,
			label:
				typeof label === 'string'
					? label
					: cloneElement( label, {
							components: paymentMethodInterface.components,
					  } ),
			name: `wc-saved-payment-method-token-${ name }`,
			content: (
				<PaymentMethodTab allowsSaving={ supports.savePaymentInfo }>
					{ cloneElement( component, {
						activePaymentMethod,
						...paymentMethodInterface,
					} ) }
				</PaymentMethodTab>
			),
		};
	} );

	const updateToken = ( value ) => {
		onChange( value );
		setActivePaymentMethod( value );
		removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
	};

	return (
		<RadioControlAccordion
			id={ 'wc-payment-method-options' }
			selected={ selectedMethod }
			onChange={ updateToken }
			options={ options }
		/>
	);
};

export default PaymentMethodOptions;
