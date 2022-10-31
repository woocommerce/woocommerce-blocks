/**
 * External dependencies
 */
import classnames from 'classnames';
import ProductPrice from '@woocommerce/base-components/product-price';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { useColorProps, useTypographyProps } from '@woocommerce/base-hooks';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import type { HTMLAttributes } from 'react';

/**
 * Internal dependencies
 */
import type { BlockAttributes } from './types';

type Props = BlockAttributes & HTMLAttributes< HTMLDivElement >;

const Block = ( props: Props ): JSX.Element | null => {
	const { className, textAlign } = props;
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();

	const colorProps = useColorProps( props );
	const typographyProps = useTypographyProps( props );

	const wrapperClassName = classnames(
		'wc-block-components-product-price',
		className,
		colorProps.className,
		{
			[ `${ parentClassName }__product-price` ]: parentClassName,
		}
	);

	const style = {
		...typographyProps.style,
		...colorProps.style,
	};

	if ( ! product.id ) {
		return (
			<ProductPrice align={ textAlign } className={ wrapperClassName } />
		);
	}

	const prices = product.prices;
	const currency = getCurrencyFromPriceResponse( prices );
	const isOnSale = prices.price !== prices.regular_price;
	const priceClassName = classnames( {
		[ `${ parentClassName }__product-price__value` ]: parentClassName,
		[ `${ parentClassName }__product-price__value--on-sale` ]: isOnSale,
	} );

	return (
		<ProductPrice
			align={ textAlign }
			className={ wrapperClassName }
			priceStyle={ style }
			regularPriceStyle={ style }
			priceClassName={ priceClassName }
			currency={ currency }
			price={ prices.price }
			// Range price props
			minPrice={ prices?.price_range?.min_amount }
			maxPrice={ prices?.price_range?.max_amount }
			// This is the regular or original price when the `price` value is a sale price.
			regularPrice={ prices.regular_price }
			regularPriceClassName={ classnames( {
				[ `${ parentClassName }__product-price__regular` ]:
					parentClassName,
			} ) }
		/>
	);
};

export default withProductDataContext( Block );
