/**
 * External dependencies
 */
import { ElementType } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { ProductQueryFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';
import { EditorBlock } from '@woocommerce/types';
import {
	FormTokenField,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	ProductQueryArguments,
	ProductQueryBlock,
	QueryBlockAttributes,
} from './types';
import {
	isWooQueryBlockVariation,
	setQueryAttribute,
	useAllowedControls,
} from './utils';
import {
	ALL_PRODUCT_QUERY_CONTROLS,
	QUERY_LOOP_ID,
	STOCK_STATUS_OPTIONS,
} from './constants';
import { PopularPresets } from './inspector-controls/popular-presets';
import { AttributesFilter } from './inspector-controls/attributes-filter';

const NAMESPACED_CONTROLS = ALL_PRODUCT_QUERY_CONTROLS.map(
	( id ) =>
		`__woocommerce${ id[ 0 ].toUpperCase() }${ id.slice(
			1
		) }` as keyof ProductQueryArguments
);

function useDefaultWooQueryParamsForVariation(
	variationName: string | undefined
): Partial< ProductQueryArguments > {
	const variationAttributes: QueryBlockAttributes = useSelect(
		( select ) =>
			select( 'core/blocks' )
				.getBlockVariations( QUERY_LOOP_ID )
				.find(
					( variation: ProductQueryBlock ) =>
						variation.name === variationName
				)?.attributes
	);

	return variationAttributes
		? Object.assign(
				{},
				...NAMESPACED_CONTROLS.map( ( key ) => ( {
					[ key ]: variationAttributes.query[ key ],
				} ) )
		  )
		: {};
}

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

export const TOOLS_PANEL_CONTROLS = {
	attributes: AttributesFilter,
	onSale: ( props: ProductQueryBlock ) => {
		const { query } = props.attributes;

		return (
			<ToolsPanelItem
				label={ __( 'Sale status', 'woo-gutenberg-products-block' ) }
				hasValue={ () => query.__woocommerceOnSale }
			>
				<ToggleControl
					label={ __(
						'Show only products on sale',
						'woo-gutenberg-products-block'
					) }
					checked={ query.__woocommerceOnSale || false }
					onChange={ ( __woocommerceOnSale ) => {
						setQueryAttribute( props, {
							__woocommerceOnSale,
						} );
					} }
				/>
			</ToolsPanelItem>
		);
	},
	stockStatus: ( props: ProductQueryBlock ) => {
		const { query } = props.attributes;

		return (
			<ToolsPanelItem
				label={ __( 'Stock status', 'woo-gutenberg-products-block' ) }
				hasValue={ () => query.__woocommerceStockStatus }
			>
				<FormTokenField
					label={ __(
						'Stock status',
						'woo-gutenberg-products-block'
					) }
					onChange={ ( statusLabels ) => {
						const __woocommerceStockStatus = statusLabels
							.map( getStockStatusIdByLabel )
							.filter( Boolean ) as string[];

						setQueryAttribute( props, {
							__woocommerceStockStatus,
						} );
					} }
					suggestions={ Object.values( STOCK_STATUS_OPTIONS ) }
					validateInput={ ( value: string ) =>
						Object.values( STOCK_STATUS_OPTIONS ).includes( value )
					}
					value={
						query?.__woocommerceStockStatus?.map(
							( key ) => STOCK_STATUS_OPTIONS[ key ]
						) || []
					}
					__experimentalExpandOnFocus={ true }
				/>
			</ToolsPanelItem>
		);
	},
	wooInherit: ( props: ProductQueryBlock ) => (
		<ToggleControl
			label={ __(
				'Woo Inherit query from template',
				'woo-gutenberg-products-block'
			) }
			checked={ props.attributes.query.__woocommerceInherit || false }
			onChange={ ( __woocommerceInherit ) => {
				setQueryAttribute( props, { __woocommerceInherit } );
			} }
		/>
	),
};

export const withProductQueryControls =
	< T extends EditorBlock< T > >( BlockEdit: ElementType ) =>
	( props: ProductQueryBlock ) => {
		const allowedControls = useAllowedControls( props.attributes );
		const defaultWooQueryParams = useDefaultWooQueryParamsForVariation(
			props.attributes.namespace
		);

		return isWooQueryBlockVariation( props ) ? (
			<>
				<InspectorControls>
					{ allowedControls?.includes( 'presets' ) && (
						<PopularPresets { ...props } />
					) }
					<ToolsPanel
						class="woocommerce-product-query-toolspanel"
						label={ __(
							'Advanced Filters',
							'woo-gutenberg-products-block'
						) }
						resetAll={ () => {
							setQueryAttribute( props, defaultWooQueryParams );
						} }
					>
						{ Object.entries( TOOLS_PANEL_CONTROLS ).map(
							( [ key, Control ] ) =>
								allowedControls?.includes( key ) ? (
									<Control { ...props } />
								) : null
						) }
					</ToolsPanel>
				</InspectorControls>
				{
					// Hacky temporary solution to display the feedback prompt
					// at the bottom of the inspector controls
				 }
				<InspectorControls __experimentalGroup="color">
					<ProductQueryFeedbackPrompt />
				</InspectorControls>
				{
					// Hacky temporary solution to display the feedback prompt
					// at the bottom of the inspector controls
				 }
				<InspectorControls __experimentalGroup="color">
					<ProductQueryFeedbackPrompt />
				</InspectorControls>
				<BlockEdit { ...props } />
			</>
		) : (
			<BlockEdit { ...props } />
		);
	};

addFilter( 'editor.BlockEdit', QUERY_LOOP_ID, withProductQueryControls );
