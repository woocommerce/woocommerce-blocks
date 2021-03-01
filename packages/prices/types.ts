export interface Currency {
	code: string;
	decimalSeparator: string;
	minorUnit: number;
	prefix: string;
	suffix: string;
	symbol: string;
	thousandSeparator: string;
}

export interface CurrencyData {
	// eslint-disable-next-line camelcase
	currency_code: string;
	// eslint-disable-next-line camelcase
	currency_decimal_separator: string;
	// eslint-disable-next-line camelcase
	currency_thousand_separator: string;
	// eslint-disable-next-line camelcase
	currency_minor_unit: number;
	// eslint-disable-next-line camelcase
	currency_prefix: string;
	// eslint-disable-next-line camelcase
	currency_suffix: string;
	// eslint-disable-next-line camelcase
	currency_symbol: string;
}
