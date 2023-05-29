/**
 * External dependencies
 */
import NumberFormat from 'react-number-format';
import type {
	NumberFormatValues,
	NumberFormatProps,
} from 'react-number-format';
import classNames from 'classnames';
import type { ReactElement } from 'react';
import type { Currency } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import './style.scss';

interface FormattedMonetaryAmountProps
	extends Omit< NumberFormatProps, 'onValueChange' > {
	className?: string;
	allowNegative?: boolean;
	isAllowed?: ( formattedValue: NumberFormatValues ) => boolean;
	value: number | string; // Value of money amount.
	currency: Currency | Record< string, never >; // Currency configuration object.
	onValueChange?: ( unit: number ) => void; // Function to call when value changes.
	style?: React.CSSProperties | undefined;
	renderText?: ( value: string ) => ReactElement | string;
	withSuperScript?: boolean;
}

const applySuperscript =
	( currency: FormattedMonetaryAmountProps[ 'currency' ] ) =>
	( formattedValue: string ): ReactElement | string => {
		if ( ! currency.decimalSeparator ) {
			return formattedValue;
		}
		const pattern = new RegExp(
			`^(.*)([${ currency.decimalSeparator }])(([^${ currency.decimalSeparator }]*))$`
		);
		const matches = formattedValue.match( pattern );
		if ( ! matches ) {
			return formattedValue;
		}
		return (
			<>
				<>{ matches[ 1 ] }</>
				<sup>{ matches[ 3 ] }</sup>
			</>
		);
	};

/**
 * Formats currency data into the expected format for NumberFormat.
 */
const currencyToNumberFormat = (
	currency: FormattedMonetaryAmountProps[ 'currency' ]
) => {
	return {
		thousandSeparator: currency?.thousandSeparator,
		decimalSeparator: currency?.decimalSeparator,
		fixedDecimalScale: true,
		prefix: currency?.prefix,
		suffix: currency?.suffix,
		isNumericString: true,
	};
};

const defaultRenderText = ( formattedAmount: string ) => formattedAmount;

/**
 * FormattedMonetaryAmount component.
 *
 * Takes a price and returns a formatted price using the NumberFormat component.
 */
const FormattedMonetaryAmount = ( {
	className,
	value: rawValue,
	currency,
	onValueChange,
	displayType = 'text',
	withSuperScript = false,
	renderText,
	...props
}: FormattedMonetaryAmountProps ): JSX.Element | null => {
	const value =
		typeof rawValue === 'string' ? parseInt( rawValue, 10 ) : rawValue;

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
	const decimalScale = props.decimalScale ?? currency?.minorUnit;
	const numberFormatProps = {
		...props,
		...currencyToNumberFormat( currency ),
		decimalScale,
		value: undefined,
		currency: undefined,
		onValueChange: undefined,
	};

	// Wrapper for NumberFormat onValueChange which handles subunit conversion.
	const onValueChangeWrapper = onValueChange
		? ( values: NumberFormatValues ) => {
				const minorUnitValue = +values.value * 10 ** currency.minorUnit;
				onValueChange( minorUnitValue );
		  }
		: () => void 0;

	if ( ! renderText ) {
		renderText = withSuperScript
			? applySuperscript( currency )
			: defaultRenderText;
	}

	return (
		<NumberFormat
			className={ classes }
			displayType={ displayType }
			{ ...numberFormatProps }
			value={ priceValue }
			onValueChange={ onValueChangeWrapper }
			renderText={ renderText }
		/>
	);
};

export default FormattedMonetaryAmount;
