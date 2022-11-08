/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { isObject, isBoolean } from '@woocommerce/types';
import { ToggleControl, Button, ExternalLink } from '@wordpress/components';
import styled from '@emotion/styled';

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
		<ExternalLink href="https://woocommerce.com/document/local-pickup/">
			{ __( 'Learn more', 'woo-gutenberg-products-block' ) }
		</ExternalLink>
	</>
);

const StyledAddress = styled.address`
	color: #757575;
	font-style: normal;
	display: inline;
	margin-left: 12px;
`;

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
			label: __( 'Pickup Location', 'woo-gutenberg-products-block' ),
			width: '50%',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<>
					{ row.name }
					<StyledAddress>
						{ isObject( row.address ) &&
							Object.values( row.address )
								.filter( ( value ) => value !== '' )
								.join( ', ' ) }
					</StyledAddress>
				</>
			),
		},
		{
			name: 'enabled',
			label: __( 'Enabled', 'woo-gutenberg-products-block' ),
			align: 'right',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<ToggleControl
					checked={ isBoolean( row.enabled ) ? row.enabled : false }
					onChange={ () => toggleLocation( row.id ) }
				/>
			),
		},
		{
			name: 'edit',
			label: '',
			align: 'center',
			width: '1%',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<button
					type="button"
					className="button-link-edit button-link"
					onClick={ () => {
						setEditingLocation( row.id );
					} }
				>
					{ __( 'Edit', 'woo-gutenberg-products-block' ) }
				</button>
			),
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
				className="pickup-locations"
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
					onDelete={ () => {
						updateLocation( editingLocation )( null );
						setEditingLocation( '' );
					} }
				/>
			) }
		</SettingsSection>
	);
};

export default LocationSettings;
