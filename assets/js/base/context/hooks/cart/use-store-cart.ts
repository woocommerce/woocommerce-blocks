/** @typedef { import('@woocommerce/type-defs/hooks').StoreCart } StoreCart */

/**
 * External dependencies
 */
import { isEqual } from 'lodash';
import { useRef } from '@wordpress/element';
import {
	CART_STORE_KEY as storeKey,
	EMPTY_ARRAY,
	EMPTY_OBJECT,
} from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import type {
	StoreCart,
	CartResponseTotals,
	CartResponseFeeItem,
	CartResponseBillingAddress,
	CartResponseShippingAddress,
	CartResponseCouponItem,
	CartResponseCouponItemWithLabel,
} from '@woocommerce/types';
import {
	emptyHiddenAddressFields,
	fromEntriesPolyfill,
} from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import { useEditorContext } from '../../providers/editor-context';

declare module '@wordpress/html-entities' {
	// eslint-disable-next-line @typescript-eslint/no-shadow
	export function decodeEntities< T >( coupon: T ): T;
}
const defaultShippingAddress: CartResponseShippingAddress = {
	first_name: '',
	last_name: '',
	company: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	postcode: '',
	country: '',
	phone: '',
};

const defaultBillingAddress: CartResponseBillingAddress = {
	...defaultShippingAddress,
	email: '',
};

const defaultCartTotals: CartResponseTotals = {
	total_items: '',
	total_items_tax: '',
	total_fees: '',
	total_fees_tax: '',
	total_discount: '',
	total_discount_tax: '',
	total_shipping: '',
	total_shipping_tax: '',
	total_price: '',
	total_tax: '',
	tax_lines: EMPTY_ARRAY,
	currency_code: '',
	currency_symbol: '',
	currency_minor_unit: 2,
	currency_decimal_separator: '',
	currency_thousand_separator: '',
	currency_prefix: '',
	currency_suffix: '',
};

const decodeValues = (
	object: Record< string, unknown >
): Record< string, unknown > =>
	fromEntriesPolyfill(
		Object.entries( object ).map( ( [ key, value ] ) => [
			key,
			decodeEntities( value ),
		] )
	);

/**
 * @constant
 * @type  {StoreCart} Object containing cart data.
 */
export const defaultCartData: StoreCart = {
	cartCoupons: EMPTY_ARRAY,
	cartItems: EMPTY_ARRAY,
	cartFees: EMPTY_ARRAY,
	cartItemsCount: 0,
	cartItemsWeight: 0,
	cartNeedsPayment: true,
	cartNeedsShipping: true,
	cartItemErrors: EMPTY_ARRAY,
	cartTotals: defaultCartTotals,
	cartIsLoading: true,
	cartErrors: EMPTY_ARRAY,
	billingAddress: defaultBillingAddress,
	shippingAddress: defaultShippingAddress,
	shippingRates: EMPTY_ARRAY,
	shippingRatesLoading: false,
	cartHasCalculatedShipping: false,
	paymentRequirements: EMPTY_ARRAY,
	receiveCart: () => undefined,
	extensions: EMPTY_OBJECT,
};

/**
 * This is a custom hook that is wired up to the `wc/store/cart` data
 * store.
 *
 * @param {Object} options                An object declaring the various
 *                                        collection arguments.
 * @param {boolean} options.shouldSelect  If false, the previous results will be
 *                                        returned and internal selects will not
 *                                        fire.
 *
 * @return {StoreCart} Object containing cart data.
 */
export const useStoreCart = (
	options: { shouldSelect: boolean } = { shouldSelect: true }
): StoreCart => {
	const { isEditor, previewData } = useEditorContext();
	const previewCart = previewData?.previewCart || EMPTY_OBJECT;
	const { shouldSelect } = options;
	const currentResults = useRef();

	const results: StoreCart = useSelect(
		( select, { dispatch } ) => {
			if ( ! shouldSelect ) {
				return defaultCartData;
			}

			if ( isEditor ) {
				return {
					cartCoupons: previewCart.coupons,
					cartItems: previewCart.items,
					cartFees: previewCart.fees,
					cartItemsCount: previewCart.items_count,
					cartItemsWeight: previewCart.items_weight,
					cartNeedsPayment: previewCart.needs_payment,
					cartNeedsShipping: previewCart.needs_shipping,
					cartItemErrors: EMPTY_ARRAY,
					cartTotals: previewCart.totals,
					cartIsLoading: false,
					cartErrors: EMPTY_ARRAY,
					billingAddress: defaultBillingAddress,
					shippingAddress: defaultShippingAddress,
					extensions: EMPTY_OBJECT,
					shippingRates: previewCart.shipping_rates,
					shippingRatesLoading: false,
					cartHasCalculatedShipping:
						previewCart.has_calculated_shipping,
					paymentRequirements: previewCart.paymentRequirements,
					receiveCart:
						typeof previewCart?.receiveCart === 'function'
							? previewCart.receiveCart
							: () => undefined,
				};
			}

			const store = select( storeKey );
			const cartData = store.getCartData();
			const cartErrors = store.getCartErrors();
			const cartTotals = store.getCartTotals();
			const cartIsLoading = ! store.hasFinishedResolution(
				'getCartData'
			);
			const shippingRatesLoading = store.isCustomerDataUpdating();
			const { receiveCart } = dispatch( storeKey );
			const billingAddress = decodeValues( cartData.billingAddress );
			const shippingAddress = cartData.needsShipping
				? decodeValues( cartData.shippingAddress )
				: billingAddress;
			const cartFees =
				cartData?.fees?.length > 0
					? cartData.fees.map( ( fee: CartResponseFeeItem ) =>
							decodeValues( fee )
					  )
					: EMPTY_ARRAY;

			// Add a text property to the coupon to allow extensions to modify
			// the text used to display the coupon, without affecting the
			// functionality when it comes to removing the coupon.
			const cartCoupons: CartResponseCouponItemWithLabel[] =
				cartData?.coupons?.length > 0
					? cartData.coupons.map(
							( coupon: CartResponseCouponItem ) => ( {
								...coupon,
								label: coupon.code,
							} )
					  )
					: EMPTY_ARRAY;

			return {
				cartCoupons,
				cartItems: cartData.items || EMPTY_ARRAY,
				cartFees,
				cartItemsCount: cartData.itemsCount,
				cartItemsWeight: cartData.itemsWeight,
				cartNeedsPayment: cartData.needsPayment,
				cartNeedsShipping: cartData.needsShipping,
				cartItemErrors:
					cartData?.errors?.length > 0
						? cartData.errors
						: EMPTY_ARRAY,
				cartTotals,
				cartIsLoading,
				cartErrors,
				billingAddress: emptyHiddenAddressFields( billingAddress ),
				shippingAddress: emptyHiddenAddressFields( shippingAddress ),
				extensions: cartData.extensions || EMPTY_OBJECT,
				shippingRates: cartData.shippingRates || EMPTY_ARRAY,
				shippingRatesLoading,
				cartHasCalculatedShipping: cartData.hasCalculatedShipping,
				paymentRequirements:
					cartData.paymentRequirements || EMPTY_ARRAY,
				receiveCart,
			};
		},
		[ shouldSelect ]
	);

	if (
		! currentResults.current ||
		! isEqual( currentResults.current, results )
	) {
		currentResults.current = results;
	}

	return currentResults.current;
};
