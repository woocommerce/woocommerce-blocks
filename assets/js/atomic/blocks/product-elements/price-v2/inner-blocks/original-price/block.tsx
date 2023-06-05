/**
 * External dependencies
 */
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { useStyleProps } from '@woocommerce/base-hooks';
import { useInnerBlockLayoutContext } from '@woocommerce/shared-context';
import ProductPrice from '@woocommerce/base-components/product-price';

/**
 * Internal dependencies
 */
import type { PriceProps } from '../../types';

type Props = PriceProps & HTMLAttributes< HTMLDivElement >;

const Block = ( {
	attributes,
	context,
	rawPrice,
	priceType,
	currency,
}: Props ): JSX.Element | null => {
	const { className } = attributes;
	const { isDescendentOfSingleProductTemplate = false } = context || {};
	const { className: stylesClassName, style } = useStyleProps( attributes );
	const { parentClassName } = useInnerBlockLayoutContext();
	const wrapperClassName = classnames(
		className,
		{
			[ `${ parentClassName }__product-price` ]: parentClassName,
		},
		stylesClassName
	);
	if ( ! rawPrice && ! isDescendentOfSingleProductTemplate ) {
		return <ProductPrice className={ wrapperClassName } />;
	}

	const pricePreview = '5000';
	const priceClassName = classnames( {
		[ `${ parentClassName }__product-${ priceType }-price__value` ]:
			parentClassName,
	} );

	return (
		<ProductPrice
			className={ wrapperClassName }
			style={ style }
			priceStyle={ style }
			priceClassName={ priceClassName }
			currency={ currency }
			withSuperScript={ context[ 'woocommerce/withSuperScriptStyle' ] }
			price={
				isDescendentOfSingleProductTemplate ? pricePreview : rawPrice
			}
		/>
	);
};

export default Block;
