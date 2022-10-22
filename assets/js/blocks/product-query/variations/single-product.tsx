/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockVariation } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { pin } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { QUERY_DEFAULT_ATTRIBUTES } from '../constants';

const VARIATION_NAME = 'woocommerce/single-product-beta';

if ( isExperimentalBuild() ) {
	registerBlockVariation( 'core/query', {
		name: VARIATION_NAME,
		title: __( 'Single Product (Beta)', 'woo-gutenberg-products-block' ),
		isActive: ( blockAttributes ) =>
			blockAttributes.namespace === VARIATION_NAME,
		icon: {
			src: (
				<Icon
					icon={ pin }
					className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--sparkles"
				/>
			),
		},
		attributes: {
			...QUERY_DEFAULT_ATTRIBUTES,
			query: {
				...QUERY_DEFAULT_ATTRIBUTES.query,
				include: [],
			},
			displayLayout: {
				type: 'list',
			},
			namespace: VARIATION_NAME,
		},
		// Gutenberg doesn't support this type yet, discussion here:
		// https://github.com/WordPress/gutenberg/pull/43632
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		allowedControls: [ 'productSelector' ],
		innerBlocks: [
			[
				'core/post-template',
				{},
				[
					[ 'woocommerce/product-image' ],
					[
						'core/post-title',
						{
							level: 3,
							fontSize: 'large',
						},
						[],
					],
				],
			],
		],
		scope: [ 'block', 'inserter' ],
	} );
}
