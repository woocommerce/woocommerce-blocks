/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import triggerFetch from '@wordpress/api-fetch';
import {
	useAddToCartFormContext,
	useValidationContext,
} from '@woocommerce/base-context';
import { useEffect, useCallback, useState } from '@wordpress/element';
import { useStoreCart, useStoreNotices } from '@woocommerce/base-hooks';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * FormSubmit.
 *
 * Subscribes to add to cart form context and triggers processing via the API.
 */
const FormSubmit = () => {
	const {
		dispatchActions,
		productId,
		quantity,
		onAddToCartBeforeProcessing,
		hasError,
		isProcessing,
	} = useAddToCartFormContext();
	const { hasValidationErrors } = useValidationContext();
	const { addErrorNotice, removeNotice } = useStoreNotices();
	const { receiveCart } = useStoreCart();
	const [ isSubmitting, setIsSubmitting ] = useState( false );
	const doSubmit = ! hasError && isProcessing;

	const checkValidation = useCallback( () => {
		if ( hasValidationErrors ) {
			return {
				errorMessage: __(
					'Some fields are invalid.',
					'woo-gutenberg-products-block'
				),
			};
		}
		return true;
	}, [ hasValidationErrors ] );

	// Subscribe to emitter before processing.
	useEffect( () => {
		const unsubscribeProcessing = onAddToCartBeforeProcessing(
			checkValidation,
			0
		);
		return () => {
			unsubscribeProcessing();
		};
	}, [ onAddToCartBeforeProcessing, checkValidation ] );

	// Triggers form submission to the API.
	const submitForm = useCallback( () => {
		setIsSubmitting( true );
		removeNotice( 'add-to-cart' );
		triggerFetch( {
			path: '/wc/store/cart/add-item',
			method: 'POST',
			data: {
				id: productId,
				quantity,
			},
			cache: 'no-store',
			parse: false,
		} )
			.then( ( fetchResponse ) => {
				// Update nonce.
				triggerFetch.setNonce( fetchResponse.headers );

				// Handle response.
				fetchResponse.json().then( function( response ) {
					if ( ! fetchResponse.ok ) {
						// We received an error response.
						if ( response.body && response.body.message ) {
							addErrorNotice(
								decodeEntities( response.body.message ),
								{
									id: 'add-to-cart',
								}
							);
						} else {
							addErrorNotice(
								__(
									'Something went wrong. Please contact us to get assistance.',
									'woo-gutenberg-products-block'
								),
								{
									id: 'add-to-cart',
								}
							);
						}
						dispatchActions.setHasError();
					} else {
						receiveCart( response );
					}
					dispatchActions.setAfterProcessing( response );
				} );
			} )
			.catch( ( error ) => {
				error.json().then( function( response ) {
					// If updated cart state was returned, also update that.
					if ( response.data?.cart ) {
						receiveCart( response.data.cart );
					}
					dispatchActions.setHasError();
					dispatchActions.setAfterProcessing( response );
				} );
			} )
			.finally( () => {
				setIsSubmitting( false );
			} );
	}, [
		addErrorNotice,
		removeNotice,
		receiveCart,
		dispatchActions,
		productId,
		quantity,
	] );

	useEffect( () => {
		if ( doSubmit && ! isSubmitting ) {
			submitForm();
		}
	}, [ doSubmit, submitForm, isSubmitting ] );

	return null;
};

export default FormSubmit;
