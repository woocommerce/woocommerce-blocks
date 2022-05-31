/**
 * External dependencies
 */

import {
	createContext,
	useContext,
	useReducer,
	useMemo,
	useCallback,
} from '@wordpress/element';
import deprecated from '@wordpress/deprecated';
import { useDispatch } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { DEFAULT_CHECKOUT_STATE_DATA } from './constants';
import type { CheckoutStateContextType } from './types';
import {
	useEventEmitters,
	reducer as emitReducer,
} from '../../../../../data/checkout/events';
import { useStoreEvents } from '../../../hooks/use-store-events';

const CheckoutContext = createContext( DEFAULT_CHECKOUT_STATE_DATA );

export const useCheckoutContext = (): CheckoutStateContextType => {
	return useContext( CheckoutContext );
};

/**
 * Checkout state provider
 * This provides an API interface exposing checkout state for use with cart or checkout blocks.
 *
 * @param {Object} props             Incoming props for the provider.
 * @param {Object} props.children    The children being wrapped.
 * @param {string} props.redirectUrl Initialize what the checkout will redirect to after successful submit.
 */
export const CheckoutStateProvider = ( {
	children,
	redirectUrl,
}: {
	children: React.ReactChildren;
	redirectUrl: string;
} ): JSX.Element => {
	const { dispatchCheckoutEvent } = useStoreEvents();
	const checkoutActions = useDispatch( CHECKOUT_STORE_KEY );

	const [ observers, observerDispatch ] = useReducer( emitReducer, {} );
	const {
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
		onCheckoutValidationBeforeProcessing,
	} = useEventEmitters( observerDispatch );

	/**
	 * @deprecated use onCheckoutValidationBeforeProcessing instead
	 *
	 * To prevent the deprecation message being shown at render time
	 * we need an extra function between useMemo and event emitters
	 * so that the deprecated message gets shown only at invocation time.
	 * (useMemo calls the passed function at render time)
	 * See: https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4039/commits/a502d1be8828848270993264c64220731b0ae181
	 */
	const onCheckoutBeforeProcessing = useMemo( () => {
		return function (
			...args: Parameters< typeof onCheckoutValidationBeforeProcessing >
		) {
			deprecated( 'onCheckoutBeforeProcessing', {
				alternative: 'onCheckoutValidationBeforeProcessing',
				plugin: 'WooCommerce Blocks',
			} );
			return onCheckoutValidationBeforeProcessing( ...args );
		};
	}, [ onCheckoutValidationBeforeProcessing ] );

	const onSubmit = useCallback( () => {
		dispatchCheckoutEvent( 'submit' );
		checkoutActions.setBeforeProcessing();
	}, [ dispatchCheckoutEvent, checkoutActions ] );

	const checkoutData: CheckoutStateContextType = {
		onSubmit,
		onCheckoutBeforeProcessing,
		onCheckoutValidationBeforeProcessing,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
	};
	return (
		<CheckoutContext.Provider value={ checkoutData }>
			{ children }
		</CheckoutContext.Provider>
	);
};
