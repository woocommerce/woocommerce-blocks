/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import triggerFetch from '@wordpress/api-fetch';
import {
	useEffect,
	useRef,
	useCallback,
	useState,
	useMemo,
} from '@wordpress/element';
import {
	emptyHiddenAddressFields,
	removeAllNotices,
} from '@woocommerce/base-utils';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	CHECKOUT_STORE_KEY,
	PAYMENT_STORE_KEY,
	VALIDATION_STORE_KEY,
	processErrorResponse,
} from '@woocommerce/block-data';
import {
	getPaymentMethods,
	getExpressPaymentMethods,
} from '@woocommerce/blocks-registry';
import {
	ApiResponse,
	CheckoutResponseSuccess,
	CheckoutResponseError,
	assertResponseIsValid,
} from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { preparePaymentData, processCheckoutResponseHeaders } from './utils';
import { useCheckoutEventsContext } from './checkout-events';
import { useShippingDataContext } from './shipping';
import { useCustomerDataContext } from './customer';
import { useStoreCart } from '../../hooks/cart/use-store-cart';

/**
 * CheckoutProcessor component.
 *
 * Subscribes to checkout context and triggers processing via the API.
 */
const CheckoutProcessor = () => {
	const { onCheckoutValidationBeforeProcessing } = useCheckoutEventsContext();
	const {
		hasError: checkoutHasError,
		redirectUrl,
		isProcessing: checkoutIsProcessing,
		isBeforeProcessing: checkoutIsBeforeProcessing,
		isComplete: checkoutIsComplete,
		orderNotes,
		shouldCreateAccount,
		extensionData,
	} = useSelect( ( select ) => {
		const store = select( CHECKOUT_STORE_KEY );
		return {
			...store.getCheckoutState(),
			isProcessing: store.isProcessing(),
			isBeforeProcessing: store.isBeforeProcessing(),
			isComplete: store.isComplete(),
		};
	} );
	const { __internalSetHasError, __internalProcessCheckoutResponse } =
		useDispatch( CHECKOUT_STORE_KEY );
	const hasValidationErrors = useSelect(
		( select ) => select( VALIDATION_STORE_KEY ).hasValidationErrors
	);
	const { shippingErrorStatus } = useShippingDataContext();
	const { billingAddress, shippingAddress } = useCustomerDataContext();
	const { cartNeedsPayment, cartNeedsShipping, receiveCart } = useStoreCart();

	const {
		activePaymentMethod,
		paymentMethodData,
		isExpressPaymentMethodActive,
		hasPaymentError,
		isPaymentSuccess,
		shouldSavePayment,
	} = useSelect( ( select ) => {
		const store = select( PAYMENT_STORE_KEY );

		return {
			activePaymentMethod: store.getActivePaymentMethod(),
			paymentMethodData: store.getPaymentMethodData(),
			isExpressPaymentMethodActive: store.isExpressPaymentMethodActive(),
			hasPaymentError: store.hasPaymentError(),
			isPaymentSuccess: store.isPaymentSuccess(),
			shouldSavePayment: store.getShouldSavePaymentMethod(),
		};
	}, [] );

	const paymentMethods = getPaymentMethods();
	const expressPaymentMethods = getExpressPaymentMethods();
	const currentBillingAddress = useRef( billingAddress );
	const currentShippingAddress = useRef( shippingAddress );
	const currentRedirectUrl = useRef( redirectUrl );
	const [ isProcessingOrder, setIsProcessingOrder ] = useState( false );

	const paymentMethodId = useMemo( () => {
		const merged = {
			...expressPaymentMethods,
			...paymentMethods,
		};
		return merged?.[ activePaymentMethod ]?.paymentMethodId;
	}, [ activePaymentMethod, expressPaymentMethods, paymentMethods ] );

	const checkoutWillHaveError =
		( hasValidationErrors() && ! isExpressPaymentMethodActive ) ||
		hasPaymentError ||
		shippingErrorStatus.hasError;

	const paidAndWithoutErrors =
		! checkoutHasError &&
		! checkoutWillHaveError &&
		( isPaymentSuccess || ! cartNeedsPayment ) &&
		checkoutIsProcessing;

	useEffect( () => {
		// Determine if checkout has an error.
		if (
			checkoutWillHaveError !== checkoutHasError &&
			( checkoutIsProcessing || checkoutIsBeforeProcessing ) &&
			! isExpressPaymentMethodActive
		) {
			__internalSetHasError( checkoutWillHaveError );
		}
	}, [
		checkoutWillHaveError,
		checkoutHasError,
		checkoutIsProcessing,
		checkoutIsBeforeProcessing,
		isExpressPaymentMethodActive,
		__internalSetHasError,
	] );

	useEffect( () => {
		// Keep the billing, shipping and redirectUrl current
		currentBillingAddress.current = billingAddress;
		currentShippingAddress.current = shippingAddress;
		currentRedirectUrl.current = redirectUrl;
	}, [ billingAddress, shippingAddress, redirectUrl ] );

	const checkValidation = useCallback( () => {
		if ( hasValidationErrors() ) {
			return false;
		}
		if ( hasPaymentError ) {
			return {
				errorMessage: __(
					'There was a problem with your payment option.',
					'woo-gutenberg-products-block'
				),
			};
		}
		if ( shippingErrorStatus.hasError ) {
			return {
				errorMessage: __(
					'There was a problem with your shipping option.',
					'woo-gutenberg-products-block'
				),
			};
		}

		return true;
	}, [ hasValidationErrors, hasPaymentError, shippingErrorStatus.hasError ] );

	useEffect( () => {
		// Validate the checkout using the CHECKOUT_VALIDATION_BEFORE_PROCESSING event.
		let unsubscribeProcessing: () => void;
		if ( ! isExpressPaymentMethodActive ) {
			unsubscribeProcessing = onCheckoutValidationBeforeProcessing(
				checkValidation,
				0
			);
		}
		return () => {
			if (
				! isExpressPaymentMethodActive &&
				typeof unsubscribeProcessing === 'function'
			) {
				unsubscribeProcessing();
			}
		};
	}, [
		onCheckoutValidationBeforeProcessing,
		checkValidation,
		isExpressPaymentMethodActive,
	] );

	useEffect( () => {
		// Redirect when checkout is complete and there is a redirect url.
		if ( currentRedirectUrl.current ) {
			window.location.href = currentRedirectUrl.current;
		}
	}, [ checkoutIsComplete ] );

	// POST to the Store API and process and display any errors, or set order complete
	const processOrder = useCallback( async () => {
		if ( isProcessingOrder ) {
			return;
		}
		removeAllNotices();
		setIsProcessingOrder( true );

		const paymentData = cartNeedsPayment
			? {
					payment_method: paymentMethodId,
					payment_data: preparePaymentData(
						paymentMethodData,
						shouldSavePayment,
						activePaymentMethod
					),
			  }
			: {};

		triggerFetch( {
			path: '/wc/store/v1/checkout',
			method: 'POST',
			data: {
				shipping_address: cartNeedsShipping
					? emptyHiddenAddressFields( currentShippingAddress.current )
					: undefined,
				billing_address: emptyHiddenAddressFields(
					currentBillingAddress.current
				),
				customer_note: orderNotes,
				create_account: shouldCreateAccount,
				...paymentData,
				extensions: { ...extensionData },
			},
			cache: 'no-store',
			parse: false,
		} )
			.then( ( response: unknown ) => {
				assertResponseIsValid< CheckoutResponseSuccess >( response );
				processCheckoutResponseHeaders( response.headers );
				if ( ! response.ok ) {
					throw response;
				}
				return response.json();
			} )
			.then( ( responseJson: CheckoutResponseSuccess ) => {
				__internalProcessCheckoutResponse( responseJson );
				setIsProcessingOrder( false );
			} )
			.catch( ( errorResponse: ApiResponse< CheckoutResponseError > ) => {
				processCheckoutResponseHeaders( errorResponse?.headers );
				try {
					// This attempts to parse a JSON error response where the status code was 4xx/5xx.
					errorResponse
						.json()
						.then(
							( response ) => response as CheckoutResponseError
						)
						.then( ( response: CheckoutResponseError ) => {
							if ( response.data?.cart ) {
								receiveCart( response.data.cart );
							}
							processErrorResponse( response );
							__internalProcessCheckoutResponse( response );
						} );
				} catch {
					processErrorResponse( {
						code: 'unknown_error',
						message: __(
							'Something went wrong. Please try placing your order again.',
							'woo-gutenberg-products-block'
						),
						data: null,
					} );
				}
				__internalSetHasError( true );
				setIsProcessingOrder( false );
			} );
	}, [
		isProcessingOrder,
		cartNeedsPayment,
		paymentMethodId,
		paymentMethodData,
		shouldSavePayment,
		activePaymentMethod,
		orderNotes,
		shouldCreateAccount,
		extensionData,
		cartNeedsShipping,
		receiveCart,
		__internalSetHasError,
		__internalProcessCheckoutResponse,
	] );

	// Process order if conditions are good.
	useEffect( () => {
		if ( paidAndWithoutErrors && ! isProcessingOrder ) {
			processOrder();
		}
	}, [ processOrder, paidAndWithoutErrors, isProcessingOrder ] );

	return null;
};

export default CheckoutProcessor;
