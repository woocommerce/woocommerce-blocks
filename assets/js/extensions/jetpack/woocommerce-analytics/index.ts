/**
 * External dependencies
 */
import { Cart, isObject, objectHasProp } from '@woocommerce/types';
import { subscribe, select } from '@wordpress/data';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { STORE_KEY as CART_STORE_KEY } from '../../../data/cart/constants';

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

interface StorePageDetails {
	id: number;
	title: string;
	permalink: string;
}

interface StorePages {
	checkout: StorePageDetails;
	cart: StorePageDetails;
	myaccount: StorePageDetails;
	privacy: StorePageDetails;
	shop: StorePageDetails;
	terms: StorePageDetails;
}

export const cleanUrl = ( link: string ) => {
	const url = link.split( '?' )[ 0 ];
	if ( url.charAt( url.length - 1 ) !== '/' ) {
		return url + '/';
	}
	return url;
};
export const maybeTrackCheckoutPageView = ( cart: Cart ) => {
	const storePages = getSetting< StorePages >( 'storePages', {} );
	if ( ! objectHasProp( storePages, 'checkout' ) ) {
		return;
	}
	if (
		cleanUrl( storePages?.checkout?.permalink ) !==
		cleanUrl( window.location.href )
	) {
		return;
	}

	if (
		! isObject( window._wca ) ||
		! objectHasProp( window._wca, 'push' ) ||
		typeof window._wca.push !== 'function'
	) {
		return;
	}
	const checkoutData = getSetting< Record< string, unknown > >(
		'wc-blocks-jetpack-woocommerce-analytics_cart_checkout_info',
		{}
	);
	window._wca.push( {
		_en: 'woocommerceanalytics_checkout_view',
		products: JSON.stringify(
			cart.items.map( ( item ) => {
				return {
					pp: item.totals.line_total,
					pq: item.quantity,
					pi: item.id,
					pn: item.name,
				};
			} )
		),
		...checkoutData,
	} );
};

export const maybeTrackCartPageView = ( cart: Cart ) => {
	const storePages = getSetting< StorePages >( 'storePages', {} );
	if ( ! objectHasProp( storePages, 'cart' ) ) {
		return;
	}
	if (
		cleanUrl( storePages?.cart?.permalink ) !==
		cleanUrl( window.location.href )
	) {
		return;
	}

	if (
		! isObject( window._wca ) ||
		! objectHasProp( window._wca, 'push' ) ||
		typeof window._wca.push !== 'function'
	) {
		return;
	}
	const checkoutData = getSetting< Record< string, unknown > >(
		'wc-blocks-jetpack-woocommerce-analytics_cart_checkout_info',
		{}
	);
	window._wca.push( {
		_en: 'woocommerceanalytics_cart_view',
		products: JSON.stringify(
			cart.items.map( ( item ) => {
				return {
					pp: item.totals.line_total,
					pq: item.quantity,
					pi: item.id,
					pn: item.name,
					pt: item.type,
				};
			} )
		),
		...checkoutData,
	} );
};

const unsubscribe = subscribe( () => {
	const store = select( CART_STORE_KEY );
	const hasCartLoaded = store.hasFinishedResolution( 'getCartTotals' );
	if ( hasCartLoaded ) {
		unsubscribe();
		maybeTrackCartPageView( store.getCartData() );
		maybeTrackCheckoutPageView( store.getCartData() );
	}
}, CART_STORE_KEY );

// Exporting to prevent TS error.
export {};
