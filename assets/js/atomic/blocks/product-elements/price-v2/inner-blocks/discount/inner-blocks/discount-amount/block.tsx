/**
 * External dependencies
 */
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { useStyleProps } from '@woocommerce/base-hooks';
import { useInnerBlockLayoutContext } from '@woocommerce/shared-context';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';

/**
 * Internal dependencies
 */
import type { PriceProps } from '../../types';

type Props = PriceProps & HTMLAttributes< HTMLDivElement >;

const calculateDiscountAmount = ( originalPrice, currentPrice ) => {
	// todo: this assumes currentPrice is lower than originalPrice
	return parseInt( originalPrice, 10 ) - parseInt( currentPrice, 10 );
};

const calculateDiscountPercentage = ( originalPrice, currentPrice ) => {
	const discountAmount = calculateDiscountAmount(
		originalPrice,
		currentPrice
	);
	return Math.floor(
		( discountAmount / parseInt( originalPrice, 10 ) ) * 100
	);
};

const Block = ( {
	attributes,
	context,
	originalPrice,
	currentPrice,
	currency,
}: Props ): JSX.Element | null => {
	// todo: need to setup discountType and showDiscount as attributes/context
	// from the parent block.
	const {
		className,
		discountType = 'percentage',
		showDiscount = true,
	} = attributes;
	const isDescendentOfSingleProductTemplate =
		( context &&
			context[ 'woocommerce/isDescendentOfSingleProductTemplate' ] ) ||
		false;
	const { className: stylesClassName, style } = useStyleProps( attributes );
	const { parentClassName } = useInnerBlockLayoutContext();
	if ( ! showDiscount ) {
		return null;
	}
	const wrapperClassName = classnames(
		className,
		{
			[ `${ parentClassName }__product-price` ]: parentClassName,
		},
		stylesClassName
	);
	const priceClassName = classnames( {
		[ `${ parentClassName }__product-price_discount` ]: parentClassName,
	} );
	// todo: lift all the preview pricing up to the parent block (across all the price inner blocks)
	const oPrice = isDescendentOfSingleProductTemplate ? '3000' : originalPrice;
	const cPrice = isDescendentOfSingleProductTemplate ? '5000' : currentPrice;
	const DisplayedDiscount =
		discountType === 'percentage' ? (
			<span className={ priceClassName }>
				{ calculateDiscountPercentage( oPrice, cPrice ) }%
			</span>
		) : (
			<FormattedMonetaryAmount
				className={ priceClassName }
				currency={ currency }
				value={ calculateDiscountAmount( oPrice, cPrice ).toString() }
			/>
		);

	return (
		<span className={ wrapperClassName } style={ style }>
			{ DisplayedDiscount }
		</span>
	);
};

export default Block;
