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
import { BlockAttributes, PagerDisplayModes } from './types';
import { PagerSettingsDigitsIcon, PagerSettingsDotIcon } from './icons';

const getHelpText = ( pagerDisplayMode: PagerDisplayModes ) => {
	switch ( pagerDisplayMode ) {
		case PagerDisplayModes.DIGITS:
			return __(
				'A list of numbers will show to indicate the number of items.',
				'woo-gutenberg-products-block'
			);
		case PagerDisplayModes.DOTS:
			return __(
				'A series of dots will show to indicate the number of items.',
				'woo-gutenberg-products-block'
			);
		case 'off':
			return __(
				'No pager will be displayed.',
				'woo-gutenberg-products-block'
			);
		default:
			return __(
				'No pager will be displayed.',
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
			title={ __( 'Pager', 'woo-gutenberg-products-block' ) }
		>
			<ToggleGroupControl
				style={ {
					width: '100%',
				} }
				onChange={ ( value: PagerDisplayModes ) =>
					setAttributes( {
						pagerDisplayMode: value,
					} )
				}
				help={ getHelpText( attributes.pagerDisplayMode ) }
				value={ attributes.pagerDisplayMode }
			>
				<ToggleGroupControlOption
					value={ PagerDisplayModes.OFF }
					label={ __( 'Off', 'woo-gutenberg-products-block' ) }
				/>
				<ToggleGroupControlOption
					value={ PagerDisplayModes.DOTS }
					label={ <PagerSettingsDotIcon /> }
				/>
				<ToggleGroupControlOption
					value={ PagerDisplayModes.DIGITS }
					label={ <PagerSettingsDigitsIcon /> }
				/>
			</ToggleGroupControl>
		</PanelBody>
	);
};
