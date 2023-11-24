/**
 * Internal dependencies
 */
import { snakeCaseKeys } from '~/base/utils';

/**
 * Internal dependencies
 */
import { Currency, CurrencyResponse } from '~/types';

export const currencies: Record< string, Currency > = {
	EUR: {
		code: 'EUR',
		symbol: '€',
		thousandSeparator: '.',
		decimalSeparator: ',',
		minorUnit: 2,
		prefix: '',
		suffix: '€',
	},
	USD: {
		code: 'USD',
		symbol: '$',
		thousandSeparator: ',',
		decimalSeparator: '.',
		minorUnit: 2,
		prefix: '$',
		suffix: '',
	},
} as const;

export const currenciesAPIShape: Record< string, CurrencyResponse > =
	Object.fromEntries(
		Object.entries( currencies ).map( ( [ key, value ] ) => [
			key,
			snakeCaseKeys( value ),
		] )
	);

export const currencyControl = {
	control: 'select',
	options: currencies,
	mapping: Object.keys( currencies ),
};
