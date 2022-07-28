/**
 * External dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { Icon, sparkles } from '@wordpress/icons';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */

const QUERY_DEFAULT_ATTRIBUTES = {
	query: {
		perPage: 6,
		pages: 0,
		offset: 0,
		postType: 'product',
		order: 'desc',
		orderBy: 'date',
		author: '',
		search: '',
		exclude: [],
		sticky: '',
		inherit: true,
		hidePostTypeSettings: true,
	},
};

registerBlockVariation( 'core/query', {
	name: 'product-query',
	title: __( 'Product Query', 'woo-gutenberg-products-block' ),
	isActive: () => true,
	icon: {
		src: (
			<Icon
				icon={ sparkles }
				className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--sparkles"
			/>
		),
	},
	attributes: { ...QUERY_DEFAULT_ATTRIBUTES, namespace: 'product-query' },
	innerBlocks: [
		[
			'core/post-template',
			{},
			[
				[ 'woocommerce/product-image-2' ],
				[ 'woocommerce/product-title' ],
			],
		],
		[ 'core/query-pagination' ],
		[ 'core/query-no-results' ],
	],
	scope: [ 'block', 'inserter' ],
} );

export const withInspectorControl = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			return props.attributes.namespace !== 'product-query' ? (
				<BlockEdit { ...props } />
			) : (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<ToggleControl
							label={ __( 'ON Sale' ) }
							checked={ props.attributes.onSale || false }
							onChange={ ( nextValue ) => {
								props.setAttributes( {
									onSale: nextValue,
								} );
							} }
						/>
					</InspectorControls>
				</>
			);
		};
	},
	'withInspectorControl'
);

export function addAttribute( settings, name ) {
	if ( name === 'core/query' ) {
		// Gracefully handle if settings.attributes is undefined.
		settings.attributes = {
			...settings.attributes,
			namespace: {
				type: 'string',
			},
			onSale: {
				type: 'boolean',
			},
		};
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'core/custom-class-name/attribute',
	addAttribute
);

addFilter( 'editor.BlockEdit', 'core/query', withInspectorControl );

// registerBlockVariation( 'core/query', {
// 	name: 'Products on Sale',
// 	title: __( 'Product on Sale', 'woo-gutenberg-products-block' ),
// 	isActive: ( blockAttributes ) => blockAttributes.onSale,
// 	icon: {
// 		src: (
// 			<Icon
// 				icon={ sparkles }
// 				className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--sparkles"
// 			/>
// 		),
// 	},
// 	attributes: {
// 		...QUERY_DEFAULT_ATTRIBUTES,
// 		namespace: 'product-on-sale',
// 		onSale: true,
// 	},
// 	innerBlocks: [
// 		[
// 			'core/post-template',
// 			{},
// 			[ [ 'woocommerce/product-image-2' ], [ 'core/post-title' ] ],
// 		],
// 		[ 'core/query-pagination' ],
// 		[ 'core/query-no-results' ],
// 	],
// 	scope: [ 'block', 'inserter' ],
// } );
