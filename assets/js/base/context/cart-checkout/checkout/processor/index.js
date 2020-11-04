/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import triggerFetch from '@wordpress/api-fetch';
import {
	useCheckoutContext,
	useShippingDataContext,
	useBillingDataContext,
	usePaymentMethodDataContext,
	useValidationContext,
} from '@woocommerce/base-context';
import { useDispatch } from '@wordpress/data';
import {
	useEffect,
	useRef,
	useCallback,
	useState,
	useMemo,
} from '@wordpress/element';
import { useStoreCart, useStoreNotices } from '@woocommerce/base-hooks';
import { useDebounce } from 'use-debounce';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { preparePaymentData, shouldUpdateAddressStore } from './utils';

/**
 * CheckoutProcessor component.
 *
 * @todo Needs to consume all contexts.
 *
 * Subscribes to checkout context and triggers processing via the API.
 */
const CheckoutProcessor = () => {
	const [ isProcessingOrder, setIsProcessingOrder ] = useState( false );

	const {
		hasError: checkoutHasError,
		onCheckoutBeforeProcessing,
		dispatchActions,
		redirectUrl,
		isProcessing: checkoutIsProcessing,
		isBeforeProcessing: checkoutIsBeforeProcessing,
		isComplete: checkoutIsComplete,
		orderNotes,
		shouldCreateAccount,
	} = useCheckoutContext();
	const { hasValidationErrors } = useValidationContext();
	const { shippingAddress, shippingErrorStatus } = useShippingDataContext();
	const { billingData } = useBillingDataContext();
	const {
		activePaymentMethod,
		currentStatus: currentPaymentStatus,
		paymentMethodData,
		expressPaymentMethods,
		paymentMethods,
		shouldSavePayment,
	} = usePaymentMethodDataContext();

	const { cartNeedsPayment, receiveCart } = useStoreCart();
	const { addErrorNotice, removeNotice, setIsSuppressed } = useStoreNotices();

	const currentBillingData = useRef( billingData );
	const currentShippingAddress = useRef( shippingAddress );
	const currentRedirectUrl = useRef( redirectUrl );

	const { updateCustomerAddress } = useDispatch( storeKey );
	const previousBillingData = useRef( billingData );
	const previousShippingAddress = useRef( shippingAddress );
	const [ debouncedBillingData ] = useDebounce( billingData, 400 );
	const [ debouncedShippingAddress ] = useDebounce( shippingAddress, 400 );

	const expressPaymentMethodActive = Object.keys(
		expressPaymentMethods
	).includes( activePaymentMethod );

	const checkoutWillHaveError =
		( hasValidationErrors && ! expressPaymentMethodActive ) ||
		currentPaymentStatus.hasError ||
		shippingErrorStatus.hasError;

	const paidAndWithoutErrors =
		! checkoutHasError &&
		! checkoutWillHaveError &&
		( currentPaymentStatus.isSuccessful || ! cartNeedsPayment ) &&
		checkoutIsProcessing;

	const paymentMethodId = useMemo( () => {
		const merged = { ...expressPaymentMethods, ...paymentMethods };
		return merged?.[ activePaymentMethod ]?.paymentMethodId;
	}, [ activePaymentMethod, expressPaymentMethods, paymentMethods ] );

	const checkValidation = useCallback( () => {
		if ( hasValidationErrors ) {
			return {
				errorMessage: __(
					'Some input fields are invalid.',
					'woo-gutenberg-products-block'
				),
			};
		}
		if ( currentPaymentStatus.hasError ) {
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
	}, [
		hasValidationErrors,
		currentPaymentStatus.hasError,
		shippingErrorStatus.hasError,
	] );

	const processOrder = useCallback( () => {
		setIsProcessingOrder( true );
		removeNotice( 'checkout' );
		let data = {
			billing_address: currentBillingData.current,
			shipping_address: currentShippingAddress.current,
			customer_note: orderNotes,
			should_create_account: shouldCreateAccount,
		};
		if ( cartNeedsPayment ) {
			data = {
				...data,
				payment_method: paymentMethodId,
				payment_data: preparePaymentData(
					paymentMethodData,
					shouldSavePayment,
					activePaymentMethod
				),
			};
		}
		triggerFetch( {
			path: '/wc/store/checkout',
			method: 'POST',
			data,
			cache: 'no-store',
			parse: false,
		} )
			.then( ( fetchResponse ) => {
				// Update nonce.
				triggerFetch.setNonce( fetchResponse.headers );

				// Handle response.
				fetchResponse.json().then( function ( response ) {
					if ( ! fetchResponse.ok ) {
						// We received an error response.
						if ( response.body && response.body.message ) {
							addErrorNotice( response.body.message, {
								id: 'checkout',
							} );
						} else {
							addErrorNotice(
								__(
									'Something went wrong. Please contact us to get assistance.',
									'woo-gutenberg-products-block'
								),
								{
									id: 'checkout',
								}
							);
						}
						dispatchActions.setHasError();
					}
					dispatchActions.setAfterProcessing( response );
					setIsProcessingOrder( false );
				} );
			} )
			.catch( ( error ) => {
				error.json().then( function ( response ) {
					// If updated cart state was returned, also update that.
					if ( response.data?.cart ) {
						receiveCart( response.data.cart );
					}
					dispatchActions.setHasError();
					dispatchActions.setAfterProcessing( response );
					setIsProcessingOrder( false );
				} );
			} );
	}, [
		addErrorNotice,
		removeNotice,
		paymentMethodId,
		activePaymentMethod,
		paymentMethodData,
		shouldSavePayment,
		cartNeedsPayment,
		receiveCart,
		dispatchActions,
		orderNotes,
		shouldCreateAccount,
	] );

	// Subscribe validation.
	useEffect( () => {
		let unsubscribeProcessing;
		if ( ! expressPaymentMethodActive ) {
			unsubscribeProcessing = onCheckoutBeforeProcessing(
				checkValidation,
				0
			);
		}
		return () => {
			if ( ! expressPaymentMethodActive ) {
				unsubscribeProcessing();
			}
		};
	}, [
		onCheckoutBeforeProcessing,
		checkValidation,
		expressPaymentMethodActive,
	] );

	// If express payment method is active then suppress notices.
	useEffect( () => {
		setIsSuppressed( expressPaymentMethodActive );
	}, [ expressPaymentMethodActive, setIsSuppressed ] );

	// If an error is about to occur, dispatch it.
	useEffect( () => {
		if (
			checkoutWillHaveError !== checkoutHasError &&
			( checkoutIsProcessing || checkoutIsBeforeProcessing ) &&
			! expressPaymentMethodActive
		) {
			dispatchActions.setHasError( checkoutWillHaveError );
		}
	}, [
		checkoutWillHaveError,
		checkoutHasError,
		checkoutIsProcessing,
		checkoutIsBeforeProcessing,
		expressPaymentMethodActive,
		dispatchActions,
	] );

	// Keep refs up to date.
	useEffect( () => {
		currentBillingData.current = billingData;
		currentShippingAddress.current = shippingAddress;
		currentRedirectUrl.current = redirectUrl;
	}, [ billingData, shippingAddress, redirectUrl ] );

	// When the billing or shipping address changes we need to push the changes to the server to
	// get an updated cart--things such as taxes may be affected. This will push both billing and
	// shipping addresses to the server and get an updated cart in a single request.
	useEffect( () => {
		if (
			shouldUpdateAddressStore(
				previousBillingData.current,
				currentBillingData.current
			) ||
			shouldUpdateAddressStore(
				previousShippingAddress.current,
				currentShippingAddress.current
			)
		) {
			previousBillingData.current = currentBillingData.current;
			previousShippingAddress.current = currentShippingAddress.current;

			updateCustomerAddress( {
				shipping_address: currentShippingAddress.current,
				billing_address: {
					...currentBillingData.current,
					phone: currentBillingData.current.phone || null,
					email: currentBillingData.current.email || null,
				},
			} ).catch( ( error ) => {
				addErrorNotice( error.message, {
					id: 'checkout',
				} );
			} );
		}
	}, [
		debouncedBillingData,
		debouncedShippingAddress,
		addErrorNotice,
		updateCustomerAddress,
	] );

	// redirect when checkout is complete and there is a redirect url.
	useEffect( () => {
		if ( currentRedirectUrl.current ) {
			window.location.href = currentRedirectUrl.current;
		}
	}, [ checkoutIsComplete ] );

	// process order if conditions are good.
	useEffect( () => {
		if ( paidAndWithoutErrors && ! isProcessingOrder ) {
			processOrder();
		}
	}, [ processOrder, paidAndWithoutErrors, isProcessingOrder ] );

	return null;
};

export default CheckoutProcessor;
