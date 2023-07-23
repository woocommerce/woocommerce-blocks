/**
 * External dependencies
 */
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import type { BlockAttributes } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import {
	thumbnailsPositionLeft,
	thumbnailsPositionBottom,
	thumbnailsPositionRight,
} from '@woocommerce/icons';
import { useDispatch } from '@wordpress/data';
import {
	PanelBody,
	RangeControl,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControlOption` is not yet in the type definitions.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControl` is not yet in the type definitions.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
} from '@wordpress/components';

interface ContextProps {
	clientId: string;
	thumbnailsPosition: string;
	thumbnailsNumberOfThumbnails: number;
}

interface ThumbnailSettingProps {
	attributes: BlockAttributes;
	context: ContextProps;
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
	// @ts-ignore @wordpress/block-editor/store types not provided
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
