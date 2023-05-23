/**
 * External dependencies
 */
import type { Currency } from '@woocommerce/types';
import type { CSSProperties } from 'react';

export interface ProductPriceProps {
	/**
	 * CSS class for the wrapper
	 */
	wrapperClassName?: string | undefined;
	/**
	 * Currency configuration object
	 */
	currency?: Currency;
	/**
	 * The string version of the element to use for the price interpolation
	 *
	 * **Note:** It should contain `<price/>` (which is also the default value)
	 */
	format?: string;
	/**
	 * The maximum price in a range
	 */
	maxPrice?: string | number;
	/**
	 * The minimum price in a range
	 */
	minPrice?: string | number;
	/**
	 * The current price
	 */
	price?: string | number;
	/**
	 * CSS class for the price
	 */
	priceClassName?: string;
	/**
	 * Custom style for the price
	 */
	priceStyle?: CSSProperties;
	/**
	 * Custom style for the wrapper
	 */
	style?: CSSProperties;
}

export const ProductPrice = ( {
	className,
	currency,
	format = '<price/>',
	maxPrice,
	minPrice,
	price,
	priceClassName,
	priceStyle,
	style,
} ) => {};
