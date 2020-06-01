/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';

/**
 * Product Price Block Component.
 *
 * @param {Object} props             Incoming props.
 * @param {string} [props.className] CSS Class name for the component.
 * @param {Object} [props.product]   Optional product object. Product from context will be used if
 *                                   this is not provided.
 * @return {*} The component.
 */
const ProductPrice = ( { className, ...props } ) => {
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product;
	const { parentClassName } = useInnerBlockLayoutContext();

	if ( ! product ) {
		return (
			<div
				className={ classnames(
					className,
					`${ parentClassName }__product-price`,
					`price`
				) }
			/>
		);
	}

	const prices = product.prices || {};
	const currency = getCurrencyFromPriceResponse( prices );

	return (
		<div
			className={ classnames(
				className,
				`${ parentClassName }__product-price`,
				`price`
			) }
		>
			{ hasPriceRange( prices ) ? (
				<PriceRange
					parentClassName={ parentClassName }
					currency={ currency }
					minAmount={ prices.price_range.min_amount }
					maxAmount={ prices.price_range.max_amount }
				/>
			) : (
				<Price
					parentClassName={ parentClassName }
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

const PriceRange = ( { parentClassName, currency, minAmount, maxAmount } ) => {
	return (
		<span className={ `${ parentClassName }__product-price-value` }>
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

const Price = ( { parentClassName, currency, price, regularPrice } ) => {
	return (
		<>
			{ regularPrice !== price && (
				<del
					className={ `${ parentClassName }__product-price-regular` }
				>
					<FormattedMonetaryAmount
						currency={ currency }
						value={ regularPrice }
					/>
				</del>
			) }
			<span className={ `${ parentClassName }__product-price-value` }>
				<FormattedMonetaryAmount
					currency={ currency }
					value={ price }
				/>
			</span>
		</>
	);
};

ProductPrice.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default ProductPrice;
