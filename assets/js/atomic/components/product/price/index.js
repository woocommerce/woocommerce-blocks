/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	useInnerBlockConfigurationContext,
	useProductDataContextContext,
} from '@woocommerce/shared-context';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';

const ProductPrice = ( { className } ) => {
	const { product } = useProductDataContextContext();
	const { layoutStyleClassPrefix } = useInnerBlockConfigurationContext();
	const componentClass = `${ layoutStyleClassPrefix }__product-price`;

	if ( ! product ) {
		return (
			<div
				className={ classnames(
					className,
					componentClass,
					'is-loading'
				) }
			/>
		);
	}

	const prices = product.prices || {};
	const currency = getCurrencyFromPriceResponse( prices );

	return (
		<div className={ classnames( className, componentClass ) }>
			{ hasPriceRange( prices ) ? (
				<PriceRange
					componentClass={ componentClass }
					currency={ currency }
					minAmount={ prices.price_range.min_amount }
					maxAmount={ prices.price_range.max_amount }
				/>
			) : (
				<Price
					componentClass={ componentClass }
					currency={ currency }
					price={ prices.price }
					regularPrice={ prices.regular_price }
				/>
			) }
		</div>
	);
};

const hasPriceRange = ( prices ) => {
	return (
		prices.price_range &&
		prices.price_range.min_amount &&
		prices.price_range.max_amount
	);
};

const PriceRange = ( { componentClass, currency, minAmount, maxAmount } ) => {
	return (
		<span className={ `${ componentClass }__value` }>
			<FormattedMonetaryAmount
				currency={ currency }
				value={ minAmount }
			/>
			&nbsp;&mdash;&nbsp;
			<FormattedMonetaryAmount
				currency={ currency }
				value={ maxAmount }
			/>
		</span>
	);
};

const Price = ( { componentClass, currency, price, regularPrice } ) => {
	return (
		<>
			{ regularPrice !== price && (
				<del className={ `${ componentClass }__regular` }>
					<FormattedMonetaryAmount
						currency={ currency }
						value={ regularPrice }
					/>
				</del>
			) }
			<span className={ `${ componentClass }__value` }>
				<FormattedMonetaryAmount
					currency={ currency }
					value={ price }
				/>
			</span>
		</>
	);
};

export default ProductPrice;
