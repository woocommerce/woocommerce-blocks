/**
 * External dependencies
 */
import type { CSSProperties } from 'react';
import type { ProductPriceProps } from '@woocommerce/base-components/product-price';

// old code
export interface BlockAttributes {
	productId?: number;
	className?: string;
	textAlign?: 'left' | 'center' | 'right';
	isDescendentOfQueryLoop?: boolean;
	isDescendentOfSingleProductTemplate?: boolean;
}

export interface PriceContext {
	isDescendentOfSingleProductTemplate: boolean;
}

export interface PriceAttributes {
	className?: string;
	style: CSSProperties;
}

export interface PriceProps extends ProductPriceProps {
	attributes: PriceAttributes;
	context?: PriceContext;
	rawPrice?: string;
	priceType: 'original' | 'current';
}
