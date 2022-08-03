/**
 * External dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, percent } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { QUERY_DEFAULT_ATTRIBUTES } from '..';

registerBlockVariation( 'core/query', {
	name: 'woocommerce/query-on-sale',
	title: __( 'Products on Sale', 'woo-gutenberg-products-block' ),
	isActive: ( blockAttributes ) =>
		blockAttributes.productQuery.namespace === 'product-query-on-sale' ||
		blockAttributes.productQuery.onSale === true,
	icon: {
		src: (
			<Icon
				icon={ percent }
				className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--sparkles"
			/>
		),
	},
	attributes: {
		...QUERY_DEFAULT_ATTRIBUTES,
		productQuery: {
			namespace: 'product-query-on-sale',
			onSale: true,
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
