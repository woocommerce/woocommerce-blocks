/**
 * External dependencies
 */
import NumberFormat from 'react-number-format';

/**
 * Formats currency data into the expected format for NumberFormat.
 *
 * @param {Object} currency Currency data.
 * @return {Object} Formatted props for NumberFormat.
 */
const currencyToNumberFormat = ( currency ) => {
	return {
		thousandSeparator: currency.thousandSeparator,
		decimalSeparator: currency.decimalSeparator,
		decimalScale: currency.minorUnit,
		fixedDecimalScale: true,
		prefix: currency.prefix,
		suffix: currency.suffix,
		isNumericString: true,
	};
};

/**
 * Formatted price component.
 *
 * Takes a price and returns a formatted price using the NumberFormat component.
 *
 * @param {Object} props Component props.
 */
const FormattedMonetaryAmount = ( {
	value,
	currency,
	onValueChange,
	...props
} ) => {
	const priceValue = value / 10 ** currency.minorUnit;

	if ( ! Number.isFinite( priceValue ) && priceValue === '-' ) {
		return null;
	}

	const numberFormatProps = {
		displayType: 'text',
		...props,
		...currencyToNumberFormat( currency ),
		value: undefined,
		currency: undefined,
		onValueChange: undefined,
	};

	// Wrapper for NumberFormat onValueChange which handles subunit conversion.
	const onValueChangeWrapper = onValueChange
		? ( values ) => {
				const minorUnitValue = values.value * 10 ** currency.minorUnit;
				onValueChange( minorUnitValue );
		  }
		: () => {};

	return (
		<NumberFormat
			{ ...numberFormatProps }
			value={ priceValue }
			onValueChange={ onValueChangeWrapper }
		/>
	);
};

export default FormattedMonetaryAmount;
