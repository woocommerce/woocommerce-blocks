/**
 * Internal dependencies
 */
import { ShippingRateItemItem, MetaKeyValue } from './cart-response';

export interface CurrencyInfo {
	currencyCode: string;
	currencySymbol: string;
	currencyMinorUnit: number;
	currencyDecimalSeparator: string;
	currencyThousandSeparator: string;
	currencyPrefix: string;
	currencySuffix: string;
}

export interface CartTotalsItem extends CurrencyInfo {
	totalDiscount: string;
	totalDiscountTax: string;
}

export interface CartCouponItem {
	code: string;
	discountType: string;
	totals: CartTotalsItem;
}

export interface FirstNameLastName {
	firstName: string;
	lastName: string;
}

export interface BaseAddress {
	address1: string;
	address2: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
}

export interface CartShippingRateItemShippingRate extends CurrencyInfo {
	rateId: string;
	name: string;
	description: string;
	deliveryTime: string;
	price: string;
	taxes: string;
	instanceId: number;
	methodId: string;
	metaData: [ MetaKeyValue ];
	selected: boolean;
}

export interface CartShippingRateItem {
	packageId: number;
	name: string;
	destination: BaseAddress;
	items: [ ShippingRateItemItem ];
	shippingRates: [ CartShippingRateItemShippingRate ];
}

export interface CartShippingAddress extends BaseAddress, FirstNameLastName {
	company: string;
}

export interface CartBillingAddress extends CartShippingAddress {
	phone: string;
	email: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CartImageItem {
	id: number;
	src: string;
	thumbnail: string;
	srcset: string;
	sizes: string;
	name: string;
	alt: string;
}

export interface CartVariationItem {
	attribute: string;
	value: string;
}

export interface CartItemPrices extends CurrencyInfo {
	price: string;
	regularPrice: string;
	salePrice: string;
	priceRange: null | { minAmount: string; maxAmount: string };
	rawPrices: {
		precision: number;
		price: string;
		regularPrice: string;
		salePrice: string;
	};
}

export interface CartItemTotals extends CurrencyInfo {
	lineSubtotal: string;
	lineSubtotalTax: string;
	lineTotal: string;
	lineTotalTax: string;
}

export interface CartItem {
	key: string;
	id: number;
	quantity: number;
	quantityLimit: number;
	name: string;
	summary: string;
	shortDescription: string;
	description: string;
	sku: string;
	lowStockRemaining: string;
	backordersAllowed: boolean;
	showBackorderBadge: boolean;
	soldIndividually: boolean;
	permalink: string;
	images: [ CartImageItem ];
	variation: [ CartVariationItem ];
	prices: CartItemPrices;
	totals: CartItemTotals;
}

export interface CartTotalsTaxLineItem {
	name: string;
	price: string;
}

export interface CartFeeItemTotals extends CurrencyInfo {
	total: string;
	totalTax: string;
}

export interface CartFeeItem {
	id: string;
	name: string;
	totals: CartFeeItemTotals;
}

export interface CartTotals extends CurrencyInfo {
	totalItems: string;
	totalItemsTax: string;
	totalFees: string;
	totalFeesTax: string;
	totalDiscount: string;
	totalDiscountTax: string;
	totalShipping: string;
	totalShippingTax: string;
	totalPrice: string;
	totalTax: string;
	taxLines: [ CartTotalsTaxLineItem ];
}

export interface CartErrorItem {
	code: string;
	message: string;
}

export interface CartExtensionItem {
	[ key: string ]: unknown;
}

export interface Cart {
	coupons: [ CartCouponItem ];
	shippingRates: [ CartShippingRateItem ];
	shippingAddress: CartShippingAddress;
	billingAddress: CartBillingAddress;
	items: [ CartItem ];
	itemsCount: number;
	itemsWeight: number;
	needsPayment: boolean;
	needsShipping: boolean;
	hasCalculatedShipping: boolean;
	fees: [ CartFeeItem ];
	totals: CartTotalsItem;
	errors: [ CartErrorItem ];
	paymentRequirements: [ unknown ];
	extensions: [ CartExtensionItem ];
}
