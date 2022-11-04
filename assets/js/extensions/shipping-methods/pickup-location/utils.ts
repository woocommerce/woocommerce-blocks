/**
 * External dependencies
 */
import { cleanForSlug } from '@wordpress/url';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import type {
	PickupLocation,
	SortablePickupLocation,
	ShippingMethodSettings,
} from './types';

export const indexLocationsById = (
	locations: PickupLocation[]
): SortablePickupLocation[] => {
	return locations.map( ( value, index ) => {
		return {
			...value,
			id: cleanForSlug( value.name ) + '-' + index,
		};
	} );
};

export const defaultSettings = {
	enabled: false,
	title: '',
	tax_status: 'taxable',
	cost: '',
};

export const getInitialSettings = (): ShippingMethodSettings => ( {
	...defaultSettings,
	...getSetting( 'pickupLocationSettings', {} ),
} );

export const getInitialPickupLocations = (): SortablePickupLocation[] =>
	indexLocationsById( getSetting( 'pickupLocations', [] ) );
