/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import {
	RangeControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	ProductCollectionAttributes,
	ProductCollectionDisplayLayout,
} from '../types';
import { getDefaultSettings } from '../constants';

const ColumnsControl = (
	props: BlockEditProps< ProductCollectionAttributes >
) => {
	if ( ! props.attributes.displayLayout ) return null;

	const { type, columns } = props.attributes.displayLayout;
	const showColumnsControl = type === 'flex';

	const defaultSettings = getDefaultSettings( props.attributes );

	return showColumnsControl ? (
		<ToolsPanelItem
			label={ __( 'Columns', 'woo-gutenberg-products-block' ) }
			hasValue={ () =>
				defaultSettings.displayLayout?.columns !== columns ||
				defaultSettings.displayLayout?.type !== type
			}
			isShownByDefault
			onDeselect={ () => {
				props.setAttributes( {
					displayLayout:
						defaultSettings.displayLayout as ProductCollectionDisplayLayout,
				} );
			} }
		>
			<RangeControl
				value={ columns }
				onChange={ ( value: number ) =>
					props.setAttributes( {
						displayLayout: {
							...props.attributes.displayLayout,
							columns: value,
						},
					} )
				}
				min={ 2 }
				max={ Math.max( 6, columns ) }
			/>
		</ToolsPanelItem>
	) : null;
};

export default ColumnsControl;
