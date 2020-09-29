/**
 * External dependencies
 */
import {
	usePaymentMethods,
	usePaymentMethodInterface,
	useStoreNotices,
	useEmitResponse,
} from '@woocommerce/base-hooks';
import { cloneElement, useRef, useCallback } from '@wordpress/element';
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
import Tabs from '../tabs';
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

const NewPaymentMethodOptions = () => {
	const { isEditor } = useEditorContext();
	const {
		setActivePaymentMethod,
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
	const { noticeContexts } = useEmitResponse();
	const { removeNotice } = useStoreNotices();
	const { customerId } = useCheckoutContext();

	const getRenderedTab = useCallback(
		( selectedTab ) => {
			const paymentMethod = getPaymentMethod(
				selectedTab,
				currentPaymentMethods.current,
				isEditor
			);
			const { supports = {} } =
				paymentMethod &&
				currentPaymentMethods.current[ activePaymentMethod ]
					? currentPaymentMethods.current[ activePaymentMethod ]
					: {};
			return paymentMethod && activePaymentMethod ? (
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
			) : null;
		},
		[
			isEditor,
			activePaymentMethod,
			shouldSavePayment,
			setShouldSavePayment,
			customerId,
		]
	);

	return (
		<Tabs
			className="wc-block-components-checkout-payment-methods"
			onSelect={ ( tabName ) => {
				setActivePaymentMethod( tabName );
				removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
			} }
			tabs={ Object.keys( paymentMethods ).map( ( name ) => {
				const { label, ariaLabel } = paymentMethods[ name ];
				return {
					name,
					title:
						typeof label === 'string'
							? label
							: cloneElement( label, {
									components:
										currentPaymentMethodInterface.current
											.components,
							  } ),
					ariaLabel,
					content: getRenderedTab( name ),
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
};

export default NewPaymentMethodOptions;
