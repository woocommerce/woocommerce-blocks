/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { EditorBlock } from '@woocommerce/types';
import { ElementType, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { ProductQueryBlock } from './types';
import {
	fetchAndRenderProducts,
	isWooQueryBlockVariation,
	setCustomQueryAttribute,
} from './utils';

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
			} }
		/>
	),
};

export const withProductQueryControls =
	< T extends EditorBlock< T > >( BlockEdit: ElementType ) =>
	( props: ProductQueryBlock ) => {
		if ( ! isWooQueryBlockVariation( props ) ) {
			return <BlockEdit { ...props } />;
		}

		useEffect( () => {
			fetchAndRenderProducts( props );
		}, [ props ] );

		return (
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
		);
	};

addFilter( 'editor.BlockEdit', 'core/query', withProductQueryControls );
