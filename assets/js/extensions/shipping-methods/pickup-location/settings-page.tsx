/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { getSetting, ADMIN_URL } from '@woocommerce/settings';
import { CHECKOUT_PAGE_ID } from '@woocommerce/block-settings';
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
	ExternalLink,
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
			{ __(
				'Define pickup locations for your customers to choose from during checkout.',
				'woo-gutenberg-products-block'
			) }
		</p>
	</>
);

type ShippingMethodSettings = {
	enabled: boolean;
	title: string;
	tax_status: string;
	cost: string;
};

const PaymentLocationsSettingsPanel = () => {
	const [ shippingMethodSettings, setShippingMethodSettings ] =
		useState< ShippingMethodSettings >( () => {
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
		} );

	const setSettingField =
		( field: keyof ShippingMethodSettings ) => ( newValue: unknown ) => {
			setShippingMethodSettings( ( prevValue ) => ( {
				...prevValue,
				[ field ]: newValue,
			} ) );
		};

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
								'Enable or disable Local Pickup on your store, and define costs. Local Pickup is only available from the Block Checkout.',
								'woo-gutenberg-products-block'
							) }
						</p>
						<ExternalLink
							href={ `${ ADMIN_URL }post.php?post=${ CHECKOUT_PAGE_ID }&action=edit` }
						>
							{ __(
								'View checkout page',
								'woo-gutenberg-products-block'
							) }
						</ExternalLink>
					</>
				) }
			>
				<SettingsCard>
					<CheckboxControl
						checked={ shippingMethodSettings.enabled }
						onChange={ setSettingField( 'enabled' ) }
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
						value={ shippingMethodSettings.title }
						onChange={ setSettingField( 'title' ) }
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
						type="number"
						value={ shippingMethodSettings.cost }
						onChange={ setSettingField( 'cost' ) }
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
						value={ shippingMethodSettings.tax_status }
						onChange={ setSettingField( 'tax_status' ) }
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
						locationData={
							pickupLocations.find( ( { id } ) => {
								return id === editingLocation;
							} ) || pickupLocations[ 0 ]
						}
						onSave={ ( locationData ) => {
							setPickupLocations( ( prevData ) => {
								return prevData.map( ( location ) => {
									if ( location.id === editingLocation ) {
										return locationData;
									}
									return location;
								} );
							} );
						} }
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
