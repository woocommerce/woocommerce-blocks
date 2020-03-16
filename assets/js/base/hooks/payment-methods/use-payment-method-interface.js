/**
 * External dependencies
 */
import {
	useCheckoutContext,
	usePaymentMethodDataContext,
	useShippingMethodDataContext,
} from '@woocommerce/base-context';
import { __ } from '@wordpress/i18n';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import { useEffect, useRef } from '@wordpress/element';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import {
	useStoreOrder,
	useStoreCartCoupons,
	useStoreCart,
	useBillingData,
} from '..';

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').RegisteredPaymentMethodProps} RegisteredPaymentMethodProps
 * @typedef {import('@woocommerce/type-defs/cart').CartTotalItem} CartTotalItem
 */

/**
 * Prepares the total items into a shape usable for display as passed on to
 * registered payment methods.
 *
 * @param {Object} totals Current cart total items
 * @param {boolean} needsShipping Whether or not shipping is needed.
 *
 * @return {CartTotalItem[]}  Array for cart total items prepared for use.
 */
export const prepareTotalItems = ( totals, needsShipping ) => {
	const newTotals = [];
	const factory = ( label, property ) => {
		const value = parseInt( totals[ property ], 10 );
		const tax = parseInt( totals[ property + '_tax' ], 10 );
		return {
			label,
			value,
			valueWithTax: value + tax,
		};
	};
	newTotals.push(
		factory(
			__( 'Subtotal:', 'woo-gutenberg-products-block' ),
			'total_items'
		)
	);
	newTotals.push(
		factory( __( 'Fees:', 'woo-gutenberg-products-block' ), 'total_fees' )
	);
	newTotals.push(
		factory(
			__( 'Discount:', 'woo-gutenberg-products-block' ),
			'total_discount'
		)
	);
	newTotals.push( {
		label: __( 'Taxes:', 'woo-gutenberg-products-block' ),
		value: parseInt( totals.total_tax, 10 ),
		valueWithTax: parseInt( totals.total_tax, 10 ),
	} );
	if ( needsShipping ) {
		newTotals.push(
			factory(
				__( 'Shipping:', 'woo-gutenberg-products-block' ),
				'total_shipping'
			)
		);
	}
	return newTotals;
};

// @todo This will expose the consistent properties used as the payment method
// interface pulled from the various contexts exposing data for the interface.
// @todo need to also include notices interfaces here (maybe?).
/**
 * @return {RegisteredPaymentMethodProps} Interface to use as payment method props.
 */
export const usePaymentMethodInterface = () => {
	const {
		isCalculating,
		isComplete,
		isIdle,
		isProcessing,
		onCheckoutCompleteSuccess,
		onCheckoutCompleteError,
		onCheckoutProcessing,
		onSubmit,
	} = useCheckoutContext();
	const {
		setPaymentStatus,
		currentStatus,
		activePaymentMethod,
		setActivePaymentMethod,
	} = usePaymentMethodDataContext();
	const {
		shippingErrorStatus,
		shippingErrorTypes,
		shippingRates,
		shippingRatesLoading,
		selectedRates,
		setSelectedRates,
		shippingAddress,
		setShippingAddress,
		onShippingRateSuccess,
		onShippingRateFail,
		onShippingRateSelectSuccess,
		onShippingRateSelectFail,
		needsShipping,
	} = useShippingMethodDataContext();
	const { billingData, setBillingData } = useBillingData();
	const { order, isLoading: orderLoading } = useStoreOrder();
	const { cartTotals } = useStoreCart();
	const { appliedCoupons } = useStoreCartCoupons();
	const currentCartTotals = useRef(
		prepareTotalItems( cartTotals, needsShipping )
	);
	const currentCartTotal = useRef( {
		label: __( 'Total', 'woo-gutenberg-products-block' ),
		value: parseInt( cartTotals.total_price, 10 ),
	} );

	useEffect( () => {
		currentCartTotals.current = prepareTotalItems(
			cartTotals,
			needsShipping
		);
		currentCartTotal.current = {
			label: __( 'Total', 'woo-gutenberg-products-block' ),
			value: parseInt( cartTotals.total_price, 10 ),
		};
	}, [ cartTotals, needsShipping ] );

	return {
		checkoutStatus: {
			isCalculating,
			isComplete,
			isIdle,
			isProcessing,
		},
		paymentStatus: {
			currentStatus,
			setPaymentStatus,
		},
		shippingStatus: {
			shippingErrorStatus,
			shippingErrorTypes,
		},
		shippingData: {
			shippingRates,
			shippingRatesLoading,
			selectedRates,
			setSelectedRates,
			shippingAddress,
			setShippingAddress,
			needsShipping,
		},
		billing: {
			billingData,
			setBillingData,
			order,
			orderLoading,
			cartTotal: currentCartTotal.current,
			currency: getCurrencyFromPriceResponse( cartTotals ),
			cartTotalItems: currentCartTotals.current,
			displayPricesIncludingTax: DISPLAY_CART_PRICES_INCLUDING_TAX,
			appliedCoupons,
		},
		eventRegistration: {
			onCheckoutCompleteSuccess,
			onCheckoutCompleteError,
			onCheckoutProcessing,
			onShippingRateSuccess,
			onShippingRateFail,
			onShippingRateSelectSuccess,
			onShippingRateSelectFail,
		},
		onSubmit,
		activePaymentMethod,
		setActivePaymentMethod,
	};
};
