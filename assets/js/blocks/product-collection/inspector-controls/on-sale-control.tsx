/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { OnSaleControlProps } from '../types';

const OnSaleControl = ( props: OnSaleControlProps ) => {
	const { query, setAttributes } = props;

	return (
		<ToolsPanelItem
			label={ __( 'On Sale', 'woo-gutenberg-products-block' ) }
			hasValue={ () => query.woocommerceOnSale === true }
			isShownByDefault
			onDeselect={ () => {
				setAttributes( {
					query: {
						...query,
						woocommerceOnSale: false,
					},
				} );
			} }
		>
			<ToggleControl
				label={ __(
					'Show only products on sale',
					'woo-gutenberg-products-block'
				) }
				checked={ query.woocommerceOnSale || false }
				onChange={ ( woocommerceOnSale ) => {
					setAttributes( {
						query: {
							...query,
							woocommerceOnSale,
						},
					} );
				} }
			/>
		</ToolsPanelItem>
	);
};

export default OnSaleControl;
