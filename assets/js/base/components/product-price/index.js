/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

const PriceRange = ( {
	className,
	currency,
	maxPrice,
	minPrice,
	priceClassName,
	priceStyle,
	suffix = '',
} ) => {
	return (
		<span className={ className }>
			<FormattedMonetaryAmount
				className={ classNames(
					'wc-block-components-product-price__value',
					priceClassName
				) }
				currency={ currency }
				value={ minPrice }
				style={ priceStyle }
			/>
			&nbsp;&mdash;&nbsp;
			<FormattedMonetaryAmount
				className={ classNames(
					'wc-block-components-product-price__value',
					priceClassName
				) }
				currency={ currency }
				value={ maxPrice }
				style={ priceStyle }
			/>
			{ suffix && ' ' }
			{ suffix }
		</span>
	);
};

const SalePrice = ( {
	className,
	currency,
	regularPriceClassName,
	regularPriceStyle,
	regularPrice,
	priceClassName,
	priceStyle,
	price,
	suffix = '',
} ) => {
	return (
		<span className={ className }>
			<span className="screen-reader-text">
				{ __( 'Previous price:', 'woo-gutenberg-products-block' ) }
			</span>
			<FormattedMonetaryAmount
				currency={ currency }
				renderText={ ( value ) => (
					<del
						className={ classNames(
							'wc-block-components-product-price__regular',
							regularPriceClassName
						) }
						style={ regularPriceStyle }
					>
						{ value }
					</del>
				) }
				value={ regularPrice }
			/>
			<span className="screen-reader-text">
				{ __( 'Discounted price:', 'woo-gutenberg-products-block' ) }
			</span>
			<FormattedMonetaryAmount
				currency={ currency }
				renderText={ ( value ) => (
					<ins
						className={ classNames(
							'wc-block-components-product-price__value',
							'is-discounted',
							priceClassName
						) }
						style={ priceStyle }
					>
						{ value }
					</ins>
				) }
				value={ price }
			/>
			{ suffix && ' ' }
			{ suffix }
		</span>
	);
};

const ProductPrice = ( {
	align,
	className,
	currency,
	maxPrice = null,
	minPrice = null,
	price = null,
	priceClassName,
	priceStyle,
	regularPrice,
	regularPriceClassName,
	regularPriceStyle,
	suffix = '',
} ) => {
	const wrapperClassName = classNames(
		className,
		'price',
		'wc-block-components-product-price',
		{
			[ `wc-block-components-product-price--align-${ align }` ]: align,
		}
	);

	const isDiscounted = regularPrice && price !== regularPrice;

	if ( isDiscounted ) {
		return (
			<>
				<SalePrice
					className={ wrapperClassName }
					currency={ currency }
					price={ price }
					priceClassName={ priceClassName }
					priceStyle={ priceStyle }
					regularPrice={ regularPrice }
					regularPriceClassName={ regularPriceClassName }
					regularPriceStyle={ regularPriceStyle }
					suffix={ suffix }
				/>
			</>
		);
	}

	if ( minPrice !== null && maxPrice !== null ) {
		return (
			<>
				<PriceRange
					className={ wrapperClassName }
					currency={ currency }
					maxPrice={ maxPrice }
					minPrice={ minPrice }
					priceClassName={ priceClassName }
					priceStyle={ priceStyle }
					suffix={ suffix }
				/>
			</>
		);
	}

	if ( price !== null ) {
		return (
			<span className={ wrapperClassName }>
				<FormattedMonetaryAmount
					className={ classNames(
						'wc-block-components-product-price__value',
						priceClassName
					) }
					currency={ currency }
					value={ price }
					style={ priceStyle }
				/>
				{ suffix && ' ' }
				{ suffix }
			</span>
		);
	}

	return (
		<span className={ wrapperClassName }>
			<span
				className={ classNames(
					'wc-block-components-product-price__value',
					priceClassName
				) }
			/>
		</span>
	);
};

ProductPrice.propTypes = {
	align: PropTypes.oneOf( [ 'left', 'center', 'right' ] ),
	className: PropTypes.string,
	currency: PropTypes.object,
	price: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	priceClassName: PropTypes.string,
	priceStyle: PropTypes.object,
	// Range price props
	maxPrice: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	minPrice: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	// On sale price props
	regularPrice: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	regularPriceClassName: PropTypes.string,
	regularPriceStyle: PropTypes.object,
	// Used to add info at the end of a price, for example "per day" will be appended with a space before it.
	suffix: PropTypes.string,
};

export default ProductPrice;
