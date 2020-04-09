/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getStripeServerData } from '../stripe-utils';

const usePaymentIntents = ( { stripe } ) => {
	const [ error, setError ] = useState( '' );
	/**
	 * Opens the modal for PaymentIntent authorizations.
	 *
	 * @param {string}  intentClientSecret The client secret of the intent.
	 * @param {string}  redirectURL        The URL to ping on fail or redirect to on success.
	 * @param {boolean} alwaysRedirect     If set to true, an immediate redirect will happen no
	 *                                     matter the result. If not, an error will be displayed on
	 *                                     failure.
	 * @param {boolean} isSetupIntent      If set to true, it means that the flow is handling a
	 *                                     Setup Intent. If false, it's a Payment Intent.
	 */
	const openIntentModal = (
		intentClientSecret,
		redirectURL,
		alwaysRedirect,
		isSetupIntent
	) => {
		stripe[ isSetupIntent ? 'confirmCardSetup' : 'confirmCardPayment' ](
			intentClientSecret
		)
			.then( function( response ) {
				if ( response.error ) {
					setError( response.error );
				}

				const intent =
					response[ isSetupIntent ? 'setupIntent' : 'paymentIntent' ];
				if (
					intent.status !== 'requires_capture' &&
					intent.status !== 'succeeded'
				) {
					return;
				}
				window.location = redirectURL;
			} )
			.catch( function( error ) {
				if ( alwaysRedirect ) {
					// @todo not sure about this.
					return ( window.location = redirectURL );
				}
				// @todo error is what get's returned to checkout
				setError( response.error );

				// Report back to the server.
				// @todo likely we can return this as a part of the paymentData package
				// and stripe would hook in server side to recognize it in the paymentData
				// package and handle accordingly.
				return window.fetch( redirectURL + '&is_ajax' );
			} );
	};

	// add hashchange listener
	useEffect( () => {
		/**
		 * Handles changes in the hash in order to show a modal for PaymentIntent/SetupIntent confirmations.
		 *
		 * Listens for `hashchange` events and checks for a hash in the following format:
		 * #confirm-pi-<intentClientSecret>:<successRedirectURL>
		 *
		 * If such a hash appears, the partials will be used to call `stripe.handleCardPayment`
		 * in order to allow customers to confirm an 3DS/SCA authorization, or stripe.handleCardSetup if
		 * what needs to be confirmed is a SetupIntent.
		 *
		 * @todo Currently those redirects/hashes are generated in `WC_Gateway_Stripe::process_payment`.
		 */
		const onHashChange = () => {
			const partials = window.location.hash.match(
				/^#?confirm-(pi|si)-([^:]+):(.+)$/
			);
			if ( ! partials || partials.length < 4 ) {
				return;
			}

			const type = partials[ 1 ];
			const intentClientSecret = partials[ 2 ];
			const redirectURL = decodeURIComponent( partials[ 3 ] );

			// cleanup the url
			window.location.hash = '';

			openIntentModal(
				intentClientSecret,
				redirectURL,
				false,
				type === 'si'
			);
		};
		window.addEventListener( 'hashchange', onHashChange );
		return () =>
			void window.removeEventListener( 'hashchange', onHashChange );
	}, [ stripe ] );

	const maybeConfirmIntent = () => {
		const intentSecret = getStripeServerData()?.intentId;
		const intentReturn = getStripeServerData()?.intentReturn;
		// @todo wire these settings up to getStripeSettings() via the server
		if ( ! intentSecret || ! intentReturn ) {
			return;
		}
		openIntentModal( intentSecret, intentReturn, true, false );
	};

	// should happen on initialization
	useEffect( () => {
		maybeConfirmIntent();
	}, [ stripe ] );
};
