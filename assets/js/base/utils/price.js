/**
 * External dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { CURRENCY } from '@woocommerce/settings';

/**
 * Format a price, provided using the smallest unit of the currency, as a
 * decimal complete with currency symbols using current store settings.
 *
 * @param {number} price Price, in cents, to format.
 */
export const formatPrice = ( price ) => {
	if ( price === '' || price === undefined ) {
		return '';
	}

	// eslint-disable-next-line @wordpress/valid-sprintf
	const formattedValue = sprintf(
		CURRENCY.priceFormat,
		CURRENCY.symbol,
		parseInt( price, 10 ) / 10 ** CURRENCY.precision
	);

	// This uses a textarea to magically decode HTML currency symbols.
	const txt = document.createElement( 'textarea' );
	txt.innerHTML = formattedValue;
	return txt.value;
};
