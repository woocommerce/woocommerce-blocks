/**
 * Formats currency data into the expected format for NumberFormat.
 *
 * @param {Object} currency Currency data.
 * @return {Object} Formatted props for NumberFormat.
 */
export const currencyToNumberFormat = ( currency ) => {
	return {
		thousandSeparator: currency.thousandSeparator,
		decimalSeparator: currency.decimalSeparator,
		decimalScale: currency.minorUnit,
		prefix: currency.prefix,
		suffix: currency.suffix,
		isNumericString: true,
	};
};
