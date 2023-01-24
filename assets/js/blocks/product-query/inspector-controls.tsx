/**
 * External dependencies
 */
import { ElementType } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useSelect, select } from '@wordpress/data';
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
	isCustomInheritGlobalQueryImplementationEnabled,
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

import './editor.scss';
import { VARIATION_NAME } from './variations/elements/add-to-cart-button';

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
		( tmpSelect ) =>
			tmpSelect( 'core/blocks' )
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
	wooInherit: ( props: ProductQueryBlock ) => {
		return (
			<ToggleControl
				className="woo-inherit-query-toggle"
				label={ __(
					'Inherit query from template',
					'woo-gutenberg-products-block'
				) }
				help={ __(
					'Toggle to use the global query context that is set with the current template, such as variations of the product catalog or search. Disable to customize the filtering independently.',
					'woo-gutenberg-products-block'
				) }
				checked={
					isCustomInheritGlobalQueryImplementationEnabled
						? props.attributes.query.__woocommerceInherit || false
						: props.attributes.query.inherit || false
				}
				onChange={ ( inherit ) => {
					if ( isCustomInheritGlobalQueryImplementationEnabled ) {
						return setQueryAttribute( props, {
							__woocommerceInherit: inherit,
						} );
					}
					return setQueryAttribute( props, { inherit } );
				} }
			/>
		);
	},
};

const ProductQueryControls = ( props: ProductQueryBlock ) => {
	const allowedControls = useAllowedControls( props.attributes );
	const defaultWooQueryParams = useDefaultWooQueryParamsForVariation(
		props.attributes.namespace
	);
	return (
		<>
			<InspectorControls>
				{ allowedControls?.includes( 'presets' ) && (
					<PopularPresets { ...props } />
				) }
				<ToolsPanel
					className="woocommerce-product-query-toolspanel"
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
								<Control { ...props } key={ key } />
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
		</>
	);
};

export const withProductQueryControls =
	< T extends EditorBlock< T > >( BlockEdit: ElementType ) =>
	( props: ProductQueryBlock ) => {
		return isWooQueryBlockVariation( props ) ? (
			<>
				<ProductQueryControls { ...props } />
				<BlockEdit { ...props } />
			</>
		) : (
			<BlockEdit { ...props } />
		);
	};

addFilter( 'editor.BlockEdit', QUERY_LOOP_ID, withProductQueryControls );

export const withWrapperElement =
	< T extends EditorBlock< T > >( BlockEdit: ElementType ) =>
	( props: ProductQueryBlock ) => {
		if ( props.name === 'core/button' ) {
			const coreEditor = select( 'core/block-editor' );
			const parentBlocks = coreEditor.getBlockParents(
				props.clientId,
				true
			);
			const parentButtonsBlock = coreEditor.getBlock( parentBlocks[ 0 ] );

			const isWoocommerceVariation =
				VARIATION_NAME ===
				parentButtonsBlock?.attributes?.__woocommerceNamespace;

			if ( isWoocommerceVariation ) {
				/**
				 * Hide the link button in the button block toolbar because
				 * the link is provided dynamically during render in PHP file
				 *
				 * We are using hacky workaround here until there is a broader proposal for
				 * toolbar customization, as it would be overkill to have one attribute per enabled/disabled feature.
				 */

				if ( props.isSelected ) {
					setTimeout( () => {
						const linkElement: HTMLElement | null =
							document.querySelector(
								'.edit-post-visual-editor button[name="link"]'
							);
						if ( linkElement ) linkElement.style.display = 'none';
					}, 0 );
				}

				const extraProps = {
					attributes: {
						textAlign: 'center',
						fontSize: 'small',
						...props.attributes,
						text: props.attributes?.text?.length
							? props.attributes?.text
							: __(
									'Add to cart',
									'woo-gutenberg-products-block'
							  ),
					},
				};
				return <BlockEdit { ...props } { ...extraProps } />;
			}
		}

		return <BlockEdit { ...props } />;
	};

addFilter( 'editor.BlockEdit', VARIATION_NAME, withWrapperElement );
