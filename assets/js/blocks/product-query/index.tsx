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

export const QUERY_DEFAULT_ATTRIBUTES = {
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
		inherit: false,
		hidePostTypeSettings: true,
	},
};

export const withInspectorControl = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			return props.name !== 'core/query' ||
				props.attributes?.productQuery?.namespace !==
					'product-query' ? (
				<BlockEdit { ...props } />
			) : (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<ToggleControl
							label={ __( 'ON Sale' ) }
							checked={
								props.attributes.productQuery?.onSale || false
							}
							onChange={ ( nextValue ) => {
								props.setAttributes( {
									productQuery: {
										...props.attributes.productQuery,
										onSale: nextValue,
									},
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
			productQuery: {
				type: 'object',
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

registerBlockVariation( 'core/query', {
	name: 'product-query',
	title: __( 'Product Query', 'woo-gutenberg-products-block' ),
	isActive: ( attributes ) => {
		return attributes?.productQuery?.namespace === 'product-query';
	},
	icon: {
		src: (
			<Icon
				icon={ sparkles }
				className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--sparkles"
			/>
		),
	},
	attributes: {
		...QUERY_DEFAULT_ATTRIBUTES,
		productQuery: {
			namespace: 'product-query',
		},
	},
	innerBlocks: [
		[
			'core/post-template',
			{},
			[ [ 'core/post-title' ], [ 'woocommerce/product-image' ] ],
		],
		[ 'core/query-pagination' ],
		[ 'core/query-no-results' ],
	],
	scope: [ 'block', 'inserter' ],
} );
