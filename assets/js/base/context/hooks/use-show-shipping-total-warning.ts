/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { CART_STORE_KEY, CHECKOUT_STORE_KEY } from '@woocommerce/block-data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { hasShippingRate } from '@woocommerce/base-components/cart-checkout/totals/shipping/utils';
import { hasCollectableRate } from '@woocommerce/base-utils';
import { isString } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { useShippingData } from './shipping/use-shipping-data';

export const useShowShippingTotalWarning = () => {
	const context = 'woocommerce/checkout-totals-block';
	const errorNoticeId = 'wc-blocks-totals-shipping-warning';

	const { shippingRates, selectedRates } = useShippingData();
	const hasRates = hasShippingRate( shippingRates );
	const { prefersCollection, isRateBeingSelected, shippingNotices } =
		useSelect( ( select ) => {
			return {
				prefersCollection:
					select( CHECKOUT_STORE_KEY ).prefersCollection(),
				isRateBeingSelected:
					select( CART_STORE_KEY ).isShippingRateBeingSelected(),
				shippingNotices: select( 'core/notices' ).getNotices( context ),
			};
		} );
	const { createInfoNotice, removeNotice } = useDispatch( 'core/notices' );

	useEffect( () => {
		if ( ! hasRates || isRateBeingSelected ) {
			// Early return because shipping rates were not yet loaded from the cart data store, or the user is changing
			// rate, no need to alter the notice until we know what the actual rate is.
			return;
		}
		const isPickupRateSelected = Object.values( selectedRates ).some(
			( rate: unknown ) => {
				if ( isString( rate ) ) {
					return hasCollectableRate( rate.split( ':' )[ 0 ] );
				}
				return false;
			}
		);

		// There is a mismatch between the method the user chose (pickup or shipping) and the currently selected rate.
		if (
			hasRates &&
			! prefersCollection &&
			! isRateBeingSelected &&
			isPickupRateSelected &&
			shippingNotices.length === 0
		) {
			createInfoNotice(
				__(
					'Totals will be recalculated when a valid shipping method is selected.',
					'woo-gutenberg-products-block'
				),
				{
					id: 'wc-blocks-totals-shipping-warning',
					isDismissible: false,
					context,
				}
			);
			return;
		}

		// Don't show the notice if they have selected local pickup, or if they have selected a valid regular shipping rate.
		if (
			( prefersCollection || ! isPickupRateSelected ) &&
			shippingNotices.length > 0
		) {
			removeNotice( errorNoticeId, context );
		}
	}, [
		createInfoNotice,
		hasRates,
		selectedRates,
		isRateBeingSelected,
		prefersCollection,
		removeNotice,
		shippingNotices,
	] );
};
