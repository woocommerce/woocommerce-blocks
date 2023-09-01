/**
 * External dependencies
 */
import { addAction } from '@wordpress/hooks';
import { isObject, objectHasProp } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { actionPrefix, namespace } from './constants';

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_wca: {
			// eslint-disable-next-line @typescript-eslint/ban-types
			push: ( properties: Record< string, unknown > ) => void;
		};
	}
}

/**
 * Check if the _wca object is valid and has a push property that is a function.
 *
 * @param  wca {unknown} Object that might be a Jetpack WooCommerce Analytics object.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isValidWCA = (
	wca: unknown
): wca is { push: ( properties: Record< string, unknown > ) => void } => {
	if ( ! isObject( wca ) || ! objectHasProp( wca, 'push' ) ) {
		return false;
	}
	return typeof wca.push === 'function';
};

const registerActions = (): void => {
	if ( ! isValidWCA( window._wca ) ) {
		return;
	}
	/**
	 * Fired when selecting a payment method.
	 *
	 * @summary Track the payment method being set using set_checkout_option
	 */
	addAction(
		`${ actionPrefix }-checkout-set-active-payment-method`,
		namespace,
		( { value: paymentMethodSlug }: { value: string } ): void => {
			window._wca.push( {
				_en: 'woocommerceanalytics_select_payment_method',
				payment_method: paymentMethodSlug,
			} );
		}
	);

	/**
	 * Fired when selecting a shipping rate.
	 *
	 * @summary Track the shipping rate being set using selectShippingRate
	 */
	addAction(
		`${ actionPrefix }-checkout-set-selected-shipping-rate`,
		namespace,
		( { shippingRateId }: { shippingRateId: string } ): void => {
			window._wca.push( {
				_en: 'woocommerceanalytics_select_shipping_rate',
				shipping_method: shippingRateId,
			} );
		}
	);
};

document.addEventListener( 'DOMContentLoaded', () => {
	registerActions();
} );

// Exporting to prevent TS error.
export {};
