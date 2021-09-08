/**
 * External dependencies
 */
import { registerPaymentMethodExtensionCallbacks } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import { canMakePaymentExtensionsCallbacks } from '../extensions-config';
import { canMakePaymentWithExtensions } from '../payment-method-config-helper';

describe( 'canMakePaymentWithExtensions', () => {
	const trueCallback = jest.fn().mockReturnValue( true );
	const falseCallback = jest.fn().mockReturnValue( false );
	const throwsCallback = jest.fn().mockImplementation( () => {
		throw new Error();
	} );
	beforeAll( () => {
		registerPaymentMethodExtensionCallbacks(
			'woocommerce-marketplace-extension',
			{
				// cod: one extension returns true, the other returns false.
				cod: () => trueCallback,
				// cheque: returns true only if arg.billingData.postcode is 12345.
				cheque: ( arg ) => arg.billingData.postcode === '12345',
				// bacs: both extensions return false.
				bacs: falseCallback,
				// woopay: both extensions return true.
				woopay: trueCallback,
				// testpay: one callback errors, one returns true
				testpay: throwsCallback,
			}
		);
		registerPaymentMethodExtensionCallbacks(
			'other-woocommerce-marketplace-extension',
			{
				cod: falseCallback,
				bacs: falseCallback,
				woopay: trueCallback,
				testpay: trueCallback,
			}
		);
	} );

	beforeEach( () => {
		trueCallback.mockClear();
		throwsCallback.mockClear();
		falseCallback.mockClear();
	} );

	it( 'The function returned returns false if canMakePayment is false already and the callback is not executed', () => {
		const canMakePayment = () => false;
		const canMakePaymentWithExtensionsResult = canMakePaymentWithExtensions(
			canMakePayment,
			canMakePaymentExtensionsCallbacks,
			'cod'
		)();
		expect( canMakePaymentWithExtensionsResult ).toBe( false );
		expect( trueCallback ).not.toHaveBeenCalled();
	} );

	it( 'Does not unnecessarily execute additional callbacks from other namespaces if an earlier one returns false', () => {
		canMakePaymentWithExtensions(
			() => true,
			canMakePaymentExtensionsCallbacks,
			'bacs'
		)();
		expect( falseCallback ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'Returns true if all extension callbacks return true', () => {
		const result = canMakePaymentWithExtensions(
			() => true,
			canMakePaymentExtensionsCallbacks,
			'woopay'
		)();
		expect( result ).toBe( true );
	} );

	it( 'Passes canPayArg to the callback', () => {
		canMakePaymentWithExtensions(
			() => true,
			canMakePaymentExtensionsCallbacks,
			'woopay'
		)( 'canPayArg' );
		expect( trueCallback ).toHaveBeenCalledWith( 'canPayArg' );
	} );

	it( 'Allows all valid callbacks to run, even if one causes an error', () => {
		canMakePaymentWithExtensions(
			() => true,
			canMakePaymentExtensionsCallbacks,
			'testpay'
		)();
		expect( console ).toHaveErrored();
		expect( throwsCallback ).toHaveBeenCalledTimes( 1 );
		expect( trueCallback ).toHaveBeenCalledTimes( 1 );
	} );
} );
