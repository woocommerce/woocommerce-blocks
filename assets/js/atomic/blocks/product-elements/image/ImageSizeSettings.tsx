/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockAttributes } from '@wordpress/blocks';
import {
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

interface ImageSizeSettingProps {
	scale: string;
	height: string | undefined;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

const scaleHelp = {
	cover: __(
		'Image is scaled and cropped to fill the entire space without being distorted.',
		'woo-gutenberg-products-block'
	),
	contain: __(
		'Image is scaled to fill the space without clipping nor distorting.',
		'woo-gutenberg-products-block'
	),
	fill: __(
		'Image will be stretched and distorted to completely fill the space.',
		'woo-gutenberg-products-block'
	),
};

const DEFAULT_SCALE = 'cover';

const SCALE_OPTIONS = (
	<>
		<ToggleGroupControlOption
			value="cover"
			label={ __( 'Cover', 'woo-gutenberg-products-block' ) }
		/>
		<ToggleGroupControlOption
			value="contain"
			label={ __( 'Contain', 'woo-gutenberg-products-block' ) }
		/>
		<ToggleGroupControlOption
			value="fill"
			label={ __( 'Fill', 'woo-gutenberg-products-block' ) }
		/>
	</>
);

export const ImageSizeSettings = ( {
	scale,
	height,
	setAttributes,
}: ImageSizeSettingProps ) => {
	return (
		<ToolsPanel
			className="wc-block-product-image__tools-panel"
			label={ __( 'Image size', 'woo-gutenberg-products-block' ) }
		>
			{ /*<UnitControl*/ }
			{ /*	label={ __( 'Width', 'woo-gutenberg-products-block' ) }*/ }
			{ /*	onChange={ ( value: string ) => {*/ }
			{ /*		setAttributes( { width: value } );*/ }
			{ /*	} }*/ }
			{ /*	value={ width }*/ }
			{ /*	units={ [*/ }
			{ /*		{*/ }
			{ /*			value: 'px',*/ }
			{ /*			label: 'px',*/ }
			{ /*		},*/ }
			{ /*	] }*/ }
			{ /*/>*/ }
			<UnitControl
				label={ __( 'Height', 'woo-gutenberg-products-block' ) }
				onChange={ ( value: string ) => {
					setAttributes( { height: value } );
				} }
				value={ height }
				units={ [
					{
						value: 'px',
						label: 'px',
					},
				] }
			/>
			{ height && (
				<ToolsPanelItem
					hasValue={ () => !! scale && scale !== DEFAULT_SCALE }
					label={ __( 'Scale', 'woo-gutenberg-products-block' ) }
					onDeselect={ () =>
						setAttributes( {
							scale: DEFAULT_SCALE,
						} )
					}
					resetAllFilter={ () => ( {
						scale: DEFAULT_SCALE,
					} ) }
					isShownByDefault={ true }
					// panelId={ clientId }
				>
					<ToggleGroupControl
						__nextHasNoMarginBottom
						label={ __( 'Scale', 'woo-gutenberg-products-block' ) }
						value={ scale }
						help={ scaleHelp[ scale ] }
						onChange={ ( value ) =>
							setAttributes( {
								scale: value,
							} )
						}
						isBlock
					>
						{ SCALE_OPTIONS }
					</ToggleGroupControl>
				</ToolsPanelItem>
			) }
		</ToolsPanel>
	);
};
