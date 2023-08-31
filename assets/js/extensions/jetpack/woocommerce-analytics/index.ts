/**
 * External dependencies
 */
import { addAction } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { actionPrefix, namespace } from './constants';

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_wca: {
			// eslint-disable-next-line @typescript-eslint/ban-types
			push: unknown[] | Function;
		};
	}
}

// eslint-disable-next-line @typescript-eslint/ban-types
const isValidWCA = ( wca: { push?: unknown } ): wca is { push: Function } => {
	return typeof wca?.push === 'function';
};

const registerActions = (): void => {
	const _wca = window?._wca;
	if ( ! isValidWCA( _wca ) ) {
		return;
	}
	/**
	 * Choose a payment method
	 *
	 * @summary Track the payment method being set using set_checkout_option
	 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#2_measure_checkout_options
	 */
	addAction(
		`${ actionPrefix }-checkout-set-active-payment-method`,
		namespace,
		( { paymentMethodSlug }: { paymentMethodSlug: string } ): void => {
			_wca.push( {
				_en: 'woocommerceanalytics_change_payment_method',
				payment_method: paymentMethodSlug,
			} )();
		}
	);
};
registerActions();

// Exporting to prevent TS error.
export {};
