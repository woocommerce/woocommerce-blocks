/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement, useState } from '@wordpress/element';
import { getSetting } from '@woocommerce/settings';
import { cleanForSlug } from '@wordpress/editor';
import { ToggleControl } from '@wordpress/components';
import { isObject, isBoolean } from '@woocommerce/types';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

/**
 * Internal dependencies
 */
import SettingsSection from './settings-section';
import SortableTable from './sortable-table';
import type { SortableData } from './sortable-table/types';

interface PickupLocation extends SortableData {
	id: UniqueIdentifier;
	name: string;
	details: string;
	enabled: boolean;
	address: {
		address_1: string;
		city: string;
		state: string;
		postcode: string;
		country: string;
	};
}

const PickupLocationsSettingsDescription = () => (
	<>
		<h2>{ __( 'Pickup Locations', 'woo-gutenberg-products-block' ) }</h2>
		<p>
			{ createInterpolateElement(
				__(
					'Define locations for your customers to choose from when they select <methodName/> during checkout.',
					'woo-gutenberg-products-block'
				),
				{
					methodName: (
						<em>
							{ __(
								'Local Pickup',
								'woo-gutenberg-products-block'
							) }
						</em>
					),
				}
			) }
		</p>
	</>
);

const PaymentLocationsSettingsPanel = () => {
	const [ pickupLocations, setPickupLocations ] = useState<
		PickupLocation[]
	>( (): PickupLocation[] => {
		const setting = getSetting( 'pickupLocations', [] ) as PickupLocation[];

		// Give each location a unique ID.
		return setting.map( ( value, index ) => {
			return {
				...value,
				id: cleanForSlug( value.name ) + '-' + index,
			};
		} );
	} );

	const columns = [
		{
			name: 'name',
			label: __( 'Location Name', 'woo-gutenberg-products-block' ),
			width: '25%',
		},
		{
			name: 'enabled',
			label: __( 'Enabled', 'woo-gutenberg-products-block' ),
			align: 'center',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<ToggleControl
					checked={ isBoolean( row.enabled ) ? row.enabled : false }
					onChange={ () => {
						const locationIndex = pickupLocations.findIndex(
							( { id } ) => id === row.id
						);
						const updated = [ ...pickupLocations ];
						updated[ locationIndex ].enabled =
							! pickupLocations[ locationIndex ].enabled;
						setPickupLocations( updated );
					} }
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
		<SettingsSection Description={ PickupLocationsSettingsDescription }>
			<SortableTable
				columns={ columns }
				data={ pickupLocations }
				onSort={ ( oldIndex: number, newIndex: number ) => {
					setPickupLocations( ( prevData ) => {
						return arrayMove( prevData, oldIndex, newIndex );
					} );
				} }
			/>
		</SettingsSection>
	);
};

const SettingsPage = () => {
	return (
		<div className="settings-wrap">
			<PaymentLocationsSettingsPanel />
		</div>
	);
};

export default SettingsPage;
