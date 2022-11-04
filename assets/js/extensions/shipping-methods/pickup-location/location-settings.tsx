/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { isObject, isBoolean } from '@woocommerce/types';
import { ToggleControl, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	SettingsSection,
	SortableTable,
	SortableData,
} from '../shared-components';
import EditLocation from './edit-location';
import type { SortablePickupLocation } from './types';
import { useSettingsContext } from './settings-context';

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
	} = useSettingsContext();
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
							onClick={ () => {
								updateLocation( row.id )( null );
							} }
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

	const FooterContent = (): JSX.Element => (
		<Button
			variant="secondary"
			onClick={ () => {
				setEditingLocation( 'new' );
			} }
		>
			{ __( 'Add Pickup Location', 'woo-gutenberg-products-block' ) }
		</Button>
	);

	return (
		<SettingsSection Description={ LocationSettingsDescription }>
			<SortableTable
				columns={ tableColumns }
				data={ pickupLocations }
				setData={ ( newData ) => {
					setPickupLocations( newData as SortablePickupLocation[] );
				} }
				footerContent={ FooterContent }
			/>
			{ editingLocation && (
				<EditLocation
					locationData={
						editingLocation === 'new'
							? {
									name: '',
									details: '',
									enabled: true,
									address: {
										address_1: '',
										city: '',
										state: '',
										postcode: '',
										country: '',
									},
							  }
							: pickupLocations.find( ( { id } ) => {
									return id === editingLocation;
							  } ) || null
					}
					editingLocation={ editingLocation }
					onSave={ updateLocation( editingLocation ) }
					onClose={ () => setEditingLocation( '' ) }
				/>
			) }
		</SettingsSection>
	);
};

export default LocationSettings;
