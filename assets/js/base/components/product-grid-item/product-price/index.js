/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const ProductPrice = ( { className, prices } ) => {
	const numberFormatArgs = {
		displayType: 'text',
		thousandSeparator: prices.thousand_separator,
		decimalSeparator: prices.decimal_separator,
		decimalScale: prices.decimals,
		prefix: prices.price_prefix,
		suffix: prices.price_suffix,
	};

	if (
		prices.price_range &&
		prices.price_range.min_amount &&
		prices.price_range.max_amount
	) {
		return (
			<div className={ className }>
				<span className={ className + '__value' }>
					<NumberFormat
						value={ prices.price_range.min_amount }
						{ ...numberFormatArgs }
					/>
					&nbsp;&mdash;&nbsp;
					<NumberFormat
						value={ prices.price_range.max_amount }
						{ ...numberFormatArgs }
					/>
				</span>
			</div>
		);
	}

	return (
		<div className={ className }>
			{ prices.regular_price && prices.regular_price !== prices.price && (
				<del className={ className + '__regular' }>
					<NumberFormat
						value={ prices.regular_price }
						{ ...numberFormatArgs }
					/>
				</del>
			) }
			<span className={ className + '__value' }>
				<NumberFormat value={ prices.price } { ...numberFormatArgs } />
			</span>
		</div>
	);
};

ProductPrice.propTypes = {
	className: PropTypes.string.isRequired,
	prices: PropTypes.object,
};

ProductPrice.defaultProps = {
	prices: {},
};

export default ProductPrice;
