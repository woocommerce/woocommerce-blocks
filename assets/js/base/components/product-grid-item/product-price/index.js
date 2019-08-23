/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const ProductPrice = ( { className, product = {} } ) => {
	const numberFormatArgs = {
		displayType: 'text',
		thousandSeparator: product.prices.thousand_separator,
		decimalSeparator: product.prices.decimal_separator,
		decimalScale: product.prices.decimals,
		prefix: product.prices.price_prefix,
		suffix: product.prices.price_suffix,
	};

	if ( product.prices.price_range && product.prices.price_range.min_amount && product.prices.price_range.max_amount ) {
		return (
			<div className={ className }>
				<span className={ className + '__value' }>
					<NumberFormat value={ product.prices.price_range.min_amount } { ...numberFormatArgs } />
					&nbsp;&mdash;&nbsp;
					<NumberFormat value={ product.prices.price_range.max_amount } { ...numberFormatArgs } />
				</span>
			</div>
		);
	}

	return (
		<div className={ className }>
			{ product.prices.regular_price !== product.prices.price && (
				<del className={ className + '__regular' }>
					<NumberFormat value={ product.prices.regular_price } { ...numberFormatArgs } />
				</del>
			) }
			<span className={ className + '__value' }>
				<NumberFormat value={ product.prices.price } { ...numberFormatArgs } />
			</span>
		</div>
	);
};

ProductPrice.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductPrice;
