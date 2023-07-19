/**
 * External dependencies
 */
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
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
	thumbnailsPositionLeft,
	thumbnailsPositionBottom,
	thumbnailsPositionRight,
} from '@woocommerce/icons';
import { useDispatch } from '@wordpress/data';

interface ThumbnailSettingProps {
	attributes: BlockAttributes;
	thumbnailsPosition: string;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

const positionHelp: Record< string, string > = {
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

export const BlockSettings = ( { context }: ThumbnailSettingProps ) => {
	const maxNumberOfThumbnails = 8;
	const minNumberOfThumbnails = 2;

	const { clientId } = context;
	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'woo-gutenberg-products-block' ) }
			>
				<ToggleGroupControl
					className="wc-block-editor-product-gallery-thumbnails__position-toggle"
					isBlock={ true }
					label={ __( 'Thumbnails', 'woo-gutenberg-products-block' ) }
					value={ context.thumbnailsPosition }
					help={ positionHelp[ context.thumbnailsPosition ] }
					onChange={ ( value: string ) =>
						updateBlockAttributes( clientId, {
							thumbnailsPosition: value,
						} )
					}
				>
					<ToggleGroupControlOption
						value="off"
						label={ __( 'Off', 'woo-gutenberg-products-block' ) }
					/>
					<ToggleGroupControlOption
						value="left"
						label={
							<Icon size={ 32 } icon={ thumbnailsPositionLeft } />
						}
					/>
					<ToggleGroupControlOption
						value="bottom"
						label={
							<Icon
								size={ 32 }
								icon={ thumbnailsPositionBottom }
							/>
						}
					/>
					<ToggleGroupControlOption
						value="right"
						label={
							<Icon
								size={ 32 }
								icon={ thumbnailsPositionRight }
							/>
						}
					/>
				</ToggleGroupControl>
				{ context.thumbnailsPosition !== 'off' && (
					<RangeControl
						label={ __(
							'Number of Thumbnails',
							'woo-gutenberg-products-block'
						) }
						value={ context.thumbnailsNumberOfThumbnails }
						onChange={ ( value: number ) =>
							updateBlockAttributes( clientId, {
								thumbnailsNumberOfThumbnails: value,
							} )
						}
						help={ __(
							'Choose how many thumbnails (2-8) will display. If more images exist, a “View all” button will display.',
							'woo-gutenberg-products-block'
						) }
						max={ maxNumberOfThumbnails }
						min={ minNumberOfThumbnails }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
};
