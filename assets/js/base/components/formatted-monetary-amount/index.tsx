/**
 * External dependencies
 */
import NumberFormat, {
	NumberFormatValues,
	NumberFormatProps,
} from 'react-number-format';
import classNames from 'classnames';
import type { Currency } from '@woocommerce/price-format';
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Formats currency data into the expected format for NumberFormat.
 *
 * @param {Object} currency Currency data.
 * @return {Object} Formatted props for NumberFormat.
 */
const currencyToNumberFormat = ( currency: Currency ) => {
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

interface FormattedMonetaryAmountProps {
	className?: string;
	value: number;
	currency: Currency;
	onValueChange?: ( unit: number ) => void;
}

/**
 * Formatted price component.
 *
 * Takes a price and returns a formatted price using the NumberFormat component.
 *
 * @param {Object} props Component props.
 * @param {string} props.className CSS class used.
 * @param {number} props.value Value of money amount.
 * @param {Object} props.currency Currency configuration object.
 * @param {function():any} props.onValueChange Function to call when value changes.
 * @param {Object} props.props Rest of props passed into component.
 */
const FormattedMonetaryAmount = ( {
	className,
	value,
	currency,
	onValueChange,
	...props
}: FormattedMonetaryAmountProps ): ReactElement | null => {
	if ( ! Number.isFinite( value ) ) {
		return null;
	}

	const priceValue = value / 10 ** currency.minorUnit;

	if ( ! Number.isFinite( priceValue ) ) {
		return null;
	}

	const classes = classNames(
		'wc-block-formatted-money-amount',
		'wc-block-components-formatted-money-amount',
		className
	);
	const numberFormatProps = {
		displayType: 'text' as NumberFormatProps[ 'displayType' ],
		...props,
		...currencyToNumberFormat( currency ),
		value: undefined,
		currency: undefined,
		onValueChange: undefined,
	};

	// Wrapper for NumberFormat onValueChange which handles subunit conversion.
	const onValueChangeWrapper = onValueChange
		? ( values: NumberFormatValues ) => {
				const minorUnitValue =
					( ( values.value as unknown ) as number ) *
					10 ** currency.minorUnit;
				onValueChange( minorUnitValue );
		  }
		: () => {
				/* not used */
		  };

	return (
		<NumberFormat
			className={ classes }
			{ ...numberFormatProps }
			value={ priceValue }
			onValueChange={ onValueChangeWrapper }
		/>
	);
};

export default FormattedMonetaryAmount;
