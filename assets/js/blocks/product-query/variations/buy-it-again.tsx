/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, plusCircle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	INNER_BLOCKS_TEMPLATE,
	QUERY_DEFAULT_ATTRIBUTES,
	QUERY_LOOP_ID,
} from '../constants';

const VARIATION_NAME = 'woocommerce/query-buy-it-again';
const BUY_IT_AGAIN_ATTRIBUTES = {
	...QUERY_DEFAULT_ATTRIBUTES,
	allowedControls: [],
	query: {
		...QUERY_DEFAULT_ATTRIBUTES.query,
		__woocommerceStockStatus: 'instock',
	},
};
const allowedInnerBlocks = INNER_BLOCKS_TEMPLATE[ 0 ];
if ( isExperimentalBuild() ) {
	registerBlockVariation( QUERY_LOOP_ID, {
		name: VARIATION_NAME,
		title: __( 'Buy it Again', 'woo-gutenberg-products-block' ),
		isActive: ( blockAttributes ) =>
			blockAttributes.namespace === VARIATION_NAME,
		icon: {
			src: (
				<Icon
					icon={ plusCircle }
					className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--percent"
				/>
			),
		},
		attributes: {
			...BUY_IT_AGAIN_ATTRIBUTES,
			namespace: VARIATION_NAME,
		},
		// Gutenberg doesn't support this type yet, discussion here:
		// https://github.com/WordPress/gutenberg/pull/43632
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		innerBlocks: [ allowedInnerBlocks ],
		scope: [ 'block', 'inserter' ],
	} );
}
