/**
 * External dependencies
 */
import { isObject, objectHasProp } from '@woocommerce/types';

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
		// eslint-disable-next-line no-useless-return
		return;
	}

	// We will register actions here in a later PR.
};

document.addEventListener( 'DOMContentLoaded', () => {
	registerActions();
} );

// Exporting to prevent TS error.
export {};
