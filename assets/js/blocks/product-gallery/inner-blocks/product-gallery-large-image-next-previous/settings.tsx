/**
 * External dependencies
 */
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockAttributes, NextPreviousButtonSettingValues } from './types';
import { InsideTheImage, OutsideTheImage } from './icons';

const NextPreviousButtonIcons = {
	[ NextPreviousButtonSettingValues.insideTheImage ]: <InsideTheImage />,
	[ NextPreviousButtonSettingValues.outsideTheImage ]: <OutsideTheImage />,
};

const getHelpText = ( buttonPosition: NextPreviousButtonSettingValues ) => {
	switch ( buttonPosition ) {
		case NextPreviousButtonSettingValues.insideTheImage:
			return __(
				'Next and previous buttons will appear inside the large image.',
				'woo-gutenberg-products-block'
			);
		case NextPreviousButtonSettingValues.outsideTheImage:
			return __(
				'Next and previous buttons will appear on outside the large image.',
				'woo-gutenberg-products-block'
			);
		case 'off':
			return __(
				'No next or previous button will be displayed.',
				'woo-gutenberg-products-block'
			);
		default:
			return __(
				'No next or previous button will be displayed.',
				'woo-gutenberg-products-block'
			);
	}
};

export const BlockSettings = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( newAttributes: BlockAttributes ) => void;
} ) => {
	return (
		<PanelBody
			className="wc-block-editor-product-gallery-large-image-next-previous-settings"
			title={ __( 'Next/Prev Buttons', 'woo-gutenberg-products-block' ) }
		>
			<ToggleGroupControl
				style={ {
					width: '100%',
				} }
				onChange={ ( value: NextPreviousButtonSettingValues ) =>
					setAttributes( {
						buttonPosition: value,
					} )
				}
				help={ getHelpText( attributes.buttonPosition ) }
				value={ attributes.buttonPosition }
			>
				<ToggleGroupControlOption
					value={ NextPreviousButtonSettingValues.off }
					label={ __( 'Off', 'woo-gutenberg-products-block' ) }
				/>
				<ToggleGroupControlOption
					value={ NextPreviousButtonSettingValues.insideTheImage }
					label={ NextPreviousButtonIcons.insideTheImage }
				/>
				<ToggleGroupControlOption
					value={ NextPreviousButtonSettingValues.outsideTheImage }
					label={ NextPreviousButtonIcons.outsideTheImage }
				/>
			</ToggleGroupControl>
		</PanelBody>
	);
};
