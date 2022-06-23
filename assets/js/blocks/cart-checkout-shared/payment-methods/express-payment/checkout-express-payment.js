/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEmitResponse } from '@woocommerce/base-context/hooks';
import {
	StoreNoticesContainer,
	usePaymentMethodDataContext,
	useEditorContext,
} from '@woocommerce/base-context';
import Title from '@woocommerce/base-components/title';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/settings';
import {
	PAYMENT_METHOD_DATA_STORE_KEY,
	CHECKOUT_STORE_KEY,
} from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import ExpressPaymentMethods from '../express-payment-methods';
import './style.scss';

const CheckoutExpressPayment = () => {
	const {
		isCalculating,
		isProcessing,
		isAfterProcessing,
		isBeforeProcessing,
		isComplete,
		hasError,
	} = useSelect( ( select ) => {
		const store = select( CHECKOUT_STORE_KEY );
		return {
			isCalculating: store.isCalculating(),
			isProcessing: store.isProcessing(),
			isAfterProcessing: store.isAfterProcessing(),
			isBeforeProcessing: store.isBeforeProcessing(),
			isComplete: store.isComplete(),
			hasError: store.hasError(),
		};
	} );
	const { currentStatus: paymentStatus } = usePaymentMethodDataContext();
	const { availableExpressPaymentMethods, expressPaymentMethodsInitialized } =
		useSelect( ( select ) => {
			const store = select( PAYMENT_METHOD_DATA_STORE_KEY );
			return {
				availableExpressPaymentMethods:
					store.getAvailableExpressPaymentMethods(),
				expressPaymentMethodsInitialized:
					store.expressPaymentMethodsInitialized(),
			};
		} );
	const { isEditor } = useEditorContext();
	const { noticeContexts } = useEmitResponse();

	if (
		! expressPaymentMethodsInitialized ||
		( expressPaymentMethodsInitialized &&
			availableExpressPaymentMethods.length === 0 )
	) {
		// Make sure errors are shown in the editor and for admins. For example,
		// when a payment method fails to register.
		if ( isEditor || CURRENT_USER_IS_ADMIN ) {
			return (
				<StoreNoticesContainer
					context={ noticeContexts.EXPRESS_PAYMENTS }
				/>
			);
		}
		return null;
	}

	// Set loading state for express payment methods when payment or checkout is in progress.
	const checkoutProcessing =
		isProcessing ||
		isAfterProcessing ||
		isBeforeProcessing ||
		( isComplete && ! hasError );

	return (
		<>
			<LoadingMask
				isLoading={
					isCalculating ||
					checkoutProcessing ||
					paymentStatus.isDoingExpressPayment
				}
			>
				<div className="wc-block-components-express-payment wc-block-components-express-payment--checkout">
					<div className="wc-block-components-express-payment__title-container">
						<Title
							className="wc-block-components-express-payment__title"
							headingLevel="2"
						>
							{ __(
								'Express checkout',
								'woo-gutenberg-products-block'
							) }
						</Title>
					</div>
					<div className="wc-block-components-express-payment__content">
						<StoreNoticesContainer
							context={ noticeContexts.EXPRESS_PAYMENTS }
						/>
						<p>
							{ __(
								'In a hurry? Use one of our express checkout options:',
								'woo-gutenberg-products-block'
							) }
						</p>
						<ExpressPaymentMethods />
					</div>
				</div>
			</LoadingMask>
			<div className="wc-block-components-express-payment-continue-rule wc-block-components-express-payment-continue-rule--checkout">
				{ __( 'Or continue below', 'woo-gutenberg-products-block' ) }
			</div>
		</>
	);
};

export default CheckoutExpressPayment;
