/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useEffect, useRef } from '@wordpress/element';
import PaymentMethodLabel from '@woocommerce/base-components/cart-checkout/payment-method-label';
import PaymentMethodIcons from '@woocommerce/base-components/cart-checkout/payment-method-icons';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { ValidationInputError } from '../../providers/validation';
import { useStoreCart } from '../cart/use-store-cart';
import { useStoreCartCoupons } from '../cart/use-store-cart-coupons';
import { useEmitResponse } from '../use-emit-response';
import { useCheckoutContext } from '../../providers/cart-checkout/checkout-state';
import { usePaymentMethodDataContext } from '../../providers/cart-checkout/payment-methods';
import { useShippingDataContext } from '../../providers/cart-checkout/shipping';
import { useCustomerDataContext } from '../../providers/cart-checkout/customer';
import { prepareTotalItems } from './utils';

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').RegisteredPaymentMethodProps} RegisteredPaymentMethodProps
 */

/**
 * @return {RegisteredPaymentMethodProps} Interface to use as payment method props.
 */
export const usePaymentMethodInterface = () => {
	const {
		isCalculating,
		isComplete,
		isIdle,
		isProcessing,
		onCheckoutBeforeProcessing,
		onCheckoutValidationBeforeProcessing,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
		onSubmit,
		customerId,
	} = useCheckoutContext();
	const {
		currentStatus,
		activePaymentMethod,
		onPaymentProcessing,
		setExpressPaymentError,
		shouldSavePayment,
	} = usePaymentMethodDataContext();
	const {
		shippingErrorStatus,
		shippingErrorTypes,
		shippingRates,
		shippingRatesLoading,
		selectedRates,
		setSelectedRates,
		isSelectingRate,

		onShippingRateSuccess,
		onShippingRateFail,
		onShippingRateSelectSuccess,
		onShippingRateSelectFail,
		needsShipping,
	} = useShippingDataContext();
	const {
		billingData,
		shippingAddress,
		setShippingAddress,
	} = useCustomerDataContext();
	const { cartTotals } = useStoreCart();
	const { appliedCoupons } = useStoreCartCoupons();
	const { noticeContexts, responseTypes } = useEmitResponse();
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
		paymentStatus: currentStatus,
		shippingStatus: {
			shippingErrorStatus,
			shippingErrorTypes,
		},
		shippingData: {
			shippingRates,
			shippingRatesLoading,
			selectedRates,
			setSelectedRates,
			isSelectingRate,
			shippingAddress,
			setShippingAddress,
			needsShipping,
		},
		billing: {
			billingData,
			cartTotal: currentCartTotal.current,
			currency: getCurrencyFromPriceResponse( cartTotals ),
			cartTotalItems: currentCartTotals.current,
			displayPricesIncludingTax: getSetting(
				'displayCartPricesIncludingTax',
				false
			),
			appliedCoupons,
			customerId,
		},
		eventRegistration: {
			onCheckoutBeforeProcessing,
			onCheckoutValidationBeforeProcessing,
			onCheckoutAfterProcessingWithSuccess,
			onCheckoutAfterProcessingWithError,
			onShippingRateSuccess,
			onShippingRateFail,
			onShippingRateSelectSuccess,
			onShippingRateSelectFail,
			onPaymentProcessing,
		},
		components: {
			ValidationInputError,
			PaymentMethodIcons,
			PaymentMethodLabel,
		},
		emitResponse: {
			noticeContexts,
			responseTypes,
		},
		onSubmit,
		activePaymentMethod,
		setExpressPaymentError,
		shouldSavePayment,
	};
};
