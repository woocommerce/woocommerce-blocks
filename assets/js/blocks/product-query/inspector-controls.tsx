/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { addFilter, doAction } from '@wordpress/hooks';
import { EditorBlock } from '@woocommerce/types';
import { ElementType } from 'react';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { ProductQueryBlock } from './types';
import { isWooQueryBlockVariation, setCustomQueryAttribute } from './utils';

export const INSPECTOR_CONTROLS = {
	onSale: ( props: ProductQueryBlock ) => (
		<ToggleControl
			label={ __(
				'Show only products on sale',
				'woo-gutenberg-products-block'
			) }
			checked={
				props.attributes.__woocommerceVariationProps?.attributes?.query
					?.onSale || false
			}
			onChange={ ( onSale ) => {
				setCustomQueryAttribute( props, { onSale } );
				apiFetch( {
					path: '/wc/store/v1/products?on_sale=true',
				} ).then( ( data ) => {
					doAction(
						'hook_name',
						data?.map( ( product ) => ( {
							...product,
							type: 'product',
						} ) )
					);
				} );
			} }
		/>
	),
};

export const withProductQueryControls =
	< T extends EditorBlock< T > >( BlockEdit: ElementType ) =>
	( props: ProductQueryBlock ) => {
		return isWooQueryBlockVariation( props ) ? (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					{ Object.entries( INSPECTOR_CONTROLS ).map(
						( [ key, Control ] ) =>
							props.attributes.__woocommerceVariationProps.attributes?.disabledInspectorControls?.includes(
								key
							) ? null : (
								<Control { ...props } />
							)
					) }
				</InspectorControls>
			</>
		) : (
			<BlockEdit { ...props } />
		);
	};

addFilter( 'editor.BlockEdit', 'core/query', withProductQueryControls );
