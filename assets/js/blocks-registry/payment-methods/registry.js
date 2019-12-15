/**
 * Internal dependencies
 */
import {
	assertValidPaymentMethod,
	assertValidPaymentMethodComponent,
} from './assertions';

// currently much leeway is given to the payment method for the shape of their components. We should investigate payment methods
// using a component creator that is fed a configuration object so that the built component for the payment method is tightly
// controlled (fitting the ui/ux requirements of the checkout/cart).  Once we know the pattern most payment methods will follow
// (i.e. fields, event callbacks, validation, etc) this is likely more feasible.

const paymentMethods = {};
const expressPaymentMethods = {};

export const registerPaymentMethod = ( slug, paymentMethod ) => {
	assertValidPaymentMethod( paymentMethod );
	paymentMethods[ slug ] = paymentMethod;
};

export const registerExpressPaymentMethod = ( slug, expressPaymentMethod ) => {
	assertValidPaymentMethodComponent( expressPaymentMethod );
	expressPaymentMethods[ slug ] = expressPaymentMethod;
};

export const getPaymentMethods = () => {
	return paymentMethods;
};

export const getExpressPaymentMethods = () => {
	return expressPaymentMethods;
};
