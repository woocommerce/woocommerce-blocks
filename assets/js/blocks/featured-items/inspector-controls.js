/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls as GutenbergInspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';
import {
	FocalPointPicker,
	PanelBody,
	RangeControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	TextareaControl,
	ExternalLink,
} from '@wordpress/components';

export const InspectorControls = ( {
	alt,
	backgroundImageSrc,
	contentPanel,
	dimRatio,
	focalPoint = { x: 0.5, y: 0.5 },
	imageFit,
	overlayColor,
	overlayGradient,
	setAttributes,
	setGradient,
	showDesc,
} ) => {
	// FocalPointPicker was introduced in Gutenberg 5.0 (WordPress 5.2),
	// so we need to check if it exists before using it.
	const focalPointPickerExists = typeof FocalPointPicker === 'function';

	return (
		<GutenbergInspectorControls key="inspector">
			<PanelBody
				title={ __( 'Content', 'woo-gutenberg-products-block' ) }
			>
				<ToggleControl
					label={ __(
						'Show description',
						'woo-gutenberg-products-block'
					) }
					checked={ showDesc }
					onChange={ () => setAttributes( { showDesc: ! showDesc } ) }
				/>
				{ contentPanel }
			</PanelBody>
			{ !! backgroundImageSrc && (
				<>
					{ focalPointPickerExists && (
						<PanelBody
							title={ __(
								'Media settings',
								'woo-gutenberg-products-block'
							) }
						>
							<ToggleGroupControl
								help={
									<>
										<p>
											{ __(
												'Choose “Cover” if you want the image to scale automatically to always fit its container.',
												'woo-gutenberg-products-block'
											) }
										</p>
										<p>
											{ __(
												'Note: by choosing “Cover” you will lose the ability to freely move the focal point precisely.',
												'woo-gutenberg-products-block'
											) }
										</p>
									</>
								}
								label={ __(
									'Image fit',
									'woo-gutenberg-products-block'
								) }
								value={ imageFit }
								onChange={ ( value ) =>
									setAttributes( {
										imageFit: value,
									} )
								}
							>
								<ToggleGroupControlOption
									label={ __(
										'None',
										'woo-gutenberg-products-block'
									) }
									value="none"
								/>
								<ToggleGroupControlOption
									/* translators: "Cover" is a verb that indicates an image covering the entire container. */
									label={ __(
										'Cover',
										'woo-gutenberg-products-block'
									) }
									value="cover"
								/>
							</ToggleGroupControl>
							<FocalPointPicker
								label={ __(
									'Focal Point Picker',
									'woo-gutenberg-products-block'
								) }
								url={ backgroundImageSrc }
								value={ focalPoint }
								onChange={ ( value ) =>
									setAttributes( {
										focalPoint: value,
									} )
								}
							/>
							<TextareaControl
								label={ __(
									'Alt text (alternative text)',
									'woo-gutenberg-products-block'
								) }
								value={ alt }
								onChange={ ( value ) => {
									setAttributes( { alt: value } );
								} }
								help={
									<>
										<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
											{ __(
												'Describe the purpose of the image',
												'woo-gutenberg-products-block'
											) }
										</ExternalLink>
									</>
								}
							/>
						</PanelBody>
					) }
					<PanelColorGradientSettings
						__experimentalHasMultipleOrigins
						__experimentalIsRenderedInSidebar
						title={ __(
							'Overlay',
							'woo-gutenberg-products-block'
						) }
						initialOpen={ true }
						settings={ [
							{
								colorValue: overlayColor,
								gradientValue: overlayGradient,
								onColorChange: ( value ) =>
									setAttributes( { overlayColor: value } ),
								onGradientChange: ( value ) => {
									setGradient( value );
									setAttributes( {
										overlayGradient: value,
									} );
								},
								label: __(
									'Color',
									'woo-gutenberg-products-block'
								),
							},
						] }
					>
						<RangeControl
							label={ __(
								'Opacity',
								'woo-gutenberg-products-block'
							) }
							value={ dimRatio }
							onChange={ ( value ) =>
								setAttributes( { dimRatio: value } )
							}
							min={ 0 }
							max={ 100 }
							step={ 10 }
							required
						/>
					</PanelColorGradientSettings>
				</>
			) }
		</GutenbergInspectorControls>
	);
};
