/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import fastDeepEqual from 'fast-deep-equal/es6';
import {
	FormTokenField,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ProductCollectionAttributes } from '../types';
import { setQueryAttribute } from './utils';
import { STOCK_STATUS_OPTIONS, getDefaultStockStatuses } from '../constants';

/**
 * Gets the id of a specific stock status from its text label
 *
 * In theory, we could use a `saveTransform` function on the
 * `FormFieldToken` component to do the conversion. However, plugins
 * can add custom stock statii which don't conform to our naming
 * conventions.
 */
function getStockStatusIdByLabel( statusLabel: FormTokenField.Value ) {
	const label =
		typeof statusLabel === 'string' ? statusLabel : statusLabel.value;

	return Object.entries( STOCK_STATUS_OPTIONS ).find(
		( [ , value ] ) => value === label
	)?.[ 0 ];
}

const StockStatusControl = (
	props: BlockEditProps< ProductCollectionAttributes >
) => {
	const { query } = props.attributes;
	return (
		<ToolsPanelItem
			label={ __( 'Stock status', 'woo-gutenberg-products-block' ) }
			hasValue={ () =>
				! fastDeepEqual(
					query.woocommerceStockStatus,
					getDefaultStockStatuses()
				)
			}
			onDeselect={ () => {
				setQueryAttribute( props, {
					woocommerceStockStatus: getDefaultStockStatuses(),
				} );
			} }
			isShownByDefault
		>
			<FormTokenField
				label={ __( 'Stock status', 'woo-gutenberg-products-block' ) }
				onChange={ ( statusLabels ) => {
					const woocommerceStockStatus = statusLabels
						.map( getStockStatusIdByLabel )
						.filter( Boolean ) as string[];

					setQueryAttribute( props, {
						woocommerceStockStatus,
					} );
				} }
				suggestions={ Object.values( STOCK_STATUS_OPTIONS ) }
				validateInput={ ( value: string ) =>
					Object.values( STOCK_STATUS_OPTIONS ).includes( value )
				}
				value={
					query?.woocommerceStockStatus?.map(
						( key ) => STOCK_STATUS_OPTIONS[ key ]
					) || []
				}
				__experimentalExpandOnFocus={ true }
			/>
		</ToolsPanelItem>
	);
};

export default StockStatusControl;
