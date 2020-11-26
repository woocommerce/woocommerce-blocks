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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Tabs from '../tabs';
import PaymentMethodTab from './payment-method-tab';
import RadioControlAccordion from '../radio-control-accordion';

/**
 * Component used to render all non-saved payment method options.
 *
 * @return {*} The rendered component.
 */
const PaymentMethodOptions = () => {
	const {
		setActivePaymentMethod,
		activeSavedToken,
		setActiveSavedToken,
		expressPaymentMethods,
		customerPaymentMethods,
	} = usePaymentMethodDataContext();
	const { paymentMethods } = usePaymentMethods();
	const {
		activePaymentMethod,
		...paymentMethodInterface
	} = usePaymentMethodInterface();
	const expressPaymentMethodActive = Object.keys(
		expressPaymentMethods
	).includes( activePaymentMethod );
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
		setActivePaymentMethod( value );
		setActiveSavedToken( '' );
		removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
	};

	const customerHasSavedCards =
		Object.keys( customerPaymentMethods ).length > 0;
	const paymentMethodsSelectorUI =
		options.length > 2 || customerHasSavedCards ? (
			// Show radiobutton style UI if store has more than 2 payment methods.
			// If there are saved payment options, always show radiobutton style UI.
			<RadioControlAccordion
				id={ 'wc-payment-method-options' }
				selected={ activeSavedToken ? null : activePaymentMethod }
				onChange={ updateToken }
				options={ options }
			/>
		) : (
			// Show tab style UI if store has two payment methods (and no user saved cards).
			// Todo - show no selector UI if single payment method available.
			<Tabs
				className="wc-block-components-checkout-payment-methods"
				onSelect={ ( tabName ) => {
					setActivePaymentMethod( tabName );
					removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
				} }
				tabs={ Object.keys( paymentMethods ).map( ( name ) => {
					const {
						ariaLabel,
						edit,
						content,
						label,
						supports,
					} = paymentMethods[ name ];
					const component = isEditor ? edit : content;
					return {
						name,
						title:
							typeof label === 'string'
								? label
								: cloneElement( label, {
										components:
											paymentMethodInterface.components,
								  } ),
						ariaLabel,
						content: (
							<PaymentMethodTab
								allowsSaving={ supports.savePaymentInfo }
							>
								{ cloneElement( component, {
									activePaymentMethod,
									...paymentMethodInterface,
								} ) }
							</PaymentMethodTab>
						),
					};
				} ) }
				initialTabName={ activePaymentMethod }
				ariaLabel={ __(
					'Payment Methods',
					'woo-gutenberg-products-block'
				) }
				id="wc-block-payment-methods"
			/>
		);

	return expressPaymentMethodActive ? null : paymentMethodsSelectorUI;
};

export default PaymentMethodOptions;
