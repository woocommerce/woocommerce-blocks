/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useExpressPaymentMethods } from '@woocommerce/base-hooks';
import { StoreNoticesProvider } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import ExpressPaymentMethods from '../express-payment-methods';
import './style.scss';

const CartExpressPayment = () => {
	const { paymentMethods, isInitialized } = useExpressPaymentMethods();

	if (
		! isInitialized ||
		( isInitialized && Object.keys( paymentMethods ).length === 0 )
	) {
		return null;
	}

	return (
		<>
			<div className="wc-block-components-express-checkout is-compact">
				<div className="wc-block-components-express-checkout__content">
					<StoreNoticesProvider context="wc/express-payment-area">
						<ExpressPaymentMethods />
					</StoreNoticesProvider>
				</div>
			</div>
			<div className="wc-block-components-express-checkout-continue-rule is-compact">
				{ /* translators: Shown in the Cart block between the express payment methods and the Proceed to Checkout button */ }
				{ __( 'Or', 'woo-gutenberg-products-block' ) }
			</div>
		</>
	);
};

export default CartExpressPayment;
