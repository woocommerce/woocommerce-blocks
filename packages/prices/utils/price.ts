/**
 * External dependencies
 */
import { CURRENCY } from '@woocommerce/settings';
import type {
	Currency,
	CurrencyResponse,
	CartShippingPackageShippingRate,
	SymbolPosition,
} from '@woocommerce/types';

type decimalType = string | RegExpMatchArray | null;

/**
 * Get currency prefix.
 */
const getPrefix = (
	// Currency symbol.
	symbol: string,
	// Position of currency symbol from settings.
	symbolPosition: SymbolPosition
): string => {
	const prefixes = {
		left: symbol,
		left_space: ' ' + symbol,
		right: '',
		right_space: '',
	};
	return prefixes[ symbolPosition ] || '';
};

/**
 * Get currency suffix.
 */
const getSuffix = (
	// Currency symbol.
	symbol: string,
	// Position of currency symbol from settings.
	symbolPosition: SymbolPosition
): string => {
	const suffixes = {
		left: '',
		left_space: '',
		right: symbol,
		right_space: ' ' + symbol,
	};
	return suffixes[ symbolPosition ] || '';
};

/**
 * Currency information in normalized format from server settings.
 */
const siteCurrencySettings: Currency = {
	code: CURRENCY.code,
	symbol: CURRENCY.symbol,
	thousandSeparator: CURRENCY.thousandSeparator,
	decimalSeparator: CURRENCY.decimalSeparator,
	minorUnit: CURRENCY.precision,
	prefix: getPrefix(
		CURRENCY.symbol,
		CURRENCY.symbolPosition as SymbolPosition
	),
	suffix: getSuffix(
		CURRENCY.symbol,
		CURRENCY.symbolPosition as SymbolPosition
	),
};

/**
 * Gets currency information in normalized format from an API response or the server.
 */
export const getCurrencyFromPriceResponse = (
	// Currency data object, for example an API response containing currency formatting data.
	currencyData:
		| CurrencyResponse
		| Record< string, never >
		| CartShippingPackageShippingRate
): Currency => {
	if ( ! currencyData || typeof currencyData !== 'object' ) {
		return siteCurrencySettings;
	}

	const {
		currency_code: code,
		currency_symbol: symbol,
		currency_thousand_separator: thousandSeparator,
		currency_decimal_separator: decimalSeparator,
		currency_minor_unit: minorUnit,
		currency_prefix: prefix,
		currency_suffix: suffix,
	} = currencyData;

	return {
		code: code || 'USD',
		symbol: symbol || '$',
		thousandSeparator:
			typeof thousandSeparator === 'string' ? thousandSeparator : ',',
		decimalSeparator:
			typeof decimalSeparator === 'string' ? decimalSeparator : '.',
		minorUnit: Number.isFinite( minorUnit ) ? minorUnit : 2,
		prefix: typeof prefix === 'string' ? prefix : '$',
		suffix: typeof suffix === 'string' ? suffix : '',
	};
};

/**
 * Gets currency information in normalized format, allowing overrides.
 */
export const getCurrency = (
	currencyData: Partial< Currency > = {}
): Currency => {
	return {
		...siteCurrencySettings,
		...currencyData,
	};
};

/**
 * Get the integer value from the decimal price.
 *
 * @param {number} priceInt The price in minor unit value, e.g. 100 for $1.00.
 * @param {string} thousandSeparator The thousand separator.
 * @param {number} minorUnit The number of decimals to display.
 * @return {string} The extracted integer value.
 */
export const getIntegerValue = (
	priceInt: number,
	thousandSeparator: string,
	minorUnit: number
): string => {
	return Math.floor( priceInt / 10 ** minorUnit )
		.toString()
		.replace( /\B(?=(\d{3})+(?!\d))/g, thousandSeparator );
};

/**
 * Get the decimal value from the decimal price.
 *
 * @param {number} priceInt The price in minor unit value, e.g. 100 for $1.00.
 * @param {number} minorUnit The number of decimals to display.
 * @return {string} The extracted decimal value.
 */
export const getDecimalValue = (
	priceInt: number,
	minorUnit: number
): string | undefined => {
	if ( minorUnit === 0 ) return '';

	const decimalValue: decimalType = priceInt
		.toString()
		.match( new RegExp( `[0-9]{${ minorUnit }}$` ) );

	if ( decimalValue === null && minorUnit > 0 ) {
		return '0'.repeat( minorUnit );
	}

	if ( Array.isArray( decimalValue ) ) {
		return decimalValue[ 0 ];
	}
};

/**
 * Format a price, provided using the smallest unit of the currency, as a
 * decimal complete with currency symbols using current store settings.
 */
export const formatPrice = (
	// Price in minor unit, e.g. cents.
	price: number | string,
	currencyData?: Currency
): string => {
	if ( price === '' || price === undefined ) {
		return '';
	}

	const priceInt: number =
		typeof price === 'number' ? price : parseInt( price, 10 );

	if ( ! Number.isFinite( priceInt ) ) {
		return '';
	}

	const currency: Currency = getCurrency( currencyData );

	const integerValue: string = getIntegerValue(
		priceInt,
		currency.thousandSeparator,
		currency.minorUnit
	);

	const decimalValue: string | undefined = getDecimalValue(
		priceInt,
		currency.minorUnit
	);

	const formattedPrice: string =
		currency.minorUnit > 0 &&
		currency.decimalSeparator !== '' &&
		decimalValue !== 'undefined'
			? integerValue + currency.decimalSeparator + decimalValue
			: integerValue;

	const formattedValue: string =
		currency.prefix + formattedPrice + currency.suffix;

	// This uses a textarea to magically decode HTML currency symbols.
	const txt = document.createElement( 'textarea' );
	txt.innerHTML = formattedValue;
	return txt.value;
};
