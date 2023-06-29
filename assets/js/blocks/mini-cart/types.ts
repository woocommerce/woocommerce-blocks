export type IconType = 'cart' | 'bag' | 'bag-alt' | undefined;

export interface BlockAttributes {
	initialCartItemsCount: number;
	initialCartSubtotal: string;
	isInitiallyOpen?: boolean;
	colorClassNames?: string;
	style?: Record< string, Record< string, string > >;
	contents: string;
	miniCartIcon?: IconType;
	addToCartBehaviour: string;
	hasHiddenPrice: boolean;
	priceColorValue: string;
	iconColorValue: string;
	productCountColorValue: string;
}
