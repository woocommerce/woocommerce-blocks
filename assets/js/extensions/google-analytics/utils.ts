/**
 * External dependencies
 */
import type { ProductResponseItem, CartResponseItem } from '@woocommerce/types';

interface ImpressionItem extends Gtag.Item {
	// eslint-disable-next-line camelcase
	list_name?: string;
}

/**
 * Formats data into the productFieldObject shape.
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#product-data
 */
export const getProductFieldObject = (
	product: ProductResponseItem | CartResponseItem,
	quantity: number | undefined
): Gtag.Item => {
	const productIdentifier = product.sku ? product.sku : '#' + product.id;
	return {
		id: productIdentifier,
		name: product.name,
		quantity,

		price:
			parseInt( product.prices.price, 10 ) /
			10 ** product.prices.currency_minor_unit,
	};
};

/**
 * Formats data into the impressionFieldObject shape.
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#impression-data
 */
export const getProductImpressionObject = (
	product: ProductResponseItem | CartResponseItem,
	listName: string
): ImpressionItem => {
	const productIdentifier = product.sku ? product.sku : '#' + product.id;
	return {
		id: productIdentifier,
		name: product.name,
		list_name: listName,

		price:
			parseInt( product.prices.price, 10 ) /
			10 ** product.prices.currency_minor_unit,
	};
};

/**
 * Track an event using the global gtag function.
 */
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
