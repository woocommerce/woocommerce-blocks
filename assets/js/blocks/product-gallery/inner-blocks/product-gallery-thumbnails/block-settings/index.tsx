/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControl as ToggleGroupControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { BlockAttributes } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import {
	thumbnailsLeft,
	thumbnailsBottom,
	thumbnailsRight,
} from '@woocommerce/icons';

interface ThumbnailSettingProps {
	attributes: BlockAttributes;
	layout: string;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

const layoutHelp: Record< string, string > = {
	off: __(
		'No thumbnails will be displayed.',
		'woo-gutenberg-products-block'
	),
	left: __(
		'A strip of small images will appear to the left of the main gallery image.',
		'woo-gutenberg-products-block'
	),
	bottom: __(
		'A strip of small images will appear below the main gallery image.',
		'woo-gutenberg-products-block'
	),
	right: __(
		'A strip of small images will appear to the right of the main gallery image.',
		'woo-gutenberg-products-block'
	),
};

export const BlockSettings = ( {
	attributes,
	setAttributes,
}: ThumbnailSettingProps ) => {
	const { layout = 'off', numberOfThumbnails = 3 } = attributes;
	const maxNumberOfThumbnails = 8;
	const minNumberOfThumbnails = 2;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'woo-gutenberg-products-block' ) }
			>
				<ToggleGroupControl
					className="wc-block-editor-product-gallery-thumbnails__layout-toggle"
					isBlock={ true }
					label={ __( 'Layout', 'woo-gutenberg-products-block' ) }
					value={ layout }
					help={ layoutHelp[ layout ] }
					onChange={ ( value: string ) =>
						setAttributes( { layout: value } )
					}
				>
					<ToggleGroupControlOption
						value="off"
						label={ __( 'Off', 'woo-gutenberg-products-block' ) }
					/>
					<ToggleGroupControlOption
						value="left"
						label={ <Icon size={ 32 } icon={ thumbnailsLeft } /> }
					/>
					<ToggleGroupControlOption
						value="bottom"
						label={ <Icon size={ 32 } icon={ thumbnailsBottom } /> }
					/>
					<ToggleGroupControlOption
						value="right"
						label={ <Icon size={ 32 } icon={ thumbnailsRight } /> }
					/>
				</ToggleGroupControl>
				<RangeControl
					label={ __(
						'Number of Thumbnails',
						'woo-gutenberg-products-block'
					) }
					value={ numberOfThumbnails }
					onChange={ ( value: number ) =>
						setAttributes( { numberOfThumbnails: value } )
					}
					help={ __(
						'Choose how many thumbnails (2-8) will display. If more images exist, a “View all” button will display.',
						'woo-gutenberg-products-block'
					) }
					max={ maxNumberOfThumbnails }
					min={ minNumberOfThumbnails }
				/>
			</PanelBody>
		</InspectorControls>
	);
};
