/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useExpressPaymentMethods } from '@woocommerce/base-hooks';
import {
	StoreNoticesProvider,
	useEditorContext,
} from '@woocommerce/base-context';
import Title from '@woocommerce/base-components/title';

/**
 * Internal dependencies
 */
import ExpressPaymentMethods from '../express-payment-methods';
import './style.scss';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

const CheckoutExpressPayment = () => {
	const { paymentMethods, isInitialized } = useExpressPaymentMethods();
	const { isEditor } = useEditorContext();

	if (
		! isInitialized ||
		( isInitialized && Object.keys( paymentMethods ).length === 0 )
	) {
		// Make sure errors are shown in the editor and for admins. For example,
		// when a payment method fails to register.
		if ( isEditor || CURRENT_USER_IS_ADMIN ) {
			return (
				<StoreNoticesProvider context="wc/express-payment-area"></StoreNoticesProvider>
			);
		}
		return null;
	}

	return (
		<>
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
					<StoreNoticesProvider context="wc/express-payment-area">
						<p>
							{ __(
								'In a hurry? Use one of our express checkout options below:',
								'woo-gutenberg-products-block'
							) }
						</p>
						<ExpressPaymentMethods />
					</StoreNoticesProvider>
				</div>
			</div>
			<div className="wc-block-components-express-payment-continue-rule wc-block-components-express-payment-continue-rule--checkout">
				{ __( 'Or continue below', 'woo-gutenberg-products-block' ) }
			</div>
		</>
	);
};

export default CheckoutExpressPayment;
