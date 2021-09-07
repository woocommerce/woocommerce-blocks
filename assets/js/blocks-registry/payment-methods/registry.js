/**
 * @typedef {import('@woocommerce/type-defs/payments').PaymentMethodRegistrationOptions} PaymentMethodRegistrationOptions
 * @typedef {import('@woocommerce/type-defs/payments').ExpressPaymentMethodRegistrationOptions} ExpressPaymentMethodRegistrationOptions
 */

/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { default as PaymentMethodConfig } from './payment-method-config';
import { default as ExpressPaymentMethodConfig } from './express-payment-method-config';
import { canMakePaymentExtensionsCallbacks } from './extensions-config';
const paymentMethods = {};
const expressPaymentMethods = {};

/**
 * Register a regular payment method.
 *
 * @param {PaymentMethodRegistrationOptions} options Configuration options for the payment method.
 */
export const registerPaymentMethod = ( options ) => {
	let paymentMethodConfig;
	if ( typeof options === 'function' ) {
		// Legacy fallback for previous API, where client passes a function:
		// registerPaymentMethod( ( Config ) => new Config( options ) );
		paymentMethodConfig = options( PaymentMethodConfig );
		deprecated( 'Passing a callback to registerPaymentMethod()', {
			alternative: 'a config options object',
			plugin: 'woocommerce-gutenberg-products-block',
			link:
				'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/3404',
		} );
	} else {
		paymentMethodConfig = new PaymentMethodConfig( options );
	}
	if ( paymentMethodConfig instanceof PaymentMethodConfig ) {
		paymentMethods[ paymentMethodConfig.name ] = paymentMethodConfig;
	}
};

/**
 * Register an express payment method.
 *
 * @param {ExpressPaymentMethodRegistrationOptions} options Configuration options for the payment method.
 */
export const registerExpressPaymentMethod = ( options ) => {
	let paymentMethodConfig;
	if ( typeof options === 'function' ) {
		// Legacy fallback for previous API, where client passes a function:
		// registerExpressPaymentMethod( ( Config ) => new Config( options ) );
		paymentMethodConfig = options( ExpressPaymentMethodConfig );
		deprecated( 'Passing a callback to registerExpressPaymentMethod()', {
			alternative: 'a config options object',
			plugin: 'woocommerce-gutenberg-products-block',
			link:
				'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/3404',
		} );
	} else {
		paymentMethodConfig = new ExpressPaymentMethodConfig( options );
	}
	if ( paymentMethodConfig instanceof ExpressPaymentMethodConfig ) {
		expressPaymentMethods[ paymentMethodConfig.name ] = paymentMethodConfig;
	}
};

/**
 * Allows extension to register callbacks for specific payment methods to determine if they can make payments
 *
 * @param {string} namespace A unique string to identify the extension registering payment method callbacks.
 * @param {Record<string, function():any>} callbacks Example {stripe: () => {}, cheque: => {}}
 */
export const registerPaymentMethodExtensionCallbacks = (
	namespace,
	callbacks
) => {
	if (
		Object.values( callbacks ).some(
			( callback ) => typeof callback !== 'function'
		)
	) {
		const nonFunctionCallbacks = Object.keys( callbacks ).filter(
			( key ) => typeof callbacks[ key ] !== 'function'
		);

		throw new Error(
			`All callbacks provided to registerPaymentMethodExtensionCallbacks must be functions. The callbacks for: ${ nonFunctionCallbacks.join(
				', '
			) } were not functions. Error occurred when trying to register callbacks for the ${ namespace } namespace.`
		);
	}

	// Set namespace up as an empty object
	canMakePaymentExtensionsCallbacks[ namespace ] = {};

	Object.entries( callbacks ).forEach(
		( [ paymentMethodName, callback ] ) => {
			canMakePaymentExtensionsCallbacks[ namespace ][
				paymentMethodName
			] = callback;
		}
	);
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
