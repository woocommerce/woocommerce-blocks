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
import { getColorClassName, getFontSizeClass } from '@wordpress/block-editor';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Product Price Block Component.
 *
 * @param {Object} props                      Incoming props.
 * @param {string} [props.className]          CSS Class name for the component.
 * @param {string} [props.align]              Text alignment.
 * @param {string} [props.fontSize]           Normal Price font size name.
 * @param {number} [props.customFontSize]     Normal Price custom font size.
 * @param {string} [props.saleFontSize]       Sale Price font size name.
 * @param {number} [props.customSaleFontSize] Sale Price custom font size.
 * @param {string} [props.color]              Normal Price text color.
 * @param {string} [props.customColor]        Normal Price custom text color.
 * @param {string} [props.saleColor]          Sale Price text color.
 * @param {string} [props.customSaleColor]    Sale Price custom text color.
 * @param {Object} [props.product]            Optional product object. Product from
 * context will be used if this is not provided.
 * @return {*} The component.
 */
const Block = ( {
	className,
	align,
	fontSize,
	customFontSize,
	saleFontSize,
	customSaleFontSize,
	color,
	customColor,
	saleColor,
	customSaleColor,
	...props
} ) => {
	const { parentClassName } = useInnerBlockLayoutContext();
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product;

	const colorClass = getColorClassName( 'color', color );
	const saleColorClass = getColorClassName( 'color', saleColor );
	const fontSizeClass = getFontSizeClass( fontSize );
	const saleFontSizeClass = getFontSizeClass( saleFontSize );

	const classes = classnames( {
		'has-text-color': color || customColor,
		'has-font-size': fontSize || customFontSize,
		[ colorClass ]: colorClass,
		[ fontSizeClass ]: fontSizeClass,
	} );

	const saleClasses = classnames( {
		'has-text-color': saleColor || customSaleColor,
		'has-font-size': saleFontSize || customSaleFontSize,
		[ saleColorClass ]: saleColorClass,
		[ saleFontSizeClass ]: saleFontSizeClass,
	} );

	const style = {
		color: customColor,
		fontSize: customFontSize,
	};

	const saleStyle = {
		color: customSaleColor,
		fontSize: customSaleFontSize,
	};
	if ( ! product ) {
		return (
			<div
				className={ classnames(
					className,
					'price',
					'wc-block-components-product-price',
					`${ parentClassName }__product-price`
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
				'price',
				'wc-block-components-product-price',
				`${ parentClassName }__product-price`,
				{
					[ `wc-block-components-product-price__align-${ align }` ]:
						align && isFeaturePluginBuild(),
				}
			) }
		>
			{ hasPriceRange( prices ) ? (
				<PriceRange
					currency={ currency }
					minAmount={ prices.price_range.min_amount }
					maxAmount={ prices.price_range.max_amount }
				/>
			) : (
				<Price
					currency={ currency }
					price={ prices.price }
					regularPrice={ prices.regular_price }
					classes={ classes }
					style={ style }
					saleClasses={ saleClasses }
					saleStyle={ saleStyle }
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

const PriceRange = ( { currency, minAmount, maxAmount } ) => {
	const { parentClassName } = useInnerBlockLayoutContext();

	return (
		<span
			className={ classnames(
				'wc-block-components-product-price__value',
				`${ parentClassName }__product-price__value`
			) }
		>
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

const Price = ( {
	currency,
	price,
	regularPrice,
	classes = '',
	style = {},
	saleClasses = '',
	saleStyle = {},
} ) => {
	const { parentClassName } = useInnerBlockLayoutContext();
	saleClasses = regularPrice === price ? classes : saleClasses;
	saleStyle = regularPrice === price ? style : saleStyle;
	return (
		<>
			{ regularPrice !== price && (
				<del
					className={ classnames(
						'wc-block-components-product-price__regular',
						`${ parentClassName }__product-price__regular`,
						{ [ classes ]: isFeaturePluginBuild() }
					) }
					style={ isFeaturePluginBuild ? style : {} }
				>
					<FormattedMonetaryAmount
						currency={ currency }
						value={ regularPrice }
					/>
				</del>
			) }
			<span
				className={ classnames(
					'wc-block-components-product-price__value',
					`${ parentClassName }__product-price__value`,
					{ [ saleClasses ]: isFeaturePluginBuild() }
				) }
				style={ isFeaturePluginBuild ? saleStyle : {} }
			>
				<FormattedMonetaryAmount
					currency={ currency }
					value={ price }
				/>
			</span>
		</>
	);
};

Block.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default Block;
