/**
 * External dependencies
 */
import classnames from 'classnames';
import { useProductLayoutContext } from '@woocommerce/base-context/product-layout-context';
import FormattedPrice from '@woocommerce/base-components/formatted-price';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';

const ProductPrice = ( { className, product } ) => {
	const { layoutStyleClassPrefix } = useProductLayoutContext();
	const prices = product.prices || {};
	const currency = getCurrencyFromPriceResponse( prices );

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
					<FormattedPrice
						currency={ currency }
						value={ prices.price_range.min_amount }
					/>
					&nbsp;&mdash;&nbsp;
					<FormattedPrice
						currency={ currency }
						value={ prices.price_range.max_amount }
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
					<FormattedPrice
						currency={ currency }
						value={ prices.regular_price }
					/>
				</del>
			) }
			<span
				className={ `${ layoutStyleClassPrefix }__product-price__value` }
			>
				<FormattedPrice currency={ currency } value={ prices.price } />
			</span>
		</div>
	);
};

export default ProductPrice;
