/**
 * Internal dependencies
 */
import { default as PaymentMethodConfig } from './payment-method-config';
import { default as ExpressPaymentMethodConfig } from './express-payment-method-config';

const paymentMethods = {};
const expressPaymentMethods = {};

export const registerPaymentMethod = ( options ) => {
	let paymentMethodConfig;
	if ( typeof options === 'function' ) {
		// Legacy fallback for previous API, where client passes a function:
		// registerPaymentMethod( ( Config ) => new Config( options ) );
		paymentMethodConfig = options( PaymentMethodConfig );
	} else {
		paymentMethodConfig = new PaymentMethodConfig( options );
	}
	if ( paymentMethodConfig instanceof PaymentMethodConfig ) {
		paymentMethods[ paymentMethodConfig.name ] = paymentMethodConfig;
	}
};

export const registerExpressPaymentMethod = ( options ) => {
	let paymentMethodConfig;
	if ( typeof options === 'function' ) {
		// Legacy fallback for previous API, where client passes a function:
		// registerExpressPaymentMethod( ( Config ) => new Config( options ) );
		paymentMethodConfig = options( ExpressPaymentMethodConfig );
	} else {
		paymentMethodConfig = new ExpressPaymentMethodConfig( options );
	}
	if ( paymentMethodConfig instanceof ExpressPaymentMethodConfig ) {
		expressPaymentMethods[ paymentMethodConfig.name ] = paymentMethodConfig;
	}
};

export const __experimentalDeRegisterPaymentMethod = ( paymentMethodName ) => {
	delete paymentMethods[ paymentMethodName ];
};

export const __experimentalDeRegisterExpressPaymentMethod = (
	paymentMethodName
) => {
	delete expressPaymentMethods[ paymentMethodName ];
};

export const getPaymentMethods = () => {
	return paymentMethods;
};

export const getExpressPaymentMethods = () => {
	return expressPaymentMethods;
};
