/**
 * External dependencies
 */
import type { ProductResponseItem, CartResponseItem } from '@woocommerce/types';

export const getProductFieldObject = (
	product: ProductResponseItem | CartResponseItem,
	quantity = 1
): Gtag.Item => {
	const productIdentifier = product.sku ? product.sku : '#' + product.id;
	return {
		id: productIdentifier,
		quantity,
		name: product.name,
		price:
			parseInt( product.prices.price, 10 ) /
			10 ** product.prices.currency_minor_unit,
	};
};

export const trackEvent = (
	eventName: Gtag.EventNames | string,
	eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams
): void => {
	if ( typeof gtag !== 'function' ) {
		throw new Error( 'Function gtag not implemented.' );
	}
	// eslint-disable-next-line no-console
	console.log( `Tracking event ${ eventName }` );
	gtag( 'event', eventName, eventParams );
};
