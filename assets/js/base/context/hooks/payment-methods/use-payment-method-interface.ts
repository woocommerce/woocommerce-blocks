/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useCallback, useEffect, useRef } from '@wordpress/element';
import PaymentMethodLabel from '@woocommerce/base-components/cart-checkout/payment-method-label';
import PaymentMethodIcons from '@woocommerce/base-components/cart-checkout/payment-method-icons';
import { getSetting } from '@woocommerce/settings';
import deprecated from '@wordpress/deprecated';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import type { PaymentMethodInterface } from '@woocommerce/types';
import { useSelect, useDispatch } from '@wordpress/data';
import { CHECKOUT_STORE_KEY, PAYMENT_STORE_KEY } from '@woocommerce/block-data';
import { ValidationInputError } from '@woocommerce/base-components/validation-input-error';

/**
 * Internal dependencies
 */
import { useStoreCart } from '../cart/use-store-cart';
import { useStoreCartCoupons } from '../cart/use-store-cart-coupons';
import { noticeContexts, responseTypes } from '../../event-emit';
import { useCheckoutEventsContext } from '../../providers/cart-checkout/checkout-events';
import { usePaymentEventsContext } from '../../providers/cart-checkout/payment-events';
import { useShippingDataContext } from '../../providers/cart-checkout/shipping';
import { useCustomerDataContext } from '../../providers/cart-checkout/customer';
import { prepareTotalItems } from './utils';
import { useShippingData } from '../shipping/use-shipping-data';

/**
 * Returns am interface to use as payment method props.
 */
export const usePaymentMethodInterface = (): PaymentMethodInterface => {
	const {
		onCheckoutBeforeProcessing,
		onCheckoutValidationBeforeProcessing,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
		onSubmit,
	} = useCheckoutEventsContext();

	const { isCalculating, isComplete, isIdle, isProcessing, customerId } =
		useSelect( ( select ) => {
			const store = select( CHECKOUT_STORE_KEY );
			return {
				isComplete: store.isComplete(),
				isIdle: store.isIdle(),
				isProcessing: store.isProcessing(),
				customerId: store.getCustomerId(),
				isCalculating: store.isCalculating(),
			};
		} );
	const { currentStatus, activePaymentMethod, shouldSavePayment } = useSelect(
		( select ) => {
			const store = select( PAYMENT_STORE_KEY );

			return {
				currentStatus: store.getCurrentStatus(),
				activePaymentMethod: store.getActivePaymentMethod(),
				shouldSavePayment: store.getShouldSavePaymentMethod(),
			};
		}
	);

	const { __internalSetExpressPaymentError } =
		useDispatch( PAYMENT_STORE_KEY );

	const { onPaymentProcessing } = usePaymentEventsContext();
	const {
		shippingErrorStatus,
		shippingErrorTypes,
		onShippingRateSuccess,
		onShippingRateFail,
		onShippingRateSelectSuccess,
		onShippingRateSelectFail,
	} = useShippingDataContext();
	const {
		shippingRates,
		isLoadingRates,
		selectedRates,
		isSelectingRate,
		selectShippingRate,
		needsShipping,
	} = useShippingData();
	const { billingAddress, shippingAddress, setShippingAddress } =
		useCustomerDataContext();
	const { cartItems, cartFees, cartTotals, extensions } = useStoreCart();
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

	const deprecatedSetExpressPaymentError = useCallback(
		( errorMessage = '' ) => {
			deprecated(
				'setExpressPaymentError should only be used by Express Payment Methods (using the provided onError handler).',
				{
					alternative: '',
					plugin: 'woocommerce-gutenberg-products-block',
					link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228',
				}
			);
			__internalSetExpressPaymentError( errorMessage );
		},
		[ __internalSetExpressPaymentError ]
	);

	return {
		activePaymentMethod,
		billing: {
			appliedCoupons,
			billingAddress,
			billingData: billingAddress,
			cartTotal: currentCartTotal.current,
			cartTotalItems: currentCartTotals.current,
			currency: getCurrencyFromPriceResponse( cartTotals ),
			customerId,
			displayPricesIncludingTax: getSetting(
				'displayCartPricesIncludingTax',
				false
			) as boolean,
		},
		cartData: {
			cartItems,
			cartFees,
			extensions,
		},
		checkoutStatus: {
			isCalculating,
			isComplete,
			isIdle,
			isProcessing,
		},
		components: {
			LoadingMask,
			PaymentMethodIcons,
			PaymentMethodLabel,
			ValidationInputError,
		},
		emitResponse: {
			noticeContexts,
			responseTypes,
		},
		eventRegistration: {
			onCheckoutAfterProcessingWithError,
			onCheckoutAfterProcessingWithSuccess,
			onCheckoutBeforeProcessing,
			onCheckoutValidationBeforeProcessing,
			onPaymentProcessing,
			onShippingRateFail,
			onShippingRateSelectFail,
			onShippingRateSelectSuccess,
			onShippingRateSuccess,
		},
		onSubmit,
		paymentStatus: currentStatus,
		setExpressPaymentError: deprecatedSetExpressPaymentError,
		shippingData: {
			isSelectingRate,
			needsShipping,
			selectedRates,
			setSelectedRates: selectShippingRate,
			setShippingAddress,
			shippingAddress,
			shippingRates,
			shippingRatesLoading: isLoadingRates,
		},
		shippingStatus: {
			shippingErrorStatus,
			shippingErrorTypes,
		},
		shouldSavePayment,
	};
};
