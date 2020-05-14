/**
 * External dependencies
 */
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { useStripe } from '@stripe/react-stripe-js';
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	getPaymentRequest,
	updatePaymentRequest,
	canDoPaymentRequest,
	getBillingData,
	getPaymentMethodData,
	normalizeShippingAddressForCheckout,
	normalizeShippingOptionSelectionsForCheckout,
	getStripeServerData,
} from '../stripe-utils';
import { useEventHandlers } from './use-event-handlers';

/**
 * @typedef {import('../stripe-utils/type-defs').StripePaymentRequest} StripePaymentRequest
 */

export const useInitialization = ( {
	billing,
	shippingData,
	setExpressPaymentError,
	onClick,
	onClose,
	onSubmit,
} ) => {
	const stripe = useStripe();
	/**
	 * @type {[ StripePaymentRequest|null, function( StripePaymentRequest ):void]}
	 */
	// @ts-ignore
	const [ paymentRequest, setPaymentRequest ] = useState( null );
	const [ isFinished, setIsFinished ] = useState( false );
	const [ isProcessing, setIsProcessing ] = useState( false );
	const [ canMakePayment, setCanMakePayment ] = useState( false );

	const currentPaymentRequest = useRef( paymentRequest );
	const currentPaymentRequestType = useRef( '' );
	const currentShipping = useRef( shippingData );

	const {
		paymentRequestEventHandlers,
		clearPaymentRequestEventHandler,
		setPaymentRequestEventHandler,
	} = useEventHandlers();

	// Update refs when any change.
	useEffect( () => {
		currentPaymentRequest.current = paymentRequest;
		currentShipping.current = shippingData;
	}, [ paymentRequest, shippingData ] );

	// set paymentRequest.
	useEffect( () => {
		// can't do anything if stripe isn't available yet or we have zero total.
		if ( ! stripe || ! billing.cartTotal.value ) {
			return;
		}

		// if payment request hasn't been set yet then set it.
		if ( ! currentPaymentRequest.current && ! isFinished ) {
			setPaymentRequest(
				getPaymentRequest( {
					total: billing.cartTotal,
					currencyCode: billing.currency.code.toLowerCase(),
					countryCode: getSetting( 'baseLocation', {} )?.country,
					shippingRequired: shippingData.needsShipping,
					cartTotalItems: billing.cartTotalItems,
					stripe,
				} )
			);
		}
		// otherwise we just update it (but only if payment processing hasn't
		// already started).
		if ( ! isProcessing && currentPaymentRequest.current && ! isFinished ) {
			updatePaymentRequest( {
				// @ts-ignore
				paymentRequest: currentPaymentRequest.current,
				total: billing.cartTotal,
				currencyCode: billing.currency.code.toLowerCase(),
				cartTotalItems: billing.cartTotalItems,
			} );
		}
	}, [
		billing.cartTotal,
		billing.currency.code,
		shippingData.needsShipping,
		billing.cartTotalItems,
		stripe,
		isProcessing,
		isFinished,
	] );

	// whenever paymentRequest changes, then we need to update whether
	// payment can be made.
	useEffect( () => {
		if ( paymentRequest ) {
			canDoPaymentRequest( paymentRequest ).then( ( result ) => {
				if ( result.requestType ) {
					currentPaymentRequestType.current = result.requestType;
				}
				setCanMakePayment( result.canPay );
			} );
		}
	}, [ paymentRequest ] );

	// kick off payment processing.
	const onButtonClick = () => {
		setIsProcessing( true );
		setIsFinished( false );
		setExpressPaymentError( '' );
		onClick();
	};

	const abortPayment = useCallback( ( paymentMethod, message ) => {
		const response = {
			fail: {
				message,
				billingData: getBillingData( paymentMethod ),
				paymentMethodData: getPaymentMethodData(
					paymentMethod,
					currentPaymentRequestType.current
				),
			},
		};
		paymentMethod.complete( 'fail' );
		setIsProcessing( false );
		setIsFinished( true );
		return response;
	}, [] );

	const completePayment = useCallback( ( paymentMethod ) => {
		paymentMethod.complete( 'success' );
		setIsFinished( true );
		setIsProcessing( false );
	}, [] );

	// when canMakePayment is true, then we set listeners on payment request for
	// handling updates.
	useEffect( () => {
		if ( paymentRequest && canMakePayment && isProcessing ) {
			// @ts-ignore
			paymentRequest.on( 'shippingaddresschange', ( event ) => {
				// @todo check if there is an address change, and if not, then
				// just call updateWith and don't call setShippingAddress here
				// because the state won't change upstream.
				currentShipping.current.setShippingAddress(
					normalizeShippingAddressForCheckout( event.shippingAddress )
				);
				setPaymentRequestEventHandler( 'shippingAddressChange', event );
			} );
			// @ts-ignore
			paymentRequest.on( 'shippingoptionchange', ( event ) => {
				currentShipping.current.setSelectedRates(
					normalizeShippingOptionSelectionsForCheckout(
						event.shippingOption
					)
				);
				setPaymentRequestEventHandler( 'shippingOptionChange', event );
			} );
			// @ts-ignore
			paymentRequest.on( 'source', ( paymentMethod ) => {
				if (
					// eslint-disable-next-line no-undef
					! getStripeServerData().allowPrepaidCard &&
					paymentMethod.source.card.funding
				) {
					setExpressPaymentError(
						__(
							"Sorry, we're not accepting prepaid cards at this time.",
							'woocommerce-gateway-stripe'
						)
					);
					return;
				}
				setPaymentRequestEventHandler( 'sourceEvent', paymentMethod );
				// kick off checkout processing step.
				onSubmit();
			} );
			// @ts-ignore
			paymentRequest.on( 'cancel', () => {
				setIsFinished( true );
				setIsProcessing( false );
				onClose();
			} );
		}
	}, [
		paymentRequest,
		canMakePayment,
		isProcessing,
		onClose,
		setPaymentRequestEventHandler,
		setExpressPaymentError,
		onSubmit,
	] );
	return {
		paymentRequest,
		paymentRequestEventHandlers,
		clearPaymentRequestEventHandler,
		isProcessing,
		canMakePayment,
		onButtonClick,
		abortPayment,
		completePayment,
		paymentRequestType: currentPaymentRequestType.current,
	};
};
