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

interface FormattedMonetaryAmountProps {
	className?: string;
	displayType?: NumberFormatProps[ 'displayType' ];
	value: number; // Value of money amount.
	currency: Currency | Record< string, never >; // Currency configuration object.
	onValueChange?: ( unit: number ) => void; //Function to call when value changes.
}

/**
 * Formats currency data into the expected format for NumberFormat.
 */
const currencyToNumberFormat = (
	currency: FormattedMonetaryAmountProps[ 'currency' ]
) => {
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
 * FormattedMonetaryAmount component.
 *
 * Takes a price and returns a formatted price using the NumberFormat component.
 */
const FormattedMonetaryAmount = ( {
	className,
	value,
	currency,
	onValueChange,
	displayType = 'text',
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
			displayType={ displayType }
			{ ...numberFormatProps }
			value={ priceValue }
			onValueChange={ onValueChangeWrapper }
		/>
	);
};

export default FormattedMonetaryAmount;
