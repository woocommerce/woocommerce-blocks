/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import { useSelect } from '@wordpress/data';
import { isObject, objectHasProp } from '@woocommerce/types';

/**
 * Shows a formatted pickup location.
 */
const PickupLocation = (): JSX.Element | null => {
	const collectibleMethodIds = getSetting< string[] >(
		'collectibleMethodIds',
		[]
	);

	const { pickupAddress, pickupMethod } = useSelect( ( select ) => {
		const cartShippingRates = select( 'wc/store/cart' ).getShippingRates();

		const flattenedRates = cartShippingRates.flatMap(
			( cartShippingRate ) => cartShippingRate.shipping_rates
		);
		const selectedCollectibleRate = flattenedRates.find(
			( rate ) =>
				rate.selected && collectibleMethodIds.includes( rate.method_id )
		);

		// If the rate has an address specified in its metadata.
		if (
			isObject( selectedCollectibleRate ) &&
			objectHasProp( selectedCollectibleRate, 'meta_data' )
		) {
			const selectedRateMetaData = selectedCollectibleRate.meta_data.find(
				( meta ) => meta.key === 'pickup_address'
			);
			if (
				isObject( selectedRateMetaData ) &&
				objectHasProp( selectedRateMetaData, 'value' ) &&
				selectedRateMetaData.value
			) {
				const selectedRatePickupAddress = selectedRateMetaData.value;
				return {
					pickupAddress: selectedRatePickupAddress,
					pickupMethod: selectedCollectibleRate.name,
				};
			}
		}

		if ( isObject( selectedCollectibleRate ) ) {
			return {
				pickupAddress: undefined,
				pickupMethod: selectedCollectibleRate.name,
			};
		}
		return {
			pickupAddress: undefined,
			pickupMethod: undefined,
		};
	} );

	// If the method does not contain an address, or the method supporting collection was not found, return early.
	if (
		typeof pickupAddress === 'undefined' &&
		typeof pickupMethod === 'undefined'
	) {
		return null;
	}

	// Show the pickup method's name if we don't have an address to show.
	return (
		<span className="wc-block-components-shipping-address">
			{ sprintf(
				/* translators: %s: shipping method name, e.g. "Amazon Locker" */
				__( 'Collection from %s', 'woo-gutenberg-products-block' ),
				typeof pickupAddress === 'undefined'
					? pickupMethod
					: pickupAddress
			) + ' ' }
		</span>
	);
};

export default PickupLocation;
