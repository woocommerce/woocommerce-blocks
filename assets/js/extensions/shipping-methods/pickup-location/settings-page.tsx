/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement, useState } from '@wordpress/element';
import { getSetting } from '@woocommerce/settings';
import { cleanForSlug } from '@wordpress/editor';
import { isObject, isBoolean } from '@woocommerce/types';
import { arrayMove } from '@dnd-kit/sortable';
import {
	CardBody,
	ToggleControl,
	CheckboxControl,
	SelectControl,
	TextareaControl,
	TextControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './admin.scss';
import {
	SettingsCard,
	SettingsSection,
	SortableTable,
	SortableData,
} from '../shared-components';
import EditPickupLocation from './edit-pickup-location';
import type { PickupLocation } from './types';

interface SortablePickupLocation extends PickupLocation, SortableData {}

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
		SortablePickupLocation[]
	>( (): SortablePickupLocation[] => {
		const setting = getSetting( 'pickupLocations', [] ) as PickupLocation[];

		// Give each location a unique ID.
		return setting.map( ( value, index ) => {
			return {
				...value,
				id: cleanForSlug( value.name ) + '-' + index,
			};
		} );
	} );
	const [ editingLocation, setEditingLocation ] = useState( '' );
	const handleModalDismiss = () => {
		setEditingLocation( '' );
	};

	const columns = [
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
							Edit
						</button>{ ' ' }
						|{ ' ' }
						<button
							type="button"
							className="button-link button-link-delete"
						>
							Delete
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
		<>
			<SettingsSection
				Description={ () => (
					<>
						<h2>
							{ __( 'General', 'woo-gutenberg-products-block' ) }
						</h2>
						<p>
							{ __(
								'Enable or disable Local Pickup on your store, and control costs.',
								'woo-gutenberg-products-block'
							) }
						</p>
					</>
				) }
			>
				<SettingsCard>
					<CheckboxControl
						checked={ 1 }
						onChange={ () => {} }
						label={ __(
							'Enable Local Pickup',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'When enabled, this method will appear on the block based checkout.',
							'woo-gutenberg-products-block'
						) }
					/>
					<TextControl
						label={ __( 'Title', 'woo-gutenberg-products-block' ) }
						help={ __(
							'This is the shipping method title shown to customers alongside the pickup location name.',
							'woo-gutenberg-products-block'
						) }
						placeholder={ __(
							'Local Pickup',
							'woo-gutenberg-products-block'
						) }
						value={ '' }
						onChange={ () => {} }
						disabled={ false }
						autoComplete="off"
					/>
					<TextControl
						label={ __( 'Cost', 'woo-gutenberg-products-block' ) }
						help={ __(
							'Optional cost to charge for local pickup.',
							'woo-gutenberg-products-block'
						) }
						placeholder={ __(
							'Free',
							'woo-gutenberg-products-block'
						) }
						value={ '' }
						onChange={ () => {} }
						disabled={ false }
						autoComplete="off"
					/>
					<SelectControl
						label={ __( 'Taxes', 'woo-gutenberg-products-block' ) }
						help={ __(
							'If a cost is defined, this controls if taxes are applied to that cost.',
							'woo-gutenberg-products-block'
						) }
						options={ [
							{
								label: __(
									'Taxable',
									'woo-gutenberg-products-block'
								),
								value: 'taxable',
							},
							{
								label: __(
									'Not taxable',
									'woo-gutenberg-products-block'
								),
								value: 'none',
							},
						] }
						value={ '' }
						onChange={ () => {} }
						disabled={ false }
					/>
				</SettingsCard>
			</SettingsSection>
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
				{ editingLocation && (
					<EditPickupLocation
						location={ editingLocation }
						onClose={ handleModalDismiss }
						redirectOnSave={ `${ window.location.pathname }?page=wc-settings&tab=checkout&section=stripe&panel=settings` }
					/>
				) }
			</SettingsSection>
		</>
	);
};

const SettingsPage = () => {
	return (
		<div className="wc-block-settings-wrap">
			<PaymentLocationsSettingsPanel />
		</div>
	);
};

export default SettingsPage;
