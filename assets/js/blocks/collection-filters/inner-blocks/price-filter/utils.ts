/**
 * External dependencies
 */
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import {
	objectHasProp,
	CurrencyResponse,
	Currency,
	isString,
} from '@woocommerce/types';

export const formatPrice = ( price: string | number, currency: Currency ) => {
	const priceInt = typeof price === 'number' ? price : parseInt( price, 10 );
	return priceInt / 10 ** currency.minorUnit;
};

export const getFormattedPrice = ( results: unknown[] ) => {
	if ( ! objectHasProp( results, 'price_range' ) ) {
		return { minPrice: 0, maxPrice: 0 };
	}

	const currency = getCurrencyFromPriceResponse(
		results.price_range as CurrencyResponse
	);

	const minPrice =
		objectHasProp( results.price_range, 'min_price' ) &&
		isString( results.price_range.min_price )
			? results.price_range.min_price
			: 0;
	const maxPrice =
		objectHasProp( results.price_range, 'max_price' ) &&
		isString( results.price_range.max_price )
			? results.price_range.max_price
			: 0;

	return {
		minPrice: formatPrice( minPrice, currency ),
		maxPrice: formatPrice( maxPrice, currency ),
	};
};
