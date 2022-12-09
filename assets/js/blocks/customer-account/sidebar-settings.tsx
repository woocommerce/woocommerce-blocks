/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import type { BlockAttributes } from '@wordpress/blocks';
import { PanelBody, SelectControl } from '@wordpress/components';

interface BlockSettingsProps {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

enum CustomerAccountDisplayValue {
	ICON_AND_TEXT = 'icon_and_text',
	TEXT_ONLY = 'text_only',
	ICON_ONLY = 'icon_only',
}

export const BlockSettings = ( {
	attributes,
	setAttributes,
}: BlockSettingsProps ) => {
	const { customerAccountDisplay } = attributes;
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
					value={ customerAccountDisplay }
					onChange={ ( value: CustomerAccountDisplayValue ) => {
						setAttributes( { customerAccountDisplay: value } );
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
			</PanelBody>
		</InspectorControls>
	);
};
