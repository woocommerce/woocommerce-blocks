/**
 * External dependencies
 */
import { registerPaymentMethodExtensionCallbacks } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import { canMakePaymentExtensionsCallbacks } from '../extensions-config';

describe( 'registerPaymentMethodExtensionCallbacks', () => {
	it( 'Logs an error to console if namespace is already registered', () => {
		registerPaymentMethodExtensionCallbacks(
			'woocommerce-marketplace-extension',
			{
				cod: () => false,
			}
		);

		// eslint-disable-next-line no-console
		expect( console ).not.toHaveErrored();
		registerPaymentMethodExtensionCallbacks(
			'woocommerce-marketplace-extension',
			{
				cod: () => false,
			}
		);
		expect( console ).toHaveErrored();

		// eslint-disable-next-line no-console
		expect( console.error ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'Logs an error if a supplied callback is not a function and does not register the callback for that method', () => {
		registerPaymentMethodExtensionCallbacks(
			'other-woocommerce-marketplace-extension',
			{
				cod: false,
				cheque: () => true,
			}
		);

		// eslint-disable-next-line no-console
		expect( console ).toHaveErrored();
		expect( canMakePaymentExtensionsCallbacks ).toHaveProperty(
			'other-woocommerce-marketplace-extension'
		);
		expect(
			canMakePaymentExtensionsCallbacks[
				'other-woocommerce-marketplace-extension'
			]
		).not.toHaveProperty( 'cod' );
		expect(
			canMakePaymentExtensionsCallbacks[
				'other-woocommerce-marketplace-extension'
			]
		).toHaveProperty( 'cheque' );
	} );

	it( 'Adds the namespace and callbacks to the canMakePaymentExtensionCallbacks object', () => {
		// We are using a new namespace here because canMakePaymentExtensionsCallbacks cannot be reset between tests.
		registerPaymentMethodExtensionCallbacks(
			'third-woocommerce-marketplace-extension',
			{
				cod: () => false,
			}
		);
		expect( canMakePaymentExtensionsCallbacks ).toHaveProperty(
			'third-woocommerce-marketplace-extension'
		);
	} );
} );
