/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { getSetting, ADMIN_URL } from '@woocommerce/settings';
import { CHECKOUT_PAGE_ID } from '@woocommerce/block-settings';
import {
	CheckboxControl,
	SelectControl,
	TextControl,
	ExternalLink,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SettingsCard, SettingsSection } from '../shared-components';
import type { ShippingMethodSettings } from './types';

const GeneralSettingsDescription = () => (
	<>
		<h2>{ __( 'General', 'woo-gutenberg-products-block' ) }</h2>
		<p>
			{ __(
				'Enable or disable Local Pickup on your store, and define costs. Local Pickup is only available from the Block Checkout.',
				'woo-gutenberg-products-block'
			) }
		</p>
		<ExternalLink
			href={ `${ ADMIN_URL }post.php?post=${ CHECKOUT_PAGE_ID }&action=edit` }
		>
			{ __( 'View checkout page', 'woo-gutenberg-products-block' ) }
		</ExternalLink>
	</>
);

const GeneralSettings = () => {
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

	return (
		<SettingsSection Description={ GeneralSettingsDescription }>
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
					placeholder={ __( 'Free', 'woo-gutenberg-products-block' ) }
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
	);
};

export default GeneralSettings;
