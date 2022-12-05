/**
 * External dependencies
 */
import { cleanForSlug } from '@wordpress/url';

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
	enabled: true,
	title: '',
	tax_status: 'taxable',
	cost: '',
};

export const defaultReadyOnlySettings = {
	hasLegacyPickup: false,
};
declare global {
	const hydratedScreenSettings: {
		pickupLocationSettings: typeof defaultSettings;
		pickupLocations: PickupLocation[];
		readonlySettings: typeof defaultReadyOnlySettings;
	};
}

export const getInitialSettings = (): ShippingMethodSettings => {
	const settings =
		hydratedScreenSettings.pickupLocationSettings || defaultSettings;

	return {
		enabled: settings?.enabled,
		title: settings?.title || defaultSettings.title,
		tax_status: settings?.tax_status || defaultSettings.tax_status,
		cost: settings?.cost || defaultSettings.cost,
	};
};

export const getInitialPickupLocations = (): SortablePickupLocation[] =>
	indexLocationsById( hydratedScreenSettings.pickupLocations || [] );

export const readOnlySettings =
	hydratedScreenSettings.readonlySettings || defaultReadyOnlySettings;
