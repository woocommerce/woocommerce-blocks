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
 * Registers a callback for a specific payment method to determine if it can make payments
 *
 * @param {string} paymentMethodName A unique string to identify the payment method client side.
 * @param {function():any } callback Callback defined by extensions to determine if the payment method is supported.
 */
export const registerPaymentMethodExtensionCallback = (
	paymentMethodName,
	callback
) => {
	if ( typeof callback !== 'function' ) {
		throw new Error(
			'Callback provided to registerPaymentMethodExtensionCallback must be a function'
		);
	}

	if (
		! Array.isArray(
			canMakePaymentExtensionsCallbacks[ paymentMethodName ]
		)
	) {
		canMakePaymentExtensionsCallbacks[ paymentMethodName ] = [];
	}

	canMakePaymentExtensionsCallbacks[ paymentMethodName ].push( callback );
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
