/**
 * External dependencies
 */
import { useState, useCallback } from '@wordpress/element';
import { getSetting } from '@woocommerce/settings';
import { cleanForSlug } from '@wordpress/editor';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { ADMIN_URL } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import type { PickupLocation, SortablePickupLocation } from './types';

export type ShippingMethodSettings = {
	enabled: boolean;
	title: string;
	tax_status: string;
	cost: string;
};

const getInitialSettings = (): ShippingMethodSettings => {
	const settings = getSetting(
		'pickupLocationSettings',
		{}
	) as Partial< ShippingMethodSettings >;

	return {
		enabled: false,
		title: '',
		tax_status: 'taxable',
		cost: '',
		...settings,
	};
};

const getInitialPickupLocations = (): SortablePickupLocation[] => {
	const pickupLocations = getSetting(
		'pickupLocations',
		[]
	) as PickupLocation[];

	// Give each location a unique ID.
	return pickupLocations.map( ( value, index ) => {
		return {
			...value,
			id: cleanForSlug( value.name ) + '-' + index,
		};
	} );
};

const useSettings = (): {
	settings: ShippingMethodSettings;
	setSettingField: (
		field: keyof ShippingMethodSettings
	) => ( value: unknown ) => void;
	pickupLocations: SortablePickupLocation[];
	setPickupLocations: ( locations: SortablePickupLocation[] ) => void;
	toggleLocation: ( rowId: UniqueIdentifier ) => void;
	updateLocation: (
		rowId: UniqueIdentifier
	) => ( location: SortablePickupLocation | null ) => void;
	isSaving: boolean;
	save: () => void;
} => {
	const [ isSaving, setIsSaving ] = useState( false );
	const [ pickupLocations, setPickupLocations ] = useState<
		SortablePickupLocation[]
	>( getInitialPickupLocations );
	const [ settings, setSettings ] =
		useState< ShippingMethodSettings >( getInitialSettings );

	const setSettingField = useCallback(
		( field: keyof ShippingMethodSettings ) => ( newValue: unknown ) => {
			setSettings( ( prevValue ) => ( {
				...prevValue,
				[ field ]: newValue,
			} ) );
		},
		[]
	);

	const toggleLocation = useCallback( ( rowId: UniqueIdentifier ) => {
		setPickupLocations( ( previousLocations: SortablePickupLocation[] ) => {
			const locationIndex = previousLocations.findIndex(
				( { id } ) => id === rowId
			);
			const updated = [ ...previousLocations ];
			updated[ locationIndex ].enabled =
				! previousLocations[ locationIndex ].enabled;
			return updated;
		} );
	}, [] );

	const updateLocation = useCallback(
		( rowId: UniqueIdentifier ) =>
			( locationData: SortablePickupLocation ) => {
				setPickupLocations( ( prevData ) => {
					return prevData
						.map( ( location ): SortablePickupLocation => {
							if ( location.id === rowId ) {
								return locationData;
							}
							return location;
						} )
						.filter( Boolean );
				} );
			},
		[]
	);

	const save = useCallback( () => {
		setIsSaving( true );
		// TODO: Save settings.
	}, [] );

	return {
		settings,
		setSettingField,
		pickupLocations,
		setPickupLocations,
		toggleLocation,
		updateLocation,
		isSaving,
		save,
	};
};

export default useSettings;
