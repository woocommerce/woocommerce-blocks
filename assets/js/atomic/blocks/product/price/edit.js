/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	withColors,
	PanelColorSettings,
	FontSizePicker,
	withFontSizes,
} from '@wordpress/block-editor';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
/**
 * Internal dependencies
 */
import Block from './block';

const PriceEdit = ( {
	fontSize,
	saleFontSize,
	setFontSize,
	setSaleFontSize,
	color,
	saleColor,
	setColor,
	setSaleColor,
	attributes,
	setAttributes,
} ) => {
	const { align } = attributes;
	return (
		<>
			{ isFeaturePluginBuild() && (
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>
			) }
			<InspectorControls>
				{ isFeaturePluginBuild() && (
					<>
						<PanelBody title={ __( 'Normal price' ) }>
							<FontSizePicker
								value={ fontSize.size }
								onChange={ setFontSize }
							/>
						</PanelBody>
						<PanelColorSettings
							title={ __( 'Normal price color' ) }
							colorSettings={ [
								{
									value: color.color,
									onChange: setColor,
									label: __( 'Color' ),
								},
							] }
						></PanelColorSettings>
						<PanelBody title={ __( 'Sale price' ) }>
							<FontSizePicker
								value={ saleFontSize.size }
								onChange={ setSaleFontSize }
							/>
						</PanelBody>
						<PanelColorSettings
							title={ __( 'Sale price color' ) }
							colorSettings={ [
								{
									value: saleColor.color,
									onChange: setSaleColor,
									label: __( 'Color' ),
								},
							] }
						></PanelColorSettings>
					</>
				) }
			</InspectorControls>
			<Block { ...attributes } />
		</>
	);
};

const Price = isFeaturePluginBuild()
	? compose( [
			withFontSizes( 'fontSize' ),
			withFontSizes( 'saleFontSize' ),
			withColors( 'color', { textColor: 'color' } ),
			withColors( 'saleColor', { textColor: 'saleColor' } ),
	  ] )( PriceEdit )
	: PriceEdit;

export default Price;
