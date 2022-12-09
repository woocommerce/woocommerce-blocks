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
import {
	PanelBody,
	SelectControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

interface BlockSettingsProps {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

enum CustomerAccountDisplayValue {
	ICON_AND_TEXT = 'icon_and_text',
	TEXT_ONLY = 'text_only',
	ICON_ONLY = 'icon_only',
}

enum CustomerAccountIconValue {
	DEFAULT = 'default',
	ALT = 'alt',
}

export const BlockSettings = ( {
	attributes,
	setAttributes,
}: BlockSettingsProps ) => {
	const { customerAccountDisplayStyle, customerAccountIconStyle } =
		attributes;
	const displayIconStyleSelector = [
		CustomerAccountDisplayValue.ICON_ONLY,
		CustomerAccountDisplayValue.ICON_AND_TEXT,
	].includes( customerAccountDisplayStyle );

	return (
		<InspectorControls key="inspector">
			<PanelBody
				title={ __( 'Display', 'woo-gutenberg-products-block' ) }
			>
				<SelectControl
					label={ __(
						'Icon options',
						'woo-gutenberg-products-block'
					) }
					value={ customerAccountDisplayStyle }
					onChange={ ( value: CustomerAccountDisplayValue ) => {
						setAttributes( { customerAccountDisplayStyle: value } );
					} }
					help={ __(
						'Choose if you want to include an icon with the customer account link.',
						'woo-gutenberg-products-block'
					) }
					options={ [
						{
							value: CustomerAccountDisplayValue.ICON_AND_TEXT,
							label: __(
								'Icon and text',
								'woo-gutenberg-products-block'
							),
						},
						{
							value: CustomerAccountDisplayValue.TEXT_ONLY,
							label: __(
								'Text-only',
								'woo-gutenberg-products-block'
							),
						},
						{
							value: CustomerAccountDisplayValue.ICON_ONLY,
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
						value={ customerAccountIconStyle }
						onChange={ ( value: CustomerAccountIconValue ) =>
							setAttributes( {
								customerAccountIconStyle: value,
							} )
						}
						className="wc-block-customer-account__icon-style-toggle"
					>
						<ToggleGroupControlOption
							value={ CustomerAccountIconValue.DEFAULT }
							label={
								<Icon
									icon={ customerAccountStyle }
									size={ 16 }
									className={ classNames(
										'wc-block-customer-account__icon-option',
										{
											active:
												customerAccountIconStyle ===
												CustomerAccountIconValue.DEFAULT,
										}
									) }
								/>
							}
						/>
						<ToggleGroupControlOption
							value={ CustomerAccountIconValue.ALT }
							label={
								<Icon
									icon={ customerAccountStyleAlt }
									size={ 18 }
									className={ classNames(
										'wc-block-customer-account__icon-option',
										{
											active:
												customerAccountIconStyle ===
												CustomerAccountIconValue.ALT,
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
