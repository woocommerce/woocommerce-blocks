/**
 * External dependencies
 */
import NumberFormat from 'react-number-format';

/**
 * Internal dependencies
 */
import { currencyToNumberFormat } from './utils';

/**
 * Formatted price component.
 *
 * Takes a price and returns a formatted price using the NumberFormat component.
 *
 * @param {Object} props Component props.
 */
const FormattedPrice = ( {
	value,
	currency,
	onValueChange,
	...props
} ) => {
	const priceValue = value / 10 ** currency.minorUnit;

	if ( ! Number.isFinite( priceValue ) ) {
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

	const onValueChangeWrapper = onValueChange ? ( values ) => {
		const centValue = values.value * 10 ** currency.minorUnit;

		onValueChange( centValue );
	} : () => {};

	return <NumberFormat { ...numberFormatProps } value={ priceValue } onValueChange={ onValueChangeWrapper } />
};

FormattedPrice.propTypes = {

};

export default FormattedPrice;
