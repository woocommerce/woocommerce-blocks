/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { isObject, isBoolean } from '@woocommerce/types';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	SettingsSection,
	SortableTable,
	SortableData,
} from '../shared-components';
import EditLocation from './edit-location';
import type { PickupLocation, SortablePickupLocation } from './types';
import useSettings from './use-settings';

const LocationSettingsDescription = () => (
	<>
		<h2>{ __( 'Pickup Locations', 'woo-gutenberg-products-block' ) }</h2>
		<p>
			{ __(
				'Define pickup locations for your customers to choose from during checkout.',
				'woo-gutenberg-products-block'
			) }
		</p>
	</>
);

const LocationSettings = () => {
	const {
		pickupLocations,
		setPickupLocations,
		toggleLocation,
		updateLocation,
	} = useSettings();
	const [ editingLocation, setEditingLocation ] =
		useState< UniqueIdentifier >( '' );

	const tableColumns = [
		{
			name: 'name',
			label: __( 'Location Name', 'woo-gutenberg-products-block' ),
			width: '25%',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<>
					{ row.name }
					<div className="row-actions">
						<button
							type="button"
							className="button-link-edit button-link"
							onClick={ () => {
								setEditingLocation( row.id );
							} }
						>
							{ __( 'Edit', 'woo-gutenberg-products-block' ) }
						</button>{ ' ' }
						|{ ' ' }
						<button
							type="button"
							className="button-link button-link-delete"
						>
							{ __( 'Delete', 'woo-gutenberg-products-block' ) }
						</button>
					</div>
				</>
			),
		},
		{
			name: 'enabled',
			label: __( 'Enabled', 'woo-gutenberg-products-block' ),
			align: 'center',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<ToggleControl
					checked={ isBoolean( row.enabled ) ? row.enabled : false }
					onChange={ () => toggleLocation( row.id ) }
				/>
			),
		},
		{
			name: 'address',
			label: __( 'Pickup Address', 'woo-gutenberg-products-block' ),
			width: '25%',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<>
					{ isObject( row.address ) &&
						Object.values( row.address )
							.filter( ( value ) => value !== '' )
							.join( ', ' ) }
				</>
			),
		},
		{
			name: 'details',
			label: __( 'Pickup Details', 'woo-gutenberg-products-block' ),
			width: '25%',
		},
	];

	return (
		<SettingsSection Description={ LocationSettingsDescription }>
			<SortableTable
				columns={ tableColumns }
				data={ pickupLocations }
				setData={ ( newData ) => {
					setPickupLocations( newData as SortablePickupLocation[] );
				} }
			/>
			{ editingLocation && (
				<EditLocation
					locationData={
						pickupLocations.find( ( { id } ) => {
							return id === editingLocation;
						} ) || pickupLocations[ 0 ]
					}
					onSave={ updateLocation( editingLocation ) }
					onClose={ () => setEditingLocation( '' ) }
				/>
			) }
		</SettingsSection>
	);
};

export default LocationSettings;
