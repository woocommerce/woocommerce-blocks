/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { Cart, isObject, objectHasProp } from '@woocommerce/types';

let cartPageViewTracked = false;
let checkoutPageViewTracked = false;

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
export const maybeTrackCheckoutPageView = ( cart: Cart ) => {
	if ( checkoutPageViewTracked ) {
		return;
	}
	checkoutPageViewTracked = true;
	const storePages = getSetting< StorePages >( 'storePages', {} );
	if ( ! objectHasProp( storePages, 'checkout' ) ) {
		return;
	}
	if ( storePages?.checkout?.permalink !== window.location.href ) {
		return;
	}

	document.addEventListener( 'DOMContentLoaded', () => {
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
	} );
};

export const maybeTrackCartPageView = ( cart: Cart ) => {
	if ( cartPageViewTracked ) {
		return;
	}
	cartPageViewTracked = true;
	const storePages = getSetting< StorePages >( 'storePages', {} );
	if ( ! objectHasProp( storePages, 'cart' ) ) {
		return;
	}
	if ( storePages?.cart?.permalink !== window.location.href ) {
		return;
	}

	document.addEventListener( 'DOMContentLoaded', () => {
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
	} );
};
