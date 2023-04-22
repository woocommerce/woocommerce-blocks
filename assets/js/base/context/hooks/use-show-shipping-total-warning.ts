/**
 * External dependencies
 */
import { useShippingData } from '@woocommerce/base-context';
import { useDispatch, useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	areShippingMethodsMissing,
	hasShippingRate,
} from '@woocommerce/base-components/cart-checkout/totals/shipping/utils';

export const useShowShippingTotalWarning = () => {
	const context = 'woocommerce/checkout-totals-block';
	const errorNoticeId = 'wc-blocks-totals-shipping-warning';

	const { shippingRates } = useShippingData();
	const hasRates = hasShippingRate( shippingRates );
	const prefersCollection = useSelect( ( select ) => {
		return select( CHECKOUT_STORE_KEY ).prefersCollection();
	} );
	const { createInfoNotice, removeNotice } = useDispatch( 'core/notices' );
	const shippingMethodsMissing = areShippingMethodsMissing(
		hasRates,
		prefersCollection,
		shippingRates
	);
	useEffect( () => {
		removeNotice( errorNoticeId, context );

		if ( shippingMethodsMissing ) {
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
		}
	}, [ shippingMethodsMissing, createInfoNotice, removeNotice ] );
};
