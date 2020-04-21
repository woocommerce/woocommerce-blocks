/**
 * External dependencies
 */
import { usePaymentMethods } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import './style.scss';
import { AmericanExpressLogo } from './american-express-logo';
import { MastercardLogo, VisaLogo } from './payment-logos'; // @todo we want to import this from `@automattic/composite-checkout` when it's published in NPM

/**
 * Shows a list of registered payment method icons.
 */
const PaymentMethodIcons = () => {
	const { paymentMethods } = usePaymentMethods();

	if ( Object.keys( paymentMethods ).length === 0 ) {
		return null;
	}

	return (
		<div className="wc-block-cart__payment-method-icons">
			<MastercardLogo />
			<AmericanExpressLogo />
			<VisaLogo />
		</div>
	);
};

export default PaymentMethodIcons;
