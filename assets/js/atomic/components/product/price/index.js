/**
 * External dependencies
 */
import NumberFormat from 'react-number-format';
import classnames from 'classnames';
import { useProductLayoutContext } from '@woocommerce/base-context/product-layout-context';

const ProductPrice = ( { className, product } ) => {
	const { layoutStyleClassPrefix } = useProductLayoutContext();
	const prices = product.prices || {};
	const numberFormatArgs = {
		displayType: 'text',
		thousandSeparator: prices.currency_thousand_separator,
		decimalSeparator: prices.currency_decimal_separator,
		decimalScale: prices.currency_minor_unit,
		prefix: prices.currency_prefix,
		suffix: prices.currency_suffix,
		isNumericString: true,
	};

	if (
		prices.price_range &&
		prices.price_range.min_amount &&
		prices.price_range.max_amount
	) {
		return (
			<div
				className={ classnames(
					className,
					`${ layoutStyleClassPrefix }__product-price`
				) }
			>
				<span
					className={ `${ layoutStyleClassPrefix }__product-price__value` }
				>
					<NumberFormat
						value={
							prices.price_range.min_amount /
							10 ** prices.currency_minor_unit
						}
						{ ...numberFormatArgs }
					/>
					&nbsp;&mdash;&nbsp;
					<NumberFormat
						value={
							prices.price_range.max_amount /
							10 ** prices.currency_minor_unit
						}
						{ ...numberFormatArgs }
					/>
				</span>
			</div>
		);
	}

	return (
		<div
			className={ classnames(
				className,
				`${ layoutStyleClassPrefix }__product-price`
			) }
		>
			{ prices.regular_price !== prices.price && (
				<del
					className={ `${ layoutStyleClassPrefix }__product-price__regular` }
				>
					<NumberFormat
						value={
							prices.regular_price /
							10 ** prices.currency_minor_unit
						}
						{ ...numberFormatArgs }
					/>
				</del>
			) }
			<span
				className={ `${ layoutStyleClassPrefix }__product-price__value` }
			>
				<NumberFormat
					value={ prices.price / 10 ** prices.currency_minor_unit }
					{ ...numberFormatArgs }
				/>
			</span>
		</div>
	);
};

export default ProductPrice;
