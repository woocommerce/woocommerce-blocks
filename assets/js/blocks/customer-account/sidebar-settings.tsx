/**
 * External dependencies
 */
import classNames from 'classnames';
import { Icon } from '@wordpress/icons';
import {
	customerAccountStyle,
	customerAccountStyleAlt,
} from '@woocommerce/icons';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import type { BlockAttributes } from '@wordpress/blocks';
import { getSetting } from '@woocommerce/settings';
import { createInterpolateElement } from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ExternalLink,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { DisplayStyle, IconStyle } from './types';

interface BlockSettingsProps {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

const AccountSettingsLink = () => {
	const accountSettingsUrl = `${ getSetting(
		'adminUrl'
	) }admin.php?page=wc-settings&tab=account`;

	const linkText = createInterpolateElement(
		`<a>${ __(
			'Manage account settings',
			'woo-gutenberg-products-block'
		) }</a>`,
		{
			a: <ExternalLink href={ accountSettingsUrl } />,
		}
	);

	return <div className="account-link">{ linkText }</div>;
};

export const BlockSettings = ( {
	attributes,
	setAttributes,
}: BlockSettingsProps ) => {
	const { displayStyle, iconStyle } = attributes;
	const displayIconStyleSelector = [
		DisplayStyle.ICON_ONLY,
		DisplayStyle.ICON_AND_TEXT,
	].includes( displayStyle );

	return (
		<InspectorControls key="inspector">
			<AccountSettingsLink />
			<PanelBody
				title={ __( 'Display', 'woo-gutenberg-products-block' ) }
			>
				<SelectControl
					className="customer-account-display-style"
					label={ __(
						'Icon options',
						'woo-gutenberg-products-block'
					) }
					value={ displayStyle }
					onChange={ ( value: DisplayStyle ) => {
						setAttributes( { displayStyle: value } );
					} }
					help={ __(
						'Choose if you want to include an icon with the customer account link.',
						'woo-gutenberg-products-block'
					) }
					options={ [
						{
							value: DisplayStyle.ICON_AND_TEXT,
							label: __(
								'Icon and text',
								'woo-gutenberg-products-block'
							),
						},
						{
							value: DisplayStyle.TEXT_ONLY,
							label: __(
								'Text-only',
								'woo-gutenberg-products-block'
							),
						},
						{
							value: DisplayStyle.ICON_ONLY,
							label: __(
								'Icon-only',
								'woo-gutenberg-products-block'
							),
						},
					] }
				/>
				{ displayIconStyleSelector ? (
					<ToggleGroupControl
						label={ __(
							'Display Style',
							'woo-gutenberg-products-block'
						) }
						value={ iconStyle }
						onChange={ ( value: IconStyle ) =>
							setAttributes( {
								iconStyle: value,
							} )
						}
						className="wc-block-customer-account__icon-style-toggle"
					>
						<ToggleGroupControlOption
							value={ IconStyle.DEFAULT }
							label={
								<Icon
									icon={ customerAccountStyle }
									size={ 16 }
									className={ classNames(
										'wc-block-customer-account__icon-option',
										{
											active:
												iconStyle === IconStyle.DEFAULT,
										}
									) }
								/>
							}
						/>
						<ToggleGroupControlOption
							value={ IconStyle.ALT }
							label={
								<Icon
									icon={ customerAccountStyleAlt }
									size={ 18 }
									className={ classNames(
										'wc-block-customer-account__icon-option',
										{
											active: iconStyle === IconStyle.ALT,
										}
									) }
								/>
							}
						/>
					</ToggleGroupControl>
				) : null }
			</PanelBody>
		</InspectorControls>
	);
};
