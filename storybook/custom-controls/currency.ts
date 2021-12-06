/**
 * External dependencies
 */
import { Currency } from '@woocommerce/types';

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
};

export const currencyControl = {
	control: 'select',
	defaultValue: currencies.USD,
	mapping: currencies,
	options: Object.keys( currencies ),
};
